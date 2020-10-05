const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const settings = require('../settings.json');
let opts = {
  server: {
    url: settings.authentication.url,
    bindDN:`CN=${ settings.authentication.username },OU=Service Accounts,OU=Security Groups,DC=SIS,DC=NYP,DC=ORG`,
    bindCredentials:settings.authentication.password,
    searchBase: settings.authentication.search.base,
    searchFilter: '(sAMAccountName={{username}})',
    usernameField: 'username',
    passwordField: 'password'
    },
  passReqToCallback: true
};

passport.serializeUser((ldap, done) => {
  done(null, ldap);
});

passport.deserializeUser(function(ldap, done){
  const { cn, title, displayName, name, mail  } = ldap;
  //console.log(ldap.memberOf)
  done(null, { cn, title, displayName, name, mail} );
});

// passport.use(new ActiveDirectoryStrategy({
//   integrated: false,
//   ldap: ad
// }, (profile, ad, done) => {
//   ad.isUserMemberOf(profile._json.dn, 'AccessGroup', function (err, isMember) {
//     if (err) return done(err)
//     return done(null, profile)
//   })
// }));

passport.use(new LdapStrategy(opts));

module.exports = passport;