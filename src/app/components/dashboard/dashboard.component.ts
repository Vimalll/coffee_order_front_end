
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WindowRef } from 'src/app/services/window.payment';



//import { DataService } from 'src/app/services/data.service';

export interface Transaction {
  item: any;
  quantity: any;
  cost: any;
}

let finale = false;

let payment_data={  // for storing payment_id, order_id , status sent by razor pay directly to front end , payment_data is an object
  payment_id:'',
  order_id:'',
  status:'',
 }

 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  


constructor(public userservice: UserService, public winRef: WindowRef ){}


   amt:any // for storing total cost of the customer items

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
      // For calculating total cost of the customer items
        this.amt = this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
       return this.amt
     
   }
   
   rzp1:any; // variable for storing payment form 

  

  paymentStart()
  {
  
    console.log("Payment started")
    if(this.amt=="" || this.amt== null)
     {
       alert("Atleast choose one item!!")
       return;
     }
     else 
     {
       
        //we will send requent to server to create order
        this.userservice.orderrequest(this.amt).subscribe(
          (response:any)=>{
            //success
            console.log(response);
            if(response.status == "created")
            {
              // open payment form to initiate payment
              
              let options={

                key: 'rzp_test_3XEKL4JwzLMfot', // secret key from razor pay
                amount: response.amount,
                currency:'INR',
                name: 'Coffee Order',
                description: 'Bill',
                image: '/assets/coffee.png',
                order_id: response.id,

                
                handler: function  (response:any){          //if payment is successful 
                  console.log(response.razorpay_payment_id);
                  console.log(response.razorpay_order_id);
                  console.log(response.razorpay_signature);
                  console.log("payment successful !! ,now press FINISH button to store payment status in database");
                  
                  //storing razorpay resoponse in payment_data global variable or object
                  payment_data.payment_id = response.razorpay_payment_id;
                  payment_data.order_id = response.razorpay_order_id;
                  payment_data.status = "paid";
                
                },
                
                prefill: {
                  name: "",
                  email: "",
                  contact: "",
                },

                notes: {
                  address: "Vimal coffee order project"
                },

                theme: {
                  color: "#3399cc"
                },

             }
             // Payment form ended
           this.rzp1 = new this.winRef.nativeWindow.Razorpay(options); //checkout form send to razorpay server not to spring boot(backend)
    
           this.rzp1.on('payment.failed', function (response:any){ // if payment fails
           console.log(response.error.code);
           console.log(response.error.description);
           console.log(response.error.source);
           console.log(response.error.step);
           console.log(response.error.reason);
           console.log(response.error.metadata.order_id);
           console.log(response.error.metadata.payment_id); 
           alert("Oops payment failed!!")
          });

          this.rzp1.open(); // to open payment form
        }
       },
          error=>{
           //error
           console.log(error);
           alert("Something went wrong!!")
          }
        )

     }
     

    }
    //when payment gets successful this function is used to store payment relevant completion data in the database
    paymentfinish = ()=>{
      
    if(payment_data.status==='paid')
    {
      this.userservice.updatepayment(payment_data).subscribe(
      (response:any)=>{
    
        console.log(response);
           alert("Payment Sucessful");
      },
       (error:any)=>{
         
       console.log(error);
       alert("Your payment is successful , but we did not get in on server ,we will contact you as soon as possible");}
      )
      payment_data.status ='done'
    }
    else if(payment_data.status==='done')
     console.log("Your payment status is already updated in database,don't press FINISH button unnecessarily")
     else
     console.log("First complete your payment and then press FINISH button ")
    
   }
    
  
   
}
