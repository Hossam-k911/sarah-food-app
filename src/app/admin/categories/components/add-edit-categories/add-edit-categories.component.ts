import { Categories } from './../../models/categories';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesComponent } from '../../categories.component';
interface IData {
  mode: string;
  row: Categories.ICategoriesData;
}
@Component({
  selector: 'app-add-edit-categories',
  templateUrl: './add-edit-categories.component.html',
  styleUrls: ['./add-edit-categories.component.scss'],
})
export class AddEditCategoriesComponent implements OnInit {
  CategoryId!: number;
  CategoryName: string = '';
  isViewMode: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<AddEditCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {

  }

  ngOnInit() {
    if (this.data.row) {
      this.CategoryName = this.data.row.name;
    }
    if (this.data.mode=='view') {
      this.isViewMode=true
    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
