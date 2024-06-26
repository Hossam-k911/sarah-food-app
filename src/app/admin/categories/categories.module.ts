import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditCategoriesComponent } from './components/add-edit-categories/add-edit-categories.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,

  ]
})
export class CategoriesModule { }
