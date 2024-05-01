import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule} from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  exports:[
    NgxDropzoneModule,
    NavbarComponent,
    SidebarComponent,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class SharedModule { }
