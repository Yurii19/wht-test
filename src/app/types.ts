export interface IBreed {
  id: string;
  name: string;
}

export interface IFilter {
  breeds: IBreed;
  limit: number;
}
