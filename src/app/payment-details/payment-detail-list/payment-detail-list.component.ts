import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: [],
})
export class PaymentDetailListComponent implements OnInit {
  ser: PaymentDetailService;
  constructor(
    private service: PaymentDetailService,
    private toaster: ToastrService
  ) {
    this.ser = service;
  }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(pd: PaymentDetail) {
    this.service.formData = Object.assign({}, pd);
  }
  deletePd(PMId) {
    if (confirm('Are you sure to delete?'))
      this.service.deletePaymentDetail(PMId).subscribe(
        (res) => {
          this.service.refreshList();
          this.toaster.warning(
            'Deleted Successfully',
            'Payment Detail Registration!'
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
