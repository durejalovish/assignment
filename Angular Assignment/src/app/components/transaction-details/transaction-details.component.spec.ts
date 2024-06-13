import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionDetailsComponent } from './transaction-details.component';
import { TransactionService } from '../../services/TransactionService';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule as well
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('TransactionDetailComponent', () => {
  let component: TransactionDetailsComponent;
  let fixture: ComponentFixture<TransactionDetailsComponent>;
  let transactionService: TransactionService;
  let router: Router;

  const mockTransaction = { id: 1, date: '01/10/2020', comments: 'Utility bill' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDetailsComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule, // Add FormsModule for template-driven forms
        RouterTestingModule.withRoutes([]),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            getTransactionById: (id: number) => mockTransaction,
            updateTransactionComments: (id: number, comments: string) => {
              mockTransaction.comments = comments;
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transaction details', () => {
    const idInput = fixture.debugElement.query(By.css('input[formControlName="id"]')).nativeElement;
    const dateInput = fixture.debugElement.query(By.css('input[formControlName="date"]')).nativeElement;
    const commentsInput = fixture.debugElement.query(By.css('input[formControlName="comments"]')).nativeElement;

    expect(idInput.value).toBe('1');
    expect(dateInput.value).toBe('01/10/2020');
  });

  it('should update the transaction comments and navigate back to the list', () => {
    spyOn(router, 'navigate');

    const commentsInput = fixture.debugElement.query(By.css('input[formControlName="comments"]')).nativeElement;
    commentsInput.value = 'New comment';
    commentsInput.dispatchEvent(new Event('input'));

    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    saveButton.click();

    expect(mockTransaction.comments).toBe('New comment');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show validation errors for comments', () => {
    const commentsInput = fixture.debugElement.query(By.css('input[formControlName="comments"]')).nativeElement;

    // Trigger validation without inputting any value
    commentsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    let errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));
    

    // Input invalid comment format
    commentsInput.value = 'Invalid@Comment!';
    commentsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));  });
});
