'use strict';
const {
  Model
} = require('sequelize');

const {hash} = require('../helpers/passwordHelper.js')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Mahasiswas,{
        foreignKey: 'userId'
      })
      Users.hasMany(models.Dosens,{
        foreignKey: 'userId'
      })
    }
  };
  Users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password must not be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password must not be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        },
        len: {
          args: [4, 20],
          msg: 'Password length must be around 4-20 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['mahasiswa', 'dosen']],
          msg: 'Invalid Role Value'
        },
        notNull: {
          args: true,
          msg: 'Password must not be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        },
      }
    }
  }, {
    hooks: {
      beforeCreate : (data, opt) => {
        data.password = hash(data.password)
      },
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};