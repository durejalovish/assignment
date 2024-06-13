import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/TransactionService';

interface Transaction {
  id: number;
  date: string;
  Comments: string;
}


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent {
  transactionForm: FormGroup;
  transaction: Transaction | undefined;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      date: [{ value: '', disabled: true }],
      Comments: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.transaction = this.transactionService.getTransactionById(id);
    if (this.transaction) {
      this.transactionForm.patchValue({
        id: this.transaction.id,
        date: this.transaction.date,
        Comments: this.transaction.Comments
      });
    }
  }

  onSubmit(): void {
    if (this.transactionForm.valid && this.transaction) {
      let data = {
        comments: this.transactionForm.get('comments')!.value,
        id: this.transaction.id
      }
      this.transactionService
          .updateComments(data)
          .subscribe({
            next: (value: any) => {
              this.router.navigate(['/']);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
    }
  }
}
