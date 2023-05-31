import {MakeNullishOptional} from 'sequelize/types/utils';
import {IRequestQuery} from '../../utils/types';
import {Model, FindOptions, ModelStatic, WhereOptions} from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async findAndCountAll(
    options?: FindOptions,
    query?: IRequestQuery,
  ): Promise<{count: number; rows: T[]}> {
    const result = await this.model.findAndCountAll({
      ...options,
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
    return {
      count: result.count,
      rows: result.rows as T[],
    };
  }

  async getById<U>(
    idKeyName: string,
    idValue: U,
    options?: FindOptions,
  ): Promise<T | null> {
    const whereClause = {
      [idKeyName]: idValue,
    } as WhereOptions<T>;

    return this.model.findOne({
      where: whereClause,
      ...(options ?? null),
    });
  }

  async create(data: MakeNullishOptional<T>): Promise<T> {
    return this.model.create({
      ...data,
    });
  }

  async delete<U>(idKeyName: string, idValue: U): Promise<number> {
    const whereClause = {
      [idKeyName]: idValue,
    } as WhereOptions<T>;

    return this.model.destroy({
      where: whereClause,
    });
  }

  async update<U>(
    idKeyName: string,
    idValue: U,
    data: Partial<T>,
  ): Promise<[affectedCount: number]> {
    const whereClause = {
      [idKeyName]: idValue,
    } as WhereOptions<T>;

    return this.model.update(
      {
        ...data,
      },
      {
        where: whereClause,
      },
    );
  }

  getModel(): ModelStatic<T> {
    return this.model;
  }
}
