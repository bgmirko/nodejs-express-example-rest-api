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
import User from './user';

@Table({tableName: 'Book'})
export default class Book extends Model<Book> {
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER})
  declare id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.UUID})
  userUid: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  title: string;

  @Column({allowNull: false, validate: {notEmpty: true}})
  publisher: string;

  @Column({allowNull: true, validate: {notEmpty: true}})
  description: string;

  @Column({allowNull: false, validate: {notEmpty: false}})
  genre: string;

  @Column({allowNull: true, validate: {notEmpty: true}})
  numberOfPages: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => User, 'uuid')
  user: User;
}
