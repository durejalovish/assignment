import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TransactionService } from 'src/app/services/TransactionService';

interface Transaction {
  id: number;
  date: string;
  Comments: string;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  displayedColumns: string[] = ['id', 'date', 'comments', 'action'];
  transactions: Transaction[] = [];
  formattedDate: string;

  constructor(public transactionService: TransactionService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
   // this.transactions = this.transactionService.getTransactions();
    this.getAllTransactions();
  }

  getAllTransactions(): void {
    this.transactionService.getllTransactions().subscribe({
      next: (res) => {
        if(res.data){
          this.transactions = res.data;
          localStorage.setItem('transactions', JSON.stringify(this.transactions));
        }
      },
      error: (err: any) => {},
    });
 }

}
