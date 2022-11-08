import { Model } from "sequelize";
import { RoleType } from "../../utils/enums";

export interface BookAttributes {
  id: number;
  userUid: string;
  title: string;
  publisher: string;
  description: string;
  genre: string;
  numberOfPages: number;
}

module.exports = (sequelize, DataTypes) => {
  class Book extends Model<BookAttributes> implements BookAttributes {
    id: number;
    userUid: string;
    title: string;
    publisher: string;
    description: string;
    genre: string;
    numberOfPages: number;

    static associate(models) {
      Book.belongsTo(models.User, { foreignKey: "userId", as: "Books" });
    }
  }
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userUid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "uuid",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfPages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
