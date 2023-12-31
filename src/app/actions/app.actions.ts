import { IFilter } from '../types';

export class GetBreeds {
  static readonly type = '[Breeds] Fetch';
}
export class GetCatsWithFilter {
  static readonly type = '[Cats] Update';
  constructor(public payload: IFilter) {}
}
export class SetIsLoading {
  static readonly type = '[IsLoading] Update';
  constructor(public payload: boolean) {}
}
