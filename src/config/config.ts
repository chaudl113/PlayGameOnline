import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: 3306,
  username: "root",
  password: "",
  database: "webgame",
  dialect: "mysql",
  storage: ":memory:",
  logging: false
});

export const WebPort = {
  port: 8010
};

export const AdminPort = {
  port: 8000
};
