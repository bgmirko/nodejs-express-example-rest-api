import {RoleType} from '../../utils/enums';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
  DeletedAt,
} from 'sequelize-typescript';
import Book from './book';

@Table({tableName: 'User'})
export default class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  firstName: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  lastName: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  username: string;

  @Column({
    allowNull: false,
    unique: true,
    validate: {notEmpty: true, isEmail: true},
  })
  email: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  password: string;

  @Column({defaultValue: true})
  active: boolean;

  @Column(DataType.ENUM(RoleType.Admin, RoleType.Author))
  role: RoleType;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;

  @HasMany(() => Book, {
    foreignKey: 'userUid',
  })
  books: Book[];
}
