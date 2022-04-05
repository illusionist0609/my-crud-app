import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postClient(data : any){
    return this.http.post<any>("http://localhost:3000/ClientList/", data);
  }
  getClient(){
    return this.http.get<any>("http://localhost:3000/ClientList/");
  }
  putClient(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/ClientList/" + id,data);
  }
  deleteClient(id : number){
    return this.http.delete<any>("http://localhost:3000/ClientList/" + id)
  }
}
