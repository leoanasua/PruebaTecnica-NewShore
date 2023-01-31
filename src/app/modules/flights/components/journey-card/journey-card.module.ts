import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { JourneyCardComponent } from './journey-card.component';

@NgModule({
  declarations: [
    JourneyCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    JourneyCardComponent
  ]
})
export class JourneyCardModule { }
