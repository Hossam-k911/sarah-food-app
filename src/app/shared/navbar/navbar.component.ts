import { Component,OnInit  } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
UserName:string|null=null;
constructor(private _AuthService:AuthService){
}

ngOnInit() {
this.UserName=localStorage.getItem('userName');
}
}
