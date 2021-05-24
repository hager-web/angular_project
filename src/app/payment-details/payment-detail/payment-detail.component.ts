import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: [
  ]
})
export class PaymentDetailComponent implements OnInit {
  serv:PaymentDetailService;
  
  constructor(private service:PaymentDetailService,private toastr: ToastrService) { 
    this.serv=service;
    
  }

  ngOnInit(): void {
    this.resetForm();

  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData={
      PMId:0,
      CardOwnerName: '',
      CardNumber:'',
      ExpirationDate:'',
      CVV:''
    }
  }
  onSubmit(form:NgForm){
    if(this.service.formData.PMId==0){
      this.insertRecord(form);
    }else{
      this.updateRecord(form);
    }
    

  }
  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.toastr.success('Submittedd Successfully', 'Payment Detail Registration!');
        this.service.refreshList();
      },
      err =>{
        console.log(err);

      }
    );
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.toastr.success('Submittedd Successfully', 'Payment Detail Registration!');

        this.service.refreshList();
      },
      err =>{
        console.log(err);

      }
    );
  }

}
