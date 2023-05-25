import { Sequelize } from "sequelize-typescript";
import User from "./user";
import Book from "./book";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const sequelize = new Sequelize({
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: "postgres",
  "seederStorage": "sequelize",
  "seederStorageTableName": "sequelize_data",
  options: {
    operatorsAliases: false,
  },
} as any);

const models = {
  User: User,
  Book: Book,
};

sequelize.addModels([User, Book]);

Object.keys(models).forEach((key) => {
  const model: any = (models as any)[key];

  if ("associate" in model) model.associate(models);
});

export { sequelize };

export default models;