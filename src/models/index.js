'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.resolve(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db['role'].hasOne(db.admin)
db['user'].hasOne(db.record)
db['dustbin'].hasOne(db.record)
db['category'].hasMany(db.garbage)
db['category'].hasMany(db.integral)
db['category'].hasMany(db.knowledge)
db['category'].hasMany(db.dustbin)
db['garbage'].belongsTo(db.category, { foreignKey: 'category_id' })
db['integral'].belongsTo(db.category, { foreignKey: 'category_id' })
db['knowledge'].belongsTo(db.category, { foreignKey: 'category_id' })
db['record'].belongsTo(db.user, { foreignKey: 'user_id' })
db['record'].belongsTo(db.dustbin, { foreignKey: 'dustbin_id' })
db['record'].belongsTo(db.category, { foreignKey: 'category_id' })
db['admin'].belongsTo(db.role, { foreignKey: 'role_id' })
db['dustbin'].belongsTo(db.category, { foreignKey: 'category_id' })

module.exports = db;
