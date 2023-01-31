import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { FlightsNotFoundComponent } from './components/flights-not-found/flights-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyExchangePipe } from './pipes/currency-exchange.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrorModalComponent,
    CurrencyExchangePipe,
    FlightsNotFoundComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  exports: [
    HeaderComponent,
    CurrencyExchangePipe,
    FlightsNotFoundComponent
  ]
})

export class SharedModule { }
