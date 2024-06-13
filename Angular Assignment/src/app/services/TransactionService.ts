import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

interface Transaction {
  id: number;
  date: string;
  Comments: string;
}

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  apiUrl = "http://localhost:8081";
 
  constructor(private http: HttpClient) {}

  getllTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getTransactions`)
  }

  updateComments(data: any): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/api/updateComments`, data);
  }

  public formatDate(timestamp: number): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(timestamp, 'dd/MM/yyyy') || '';
  }

  private transactions: Transaction[] = [
    { id: 1, date: '01/10/2020', Comments: 'Utility bill' },
    { id: 2, date: '15/10/2020', Comments: '' }
  ];

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionById(id: number) {
    let data = localStorage.getItem('transactions');
    if(data !=null) {
      let transactions = JSON.parse(data);
      let selectedTransaction =  transactions.find((transaction: any) => transaction.id === id.toString());
      return selectedTransaction;
    }
  }

  updateTransactionComments(id: number, comments: string): void {
    const transaction = this.transactions.find(transaction => transaction.id === id);
    if (transaction) {
      transaction.Comments = comments;
    }
  }
}
