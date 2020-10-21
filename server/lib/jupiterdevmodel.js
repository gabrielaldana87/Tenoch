const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const sql_config = require('../config/dbconfig.json').dbconnection.jupiteruatdb;
const table = '[GraphiteDevTeam].[dbo].[TenochUserLog]';
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10);

const log4js = require('log4js');
const logger = log4js.getLogger();

exports.executeUserInsert = user => {
  let connection;
  connection = new Connection(sql_config);
  connection.connect( err => {
    if (err) {
      console.log(err);
    }
   executeStatement(user);
  });
  const executeStatement = user => {
    const { cn, title, displayName, name, mail } = user;
    let request = new Request(`INSERT INTO ${ table } (transactionId, cn, title,` +
    ` displayName, name, mail, dateAccessed, isAdmin) VALUES (@transactionId, @cn, @title, @displayName, @name, @mail,` +
    ` @dateAccessed, @isAdmin);`, err => {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('transactionId', TYPES.NVarChar, nanoid() );
    request.addParameter('cn', TYPES.NVarChar, cn );
    request.addParameter('title', TYPES.NVarChar, title );
    request.addParameter('displayName', TYPES.NVarChar, displayName );
    request.addParameter('name', TYPES.NVarChar, name );
    request.addParameter('mail', TYPES.NVarChar, mail );
    request.addParameter('dateAccessed', TYPES.DateTime, new Date() );
    request.addParameter('isAdmin', TYPES.Bit, isAdmin(name));

    connection.execSql(request);

    logger.info(`updated record for user '${ name }' into graphitedevteam.dbo.tenochuserlog`);
  };
};

const isAdmin = name => {
  const admins = ['gaa9034','ffh7001'];
  if (admins.includes(name)) return 1;
  else return 0;
};

