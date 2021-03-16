import { Component, OnInit } from '@angular/core';
//import { DataService } from 'src/app/services/data.service';

export interface Transaction {
  item: any;
  quantity: any;
  cost: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  constructor(){}

  A:any= '';
  B:any= '';
  C:any= '';
  D:any= '';



  ngOnInit(): void { 
  }
  displayedColumns: any[] = ['item', 'quantity', 'cost'];
  transactions: Transaction[] = [
    {item: 'AFFOGATO', quantity: this.A, cost: ''},
    {item: 'CAPPUCCINO', quantity:this.B,cost: ''},
    {item: 'ESPRESSO',quantity:this.C, cost: ''},
    {item: 'ICED MOCHA',quantity:this.D, cost: ''},
    
  ];
  // getTotalCost() {
  //   return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  // }

  onSubmit()
  {
    if(this.A=='' || this.A==null) 
      this.A=0;
    if(this.B=='' || this.B==null) 
      this.B=0;
    if(this.C=='' || this.C==null) 
      this.C=0;
    if(this.D=='' || this.D==null) 
      this.D=0;
      console.log(this.A);
       let one = this.A*10;
       let two = this.B*15;
       let three = this.C*5;
       let four= this.D*25;
      
      this.transactions= [
        {item: 'AFFOGATO', quantity: this.A, cost: one},
        {item: 'CAPPUCCINO', quantity:this.B,cost: two},
        {item: 'ESPRESSO',quantity:this.C, cost: three},
        {item: 'ICED MOCHA',quantity:this.D, cost: four},
       ];
       return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    }
   
  
  
}
