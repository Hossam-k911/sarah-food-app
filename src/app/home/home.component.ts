import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  UserName:string|null=null;

  ngOnInit(): void {
    this.UserName=localStorage.getItem('userName');
  }


}
