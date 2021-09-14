import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatRadioModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AppointmentModule {}
