import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  formData: PaymentDetail;
  readonly rootURL = 'https://localhost:44340/api';
  list: PaymentDetail[];

  constructor(private http: HttpClient) {}

  postPaymentDetail() {
    return this.http.post(this.rootURL + '/PaymentDetails', this.formData);
  }
  refreshList() {
    this.http
      .get(this.rootURL + '/PaymentDetails')
      .toPromise()
      .then((res) => (this.list = res as PaymentDetail[]));
  }
  putPaymentDetail() {
    return this.http.put(
      this.rootURL + '/PaymentDetails/' + this.formData.PMId,
      this.formData
    );
  }
  deletePaymentDetail(id) {
    return this.http.delete(this.rootURL + '/PaymentDetails/' + id);
  }
}
