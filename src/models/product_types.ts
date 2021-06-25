
import {

  DataTypes,
  Model,

} from "sequelize";
import { sequelize } from "../config/config";


interface ProductTypesInstance extends Model {
  id: number;
  name: string;

}

export const ProductType = sequelize.define<ProductTypesInstance>("product_type", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING

  }


});

export const selectAllProductType = async () => {
  return new Promise((resolve, reject) => {
    ProductType.findAll().then(data => {
      return resolve(data);
    })

      .catch(err => {
        if (err) return reject(undefined);
      });

  });
};