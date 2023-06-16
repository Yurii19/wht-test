export class GetCats {
  static readonly type = '[Cats] Fetch';
}
export class GetBreeds {
  static readonly type = '[Breeds] Fetch';
}
export class GetCatsWithFilter {
  static readonly type = '[Cats] Update';
  constructor(public payload: any) {}
}
