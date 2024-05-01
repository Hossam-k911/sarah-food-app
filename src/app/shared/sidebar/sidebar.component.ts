import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenue{
  text:string,
  icon:string,
  link?:string,
  isActive:boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private _AuthService:AuthService ){}
  isAdmin(){
    return this._AuthService.role=='SuperAdmin'?true:false
  }

  isUser(){
    return this._AuthService.role=='SystemUser'?true:false
  }

  menue:IMenue[]=[
    {
      text:'Home',
      icon:'fa-solid fa-home',
      link:'./home',
      isActive:this.isAdmin()||this.isUser()
    },
    {
      text:'Users',
      icon:'fa-solid fa-users',
      link:'',
      isActive:this.isAdmin()
    },
    {
      text:'Admin Recipes',
      icon:'fa-solid fa-home',
      link:'./admin/recipes',
      isActive:this.isAdmin()
    },
    {
      text:'Categories',
      icon:'fa-solid fa-users',
      link:'./admin/categories',
      isActive:this.isAdmin()
    },
    {
      text:'User Recipes',
      icon:'fa-solid fa-users',
      link:'',
      isActive:this.isUser()
    },
    {
      text:'Favorites',
      icon:'fa-solid fa-heart',
      link:'',
      isActive:this.isUser()
    },
    {
      text:'Change Password',
      icon:'fa-solid fa-unlock-keyhole',
      link:'',
      isActive:this.isAdmin()||this.isUser()
    },
    {
      text:'Logout',
      icon:'fa-solid fa-right-from-bracket',
      link:'../auth',
      isActive:this.isAdmin()||this.isUser()
    }

  ]
}
