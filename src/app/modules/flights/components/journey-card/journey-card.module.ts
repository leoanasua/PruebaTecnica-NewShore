import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyCardComponent } from './journey-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
