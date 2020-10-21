const passport = require('../config/passport');
const workflow = require('../config/adMenuItems.json');
const datadbc = require('../lib/jupiterdevmodel');
const _ = require('underscore');

exports.create = (req, res, next) => {
  passport.authenticate('ldapauth', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ success: false, message: 'ldap authentication failed'});
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.send({ success: false, message: 'please request access by...'});
      }
      if (req.user) {
        const
          { cn, title, displayName, name, mail, memberOf } = user,
          findADGroup = () => {
            if (memberOf.some(o => o.includes('NYP_Jupiter_Internal_GRP'))) {
              // if (memberOf.some(o => o.includes('Security-WC-GRP'))) {
                return workflow.infusion;
            }
            if (memberOf.some(o => o.includes('Oncology-Treatment-Center-Tracking-System_GRP'))) {
              return workflow.infusion;
            }
            if (memberOf.some(o => o.includes('Quake_Admins_GRP'))) {
              return workflow.infusion;
            }
            if (memberOf.some(o => o.includes('FOD_Admins'))) {
              return workflow.infusion;
            }
            if (memberOf.some(o => o.includes('NYP_Jupiter_EDN_Enterprise_GRP'))) {
              return workflow.infusion;
            }
            else return workflow.none;
          },
          adGroup = findADGroup()
        ;
        datadbc.executeUserInsert(user)
        ;
        res.json({ cn, title, displayName, name, mail, adGroup } )
      }
    })
  })(req, res, next);
};