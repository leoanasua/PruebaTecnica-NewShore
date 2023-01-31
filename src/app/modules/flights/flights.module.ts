import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { JourneyCardModule } from './components/journey-card/journey-card.module';
import { JourneyDetailsComponent } from './components/journey-details/journey-details.component';

const routes: Routes = [
  {
    path: '',
    component: FlightsListComponent
  }
];

@NgModule({
  declarations: [
    FlightsListComponent,
    JourneyDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    SharedModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    JourneyCardModule
  ],
  exports: [
    JourneyDetailsComponent
  ]
})
export class FlightsModule { }
