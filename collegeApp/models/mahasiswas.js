'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mahasiswas.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      Mahasiswas.hasMany(models.Nilais,{
        foreignKey: 'nim'
      })
    }
  };
  Mahasiswas.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    jurusan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mahasiswas',
  });
  return Mahasiswas;
};