/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    gender: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    integral_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'user'
  });
};
