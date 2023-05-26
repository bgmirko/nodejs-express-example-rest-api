import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import {
  IsString,
  IsNumber,
  IsUUID,
  MaxLength,
  Length,
  IsNotEmpty,
} from 'class-validator';
import User from './user';

@Table({tableName: 'Book'})
export default class Book extends Model<Book> {
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER})
  declare id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.UUID})
  @IsNotEmpty()
  @IsUUID()
  userUid: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  @IsNotEmpty()
  @Length(3, 20)
  publisher: string;

  @Column({allowNull: true, validate: {notEmpty: false}})
  @IsString()
  @MaxLength(500)
  description: string;

  @Column({allowNull: false, validate: {notEmpty: false}})
  @IsString()
  genre: string;

  @Column({allowNull: true, validate: {notEmpty: false}})
  @IsNumber()
  numberOfPages: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => User, 'uuid')
  user: User;
}
