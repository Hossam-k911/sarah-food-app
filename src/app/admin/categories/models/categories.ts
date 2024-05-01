export namespace Categories {
  export interface ICategoriesList {
    data: ICategoriesData[];
    pageNumber: number;
    pageSize: number;
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }

  export interface ICategoriesData {
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
  }
}
