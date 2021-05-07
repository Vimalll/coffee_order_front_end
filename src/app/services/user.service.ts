import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:9595"

  constructor(private http:HttpClient) { }
  
 //sending details to register new users and store their data in database 

  send_details(credentials:any)
  {
    return this.http.post(`${this.baseUrl}/registration`,credentials);
   }

   //for sending user payment ammount to server

   orderrequest(amount:any)
   {
    return this.http.post(`${this.baseUrl}/createorder`,amount);
   }

   updatepayment(payment_data:any)
   {
    return this.http.post(`${this.baseUrl}/update_order`,payment_data);
   }
}
