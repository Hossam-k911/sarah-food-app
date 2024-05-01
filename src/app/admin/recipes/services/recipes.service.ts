import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

constructor(private _HttpClient:HttpClient) { }
getAllRecipes(filterParam:any):Observable<any>{
  return this._HttpClient.get('Recipe',{params:filterParam})
 }

 onAddRecipe(itemName:string):Observable<any>{
 return this._HttpClient.post('Category',{name:itemName})
 }

 onEditRecipes(categId:number,itemName:string):Observable<any>{
   return this._HttpClient.put(`Category/${categId}`,{name:itemName})
   }

  getAllTags():Observable<any>{
    return this._HttpClient.get('tag')
  }

}
