

export namespace Recipes {
  export interface IRecipeList {
    data: IRecipeData[];
    pageNumber: number;
    pageSize: number;
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }

  export interface IRecipeData {
    id: number;
    name: string;
    imagePath:string;
    description:string;
    price:number;
    category:ICat[];
    creationDate: Date;
    modificationDate: Date;
    tag:ITag;
  }
  export interface ITag{
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
  }
  export interface ICat{
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
  }
  export interface ITags{
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
  }
}
