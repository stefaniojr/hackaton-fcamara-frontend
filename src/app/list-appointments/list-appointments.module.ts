import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAppointmentsComponent } from './list-appointments.component';
import { ListAppointmentsRoutingModule } from './list-appointments-routing.module';

import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    ListAppointmentsComponent
  ],
  imports: [
    CommonModule,
    ListAppointmentsRoutingModule,
    PipesModule
  ]
})
export class ListAppointmentsModule { }
