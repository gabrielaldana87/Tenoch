/*global require, module, exports */

(function() {
  'use strict';

  var
    logger = require('log4js').getLogger('ldap-auth'),
    ldap = require('ldapjs'),
    underscore = require('underscore'),
    url, search_filter, search_base, search_scope, app_priv
    ;

  exports.init = function(settings) {
    logger.debug('init');
    url = settings.url;

    if(settings.search) {
      search_base = settings.search.base;
      search_scope = settings.search.opts.scope;
      search_filter = underscore.template(settings.search.opts.filter);
      app_priv = settings.search.opts.apppriv;
    }

    return module.exports;
  };

  function searchAndBind(credentials, completion) {
    var client, search, dn;
    logger.info(url);
    try {
      client = ldap.createClient({
        url: url
      });

      if(search_filter) {
        search = {
          base: search_base,
          opts: {
            scope: search_scope,
            filter: search_filter(credentials)
          }
        };
        logger.debug(search);

        searchLdap(client, search, function(search_error, entries) {
          var entry;

          if(!entries || !entries.length) {
            completion('no entries found');
          }
          else if(1 !== entries.length) {
            completion('invalid number of entries found');
            logger.info(entries);
          }
          else {
            entry = entries[0];

            bindLdapUser(client,
              entry.dn,
              credentials.password,
              function(bind_error) {
                completion(bind_error, entry);
              }
            );
          }
        });
      }
      else {
        dn = credentials.dn || credentials.username;
        bindLdapUser(client,
          dn,
          credentials.password,
          function(bind_error) {
            completion(bind_error, {cn: dn});
          }
        );
      }

    } catch(ex) {
      completion(ex);
    }
  }

  function searchLdap(client, search, completion) {
    client.search(search.base, search.opts, function(search_error, res) {
      var entries = [];

      if(search_error) {
        completion(search_error);
      }
      else {

        res.on('searchEntry', function(entry) {
          //console.log('entry: ' + JSON.stringify(entry.object));
          entries.push(entry.object);
        });

        res.on('searchReference', function(referral) {
          logger.info('referral: ' + referral.uris.join());
        });

        res.on('error', function(err) {
          var error_result = {
            dn: err.dn,
            code: err.code,
            name: err.name,
            message: err.message
          };

          completion(error_result);
        });

        res.on('end', function(search_result) {
          var ok = (0 === search_result.status);

          if(!ok) {
            completion(search_result);
          }
          else {
            completion(null, entries);
          }
        });

        res.on('close', function(close_error) {
          if(close_error) {
            logger.error(close_error);
          }
        });

      }

    });
  }

  function bindLdapUser(client, dn, pass, completion) {
    // bind the user to check the password is correct
    client.bind(dn, pass, function(bind_error) {
      if(bind_error) {
        completion(bind_error.message);
      }
      else {
        completion(null);
      }
    });
  }

  exports.authenticate = function(credentials, completion) {
    var
      user = {},
      has_app_priv = false
      ;
    if(!credentials || !credentials.username || !credentials.password) {
      completion(new Error('missing credentials'));
    }
    else {
      logger.debug('attempt login: %s', credentials.username);
      searchAndBind(credentials, function(ldap_error, ldap_entry) {
        if(ldap_error) {
          logger.error(ldap_error);
          completion(ldap_error, {name: credentials.username});
        }
        else {
          if(ldap_entry) {

            if(ldap_entry.nypapppriv &&
              ldap_entry.nypapppriv.length &&
              underscore.contains(ldap_entry.nypapppriv, app_priv))
            {
              has_app_priv = true;
            }

            user = {
              name: credentials.username,
              email: ldap_entry.mail || '',
              displayname: ldap_entry.cn || '',
              nypempid: ldap_entry.nypempid || '',
              app_priv: has_app_priv
            };
            if(ldap_entry.nypapppriv) {
              delete ldap_entry.nypapppriv;
            }
          }
          completion(null, user, ldap_entry);
        }
      });
    }
  };


}());