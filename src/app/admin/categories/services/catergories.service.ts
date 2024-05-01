import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Categories} from '../models/categories'
@Injectable({
  providedIn: 'root'
})
export class CatergoriesService {

constructor(private _HttpClient:HttpClient) { }

getAllCategories(pageSize:number,pageNumber:number):Observable<any>{
 return this._HttpClient.get('Category',{params:{pageSize:pageSize,pageNumber:pageNumber}})
}

onAddCategory(itemName:string):Observable<any>{
return this._HttpClient.post('Category',{name:itemName})
}

onEditCategory(categId:number,itemName:string):Observable<any>{
  return this._HttpClient.put(`Category/${categId}`,{name:itemName})
  }
}
