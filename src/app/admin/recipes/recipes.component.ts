import { CatergoriesService } from './../categories/services/catergories.service';
import { Recipes } from './models/recipes';
import { Component } from '@angular/core';
import { RecipesService } from './services/recipes.service';
import { NotifyService } from 'src/app/core/services/Notify.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent } from '@angular/material/paginator';
import { Categories } from '../categories/models/categories';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  pageSize: number = 10;
  pageNumber: number = 1;
  listData!: Recipes.IRecipeList;
  tagesList: Recipes.ITags[]=[];
  catsList!:Categories.ICategoriesList
  catsListData:Categories.ICategoriesData[]=[]
  data!: any
  CategoryId!:number;
  isEditMode:boolean=false;
  length = 50;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  imgUrl:string='https://upskilling-egypt.com:3006/';
  dammyImg:string='../../../assets/img/categories/Dummy food.jpg'
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  searchValue:string=''
  //pageEvent: PageEvent;

  constructor(
    private _RecipesService: RecipesService,
    private _NotifyService: NotifyService,
    public _dialog: MatDialog,
    private _CatergoriesService:CatergoriesService
  ) {}


  ngOnInit(): void {
    this.getRecipyData();
    this.getTags();
    this.getCatergories()
  }
  handlePageEvent(e: PageEvent) {
    console.log("e",e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getRecipyData()
  }
  getRecipyData() {
    let filter={
      name:this.searchValue,
      pageSize:this.pageSize,
      pageNumber:this.pageNumber
    }
    this._RecipesService.getAllRecipes(filter).subscribe({
        next: (res) => {
          this.listData = res;
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  getTags() {
    this._RecipesService.getAllTags().subscribe({
        next: (res) => {
          this.tagesList = res;
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  getCatergories() {
    this._CatergoriesService.getAllCategories(1000,1).subscribe({
        next: (res) => {
          this.catsList = res;
          this.catsListData=res.data
          console.log("catsList",this.catsList)

        },
        error: (err) => {},
        complete: () => {},
      });
  }

  openAddEditCategories(mode: string,row?:any) {
    row?this.CategoryId=row.id:null
    const dialogRef = this._dialog.open(AddEditRecipesComponent, {
      data:  {row, mode},
      width: '30%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
      if (result) {
        if (!this.CategoryId) {
          this.addCategory(result);
        }else this.editCategory(result);

      }
    });
  }

  addCategory(CategoryName: string) {
    this._RecipesService.onAddRecipe(CategoryName).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (errRes) => {
        const errMes=errRes.error.message
        this._NotifyService.ServerError(errMes)
      },
      complete:()=> {
        this._NotifyService.Success("Data is Sent Successfully")

        this.getRecipyData();
      },
    });
  }
  editCategory(CategoryName: string) {
    console.log("edit");

    this._RecipesService.onEditRecipes(this.CategoryId,CategoryName).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (errRes) => {
        const errMes=errRes.error.message
        this._NotifyService.ServerError(errMes)
      },
      complete:()=> {
        this._NotifyService.Success("Data is Sent Successfully")
        this.getRecipyData();
      },
    });
  }


  DeleteCategories(row:any){
    const dialogRef = this._dialog.open(DeleteComponent, {
      data: {row},
      width: '700px',
      height: '500px'
    });
  }


}
