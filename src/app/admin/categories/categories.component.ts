import { CategoriesModule } from './categories.module';
import { Component, OnInit } from '@angular/core';
import { CatergoriesService } from './services/catergories.service';
import { Categories } from './models/categories';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoriesComponent } from './components/add-edit-categories/add-edit-categories.component';
import { NotifyService } from 'src/app/core/services/Notify.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  pageSize: number = 10;
  pageNumber: number = 1;
  listData!: Categories.ICategoriesList;
  data!: Categories.ICategoriesData;
  CategoryId!:number;
  isEditMode:boolean=false;
  length = 50;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  //pageEvent: PageEvent;


  constructor(
    private _CatergoriesService: CatergoriesService,
    private _NotifyService: NotifyService,
    public _dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.getCatergeoryData();
  }
  handlePageEvent(e: PageEvent) {
    console.log("e",e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getCatergeoryData()
  }
  getCatergeoryData() {
    this._CatergoriesService.getAllCategories(this.pageSize, this.pageNumber).subscribe({
        next: (res) => {
          this.listData = res;
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  openAddEditCategories(mode: string,row?:Categories.ICategoriesData) {
    row?this.CategoryId=row.id:null
    const dialogRef = this._dialog.open(AddEditCategoriesComponent, {
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
    this._CatergoriesService.onAddCategory(CategoryName).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (errRes) => {
        const errMes=errRes.error.message
        this._NotifyService.ServerError(errMes)
      },
      complete:()=> {
        this._NotifyService.Success("Data is Sent Successfully")

        this.getCatergeoryData();
      },
    });
  }
  editCategory(CategoryName: string) {
    console.log("edit");

    this._CatergoriesService.onEditCategory(this.CategoryId,CategoryName).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (errRes) => {
        const errMes=errRes.error.message
        this._NotifyService.ServerError(errMes)
      },
      complete:()=> {
        this._NotifyService.Success("Data is Sent Successfully")
        this.getCatergeoryData();
      },
    });
  }
  DeleteCategories(row:Categories.ICategoriesData){
    const dialogRef = this._dialog.open(DeleteComponent, {
      data: {row},
      width: '700px',
      height: '500px'
    });
  }
}
