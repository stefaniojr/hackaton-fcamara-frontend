import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then((m) => m.AppointmentModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./list-appointments/list-appointments.module').then((m) => m.ListAppointmentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
