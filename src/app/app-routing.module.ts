import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'appointment',
    canActivate: [AuthGuard],
    loadChildren: () => import('./appointment/appointment.module').then((m) => m.AppointmentModule),
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./list-appointments/list-appointments.module').then((m) => m.ListAppointmentsModule),
  },
  { path: "**", redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
