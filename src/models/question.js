/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    A: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    B: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    C: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    D: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    correct: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    add_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    describe: {
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
    tableName: 'question'
  });
};
