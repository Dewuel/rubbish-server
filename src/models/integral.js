/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('integral', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      field: 'category_id',
      references: {
        model: 'category',
        key: 'id'
      }
    },
    category_color: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    integral_base: {
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
    tableName: 'integral'
  });
};
