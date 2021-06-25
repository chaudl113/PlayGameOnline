
import {

  DataTypes,
  Model,

} from "sequelize";
import { sequelize } from "../config/config";
import { Identifier } from "sequelize/types";


interface ProductInstance extends Model {
  id: number;
  name: string;
  price: number;
  ios: string;
  apk: string;
  description: string;
  image: string;
  url: string;
  category: number;
}

export const Product = sequelize.define<ProductInstance>("product", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING

  },
  price: {
    type: DataTypes.INTEGER
  },
  ios: {
    type: DataTypes.STRING
  },
  apk: {
    type: DataTypes.STRING

  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.INTEGER
  },
  icon: {
    type: DataTypes.STRING
  },


});

export const selectById = async (id: Identifier) => {
  return new Promise((resolve, reject) => {
    Product.findByPk(id).then(data => {
      resolve(data);
    })
      .catch(err => {
        console.log(err);
        reject(undefined);

      });

  });
};

export const selectAll = async () => {
  return new Promise((resolve, reject) => {

    Product.findAll().then(data => {
      resolve(data);
    })
      .catch(err => {
        console.log(err);
        reject(undefined);

      });
  });
};

export const selectLastID = async () => {
  return new Promise((resolve, reject) => {

    Product.findOne({
      order: [['id', 'DESC']]
    }).then(data => {
      resolve(data);
    })
      .catch(err => {
        console.log(err);
        reject(undefined);
      });
  });
};