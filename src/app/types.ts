export interface ICat {
    id: string;
    width: number;
    height: number;
    url: string;
    breeds: [];
    //favourite:{}
  }
  
  export interface IBreed {
    id: string;
    name: string;
  }
  
//   export interface ICatState {
//     catsSet: ICat[];
//     breedsSet: IBreed[];
//   }
  
  export interface IFilter {
    breeds: IBreed;
    limit: number;
  }
  
//   export interface IAppState {
//     cats: ICatState;
//   }
  