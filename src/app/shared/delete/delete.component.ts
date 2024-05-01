import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor() {
    // @Inject(MAT_DIALOG_DATA) public data: any) {
    //   if (this.data.row) {

    //       }
    //  }
  }

  ngOnInit() {
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
