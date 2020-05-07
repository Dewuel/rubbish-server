/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    record_num: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    estate: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dustbin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    room_num: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'record'
  });
};
