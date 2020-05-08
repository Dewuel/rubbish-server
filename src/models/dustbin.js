/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dustbin', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    estate: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    device_code: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING(255),
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
    tableName: 'dustbin'
  });
};
