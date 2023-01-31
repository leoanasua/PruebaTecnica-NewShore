import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Journey } from 'src/app/shared/models/journey.interface';

@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.css']
})
export class JourneyDetailsComponent {

  constructor(
    public modal: MatDialogRef<JourneyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public journey: Journey
  ) { }

}
