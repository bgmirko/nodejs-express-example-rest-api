import { Model } from "sequelize";
import { RoleType } from "../../utils/enums";

export interface UserAttributes {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: RoleType
  active: boolean;
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    uuid: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: RoleType;
    active: boolean;

    static associate(models) {
        User.hasMany(models.Book, {
          foreignKey: "userUid", 
          onDelete: 'cascade'
        });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        unique:true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(RoleType),
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
