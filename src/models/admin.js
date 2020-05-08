/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    admin_status: {
      type: DataTypes.INTEGER(4),
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
    tableName: 'admin'
  });
};
