
import {

  DataTypes,
  Model,

} from "sequelize";
import { sequelize } from "../config/config";


import * as tfa from '../constants/2fa'

/** Gọi ra để sử dụng đối tượng "authenticator" của thằng otplib */

/** Tạo secret key ứng với từng user để phục vụ việc tạo otp token.
  * Lưu ý: Secret phải được gen bằng lib otplib thì những app như
    Google Authenticator hoặc tương tự mới xử lý chính xác được.
  * Các bạn có thể thử để linh linh cái secret này thì đến bước quét mã QR sẽ thấy có lỗi ngay.
*/
const generateUniqueSecret = () => {
  return tfa.generateUniqueSecret()
}


interface UserInstance extends Model {
  [x: string]: any;
  id: number;
  username: string;
  email: string;
  password: string;
  roles: number;
  secret: string;
}

export interface UserAddModel {
  email: string;
  password: string;
}

export const User = sequelize.define<UserInstance>("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    defaultValue: "moderator"

  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  roles: {
    type: DataTypes.JSON,
    defaultValue: 1
  },
  is2FAEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  secret: {
    type: DataTypes.STRING,
    defaultValue: generateUniqueSecret()
  }

});