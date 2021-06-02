'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nilais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nilais.belongsTo(models.Dosens,{
        foreignKey: 'nidn'
      })
      Nilais.belongsTo(models.Mahasiswas,{
        foreignKey: 'nim'
      })
      Nilais.belongsTo(models.Mata_kuliah,{
        foreignKey: 'matkul_id'
      })
    }
  };
  Nilais.init({
    nilai: DataTypes.INTEGER,
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['lulus', 'belum lulus']],
          msg: 'Invalid Keterangan Value'
        },
        notNull: {
          args: true,
          msg: 'Keterangan must not be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Keterangan must not be empty'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Nilais',
  });
  return Nilais;
};