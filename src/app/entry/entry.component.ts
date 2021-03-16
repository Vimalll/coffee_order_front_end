import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
 

  credentials={
    username:'',
    password:'',
    id:'',
    email:'',
  }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
onSubmit()
  {
   
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null))
     {
       console.log("We have to submit the form to server")
     
       this.userService.send_details(this.credentials).subscribe(
        (user:any)=>{
          console.log(user)
           console.log("Registration completed");
           window.location.href="/login"
        },
        error=>{
          console.log(error)
        }
      )
     }
     else{
       console.log("Fields are empty !!");
     }
  }
}
