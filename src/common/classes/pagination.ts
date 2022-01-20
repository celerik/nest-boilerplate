/** @packages */
import { getRepository, ILike } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';

/** @application */
import { appRouteApi } from '@base/environments';
import {
  PaginateDto,
  ParamsPaginateDto,
  ParamsResponsePaginateDto,
  QueryDto,
} from '@common/dtos';

export class Pagination {
  getParams(query: QueryDto) {
    const page = +query?.page || 1;
    const take = +query?.limit || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword;
    const filtersParams = query.filters;
    let filters: string[] = [];
    if (filtersParams) {
      const items = filtersParams.split(',');
      for (const item of items) {
        const filter = item.split(':');
        if (!isNaN(Number(filter[1]))) {
          const queryParams = {
            [filter[0]]: {
              id: parseInt(filter[1]),
            },
          };
          filters = {
            ...filters,
            ...queryParams,
          };
        }
      }
    }

    return {
      page,
      take,
      skip,
      keyword,
      filters,
      status: query.status,
    };
  }

  getWhere(
    keyword?: string,
    fields?: string[],
    filters?: any[],
    status?: string,
  ): any {
    const state = { status };
    if (fields?.length >= 1 && keyword) {
      const query: any = [];
      for (const field of fields) {
        if (status) {
          query.push({
            ...filters,
            ...state,
            [field]: ILike('%' + keyword + '%'),
          });
        } else {
          query.push({
            ...filters,
            [field]: ILike('%' + keyword + '%'),
          });
        }
      }
      return query;
    }
    return status ? { ...filters, ...state } : { ...filters };
  }

  formatResponse(params: ParamsResponsePaginateDto): PaginateDto {
    const { page, take, keyword, filters, status, route, total, dto, items } =
      params;
    type dataPage = null | number | string;
    const last = Math.ceil(total / take);
    const next = page + 1 > last ? null : page + 1;
    const prev = page - 1 < 1 ? null : page - 1;
    let currentPage: dataPage = page;
    let nextPage: dataPage = next;
    let prevPage: dataPage = prev;
    let lastPage: dataPage = last;
    if (route) {
      let query = '';
      if (keyword) {
        query = `&keyword=${keyword}`;
      }
      if (filters) {
        query = `${query}&filters=${filters}`;
      }
      if (status) {
        query = `${query}&status=${status}`;
      }
      const path = `${appRouteApi}/${route}`;
      currentPage = `${path}?page=${page}&limit=${take}${query}`;
      nextPage = next ? `${path}?page=${next}&limit=${take}${query}` : next;
      prevPage = prev ? `${path}?page=${prev}&limit=${take}${query}` : prev;
      lastPage = last ? `${path}?page=${last}&limit=${take}${query}` : null;
    }
    return plainToClass(PaginateDto, {
      items: plainToInstance(dto, items),
      limit: take,
      total,
      currentPage,
      nextPage,
      prevPage,
      lastPage,
    });
  }

  async getPaginate(
    params: ParamsPaginateDto,
    query: QueryDto,
    order: any = { status: 'ASC', id: 'ASC' },
  ): Promise<PaginateDto> {
    const { dto, type, fields, relations, route } = params;
    const { page, take, keyword, filters, status, skip } =
      this.getParams(query);
    const where = this.getWhere(keyword, fields, filters);
    const [items, total] = await getRepository(type).findAndCount({
      where,
      relations,
      order,
      take,
      skip,
    });
    return this.formatResponse({
      dto,
      items,
      total,
      take,
      page,
      route,
      status,
      keyword,
      filters: query.filters,
    });
  }
}
