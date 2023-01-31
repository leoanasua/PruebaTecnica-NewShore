import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Journey } from 'src/app/shared/models/journey.interface';
import { JourneyDetailsComponent } from '../journey-details/journey-details.component';

import { JourneyCardComponent } from './journey-card.component';

describe('JourneyCardComponent', () => {
  let component: JourneyCardComponent;
  let fixture: ComponentFixture<JourneyCardComponent>;
  let dialogRef: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JourneyCardComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JourneyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init var', () => {
    const mockCurrencyOptions = ['USD', 'EUR', 'MXN'];
    expect(component.currencyOptions).toEqual(mockCurrencyOptions);
  });

  it('should call to changeCurrency method and set selected currency option', () => {
    const mockCurrency = 'USD';
    component.changeCurrency(mockCurrency);
    expect(component.currency).toEqual(mockCurrency)
  });

  it('should call to openJourneyDetails method', () => {
    const mockJourney = {} as Journey[];
    spyOn(component, 'openJourneyDetails').and.callFake(() => { });
    component.openJourneyDetails(mockJourney);
    expect(component.openJourneyDetails).toHaveBeenCalledWith(mockJourney);
  });

});
