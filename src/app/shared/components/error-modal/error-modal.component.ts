import { Component, Inject } from '@angular/core';
import { DataInfoModal } from 'src/app/shared/models/data-info-modal.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {

  constructor(public readonly modal: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataInfoModal
  ) { }

  ngOnInit() {
    this.data = this.data;
  }

  onCloseModal() {
    this.modal.close();
  }

}
