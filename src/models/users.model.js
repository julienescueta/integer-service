/* eslint-disable no-console */

// users-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.uuid('id').primary();
        table.text('email').notNullable().unique();
        table.text('password').notNullable();
        table.text('api_key').unique().notNullable().index();
        table.text('identifier').notNullable().defaultTo('0');

        table.timestamp('created_at').defaultTo(db.fn.now());
        table.timestamp('updated_at').defaultTo(db.fn.now());
        table.timestamp('deleted_at').nullable();
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
