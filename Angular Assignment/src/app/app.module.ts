import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [AppComponent, TransactionListComponent, TransactionDetailsComponent],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
