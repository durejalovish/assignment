import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from '../../services/TransactionService';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let transactionService: TransactionService;
  let router: Router;

  const mockTransactions = [
    { id: 1, date: '01/10/2020', comments: 'Utility bill' },
    { id: 2, date: '15/10/2020', comments: 'Sample comment' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionListComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatTableModule,
        MatButtonModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            getTransactions: () => of(mockTransactions) // Return mock data as observable
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the transaction data', () => {
    fixture.detectChanges(); // Ensure detection cycle runs to populate data

    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    console.log(rows);
    const firstRowCells = rows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('01/10/2020');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('Utility bill');

    const secondRowCells = rows[1].queryAll(By.css('mat-cell'));
    expect(secondRowCells[0].nativeElement.textContent.trim()).toBe('2');
    expect(secondRowCells[1].nativeElement.textContent.trim()).toBe('15/10/2020');
    expect(secondRowCells[2].nativeElement.textContent.trim()).toBe('Sample comment');
  });

});
