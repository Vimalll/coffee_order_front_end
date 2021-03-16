import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:9595"

  constructor(private http:HttpClient) { }

  getUser()
  {
    return this.http.get(`${this.baseUrl}/getusers`)
  }

  //sending details for new user to server

  send_details(credentials:any)
  {
    return this.http.post(`${this.baseUrl}/registration`,credentials);
   }
}
