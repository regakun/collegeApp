'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dosens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dosens.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      Dosens.hasMany(models.Nilais,{
        foreignKey: 'nidn'
      })
    }
  };
  Dosens.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dosens',
  });
  return Dosens;
};