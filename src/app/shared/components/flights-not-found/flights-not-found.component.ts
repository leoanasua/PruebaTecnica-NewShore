import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flights-not-found',
  templateUrl: './flights-not-found.component.html',
  styleUrls: ['./flights-not-found.component.css']
})
export class FlightsNotFoundComponent {

  constructor(public readonly modal: MatDialogRef<FlightsNotFoundComponent>) { }

  onCloseModal() {
    this.modal.close();
  }
}
