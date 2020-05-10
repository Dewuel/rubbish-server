/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'user',
        key: 'id'
      }
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
    dustbinId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'dustbin_id',
      references: {
        model: 'dustbin',
        key: 'id'
      }
    },
    room_num: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'category_id',
      references: {
        model: 'category',
        key: 'id'
      }
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
