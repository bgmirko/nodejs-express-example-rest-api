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
import {
  Length,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import Book from './book';

@Table({tableName: 'User'})
export default class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Length(3, 15)
  @IsNotEmpty()
  @Column({allowNull: false, validate: {notEmpty: true}})
  firstName: string;

  @Length(3, 15)
  @IsNotEmpty()
  @Column({allowNull: false, validate: {notEmpty: true}})
  lastName: string;

  @Length(3, 10)
  @IsNotEmpty()
  @Column({allowNull: false, validate: {notEmpty: true}})
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({
    allowNull: false,
    unique: true,
    validate: {notEmpty: true, isEmail: true},
  })
  email: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @Column({defaultValue: true})
  @IsBoolean()
  active: boolean;

  @Column(DataType.ENUM(RoleType.Admin, RoleType.Author))
  @IsEnum(RoleType)
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
