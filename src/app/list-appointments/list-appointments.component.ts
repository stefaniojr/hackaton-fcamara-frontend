import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { Agendamentos } from 'src/app/list-appointments/models/agendamentos.model';
import { Agendamento } from 'src/app/appointment/models/agendamento.model';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(1000, style({ opacity: 0 }))]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ListAppointmentsComponent implements OnInit {
  public agendamentosObj: Agendamentos;
  public agendamentos: Agendamento;
  id: string;

  constructor(
    private router: Router,
    private storage: StorageService,
    private api: ApiService
  ) {}

  async ngOnInit() {
    const profile = await this.storage.get('profile');
    this.id = JSON.parse(profile).id;
    this.loadAgendamentos();
  }

  async loadAgendamentos() {
    try {
      this.agendamentosObj = await this.api.getAgendamentos(this.id);
      this.agendamentos = this.agendamentosObj.data;
    } catch (e) {
      console.log(e);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async cancelarAgendamento(id: string) {
    try {
      await this.api.deleteAgendamento(id);
      await this.loadAgendamentos();
    } catch (e) {
      console.log(e);
    }
  }
}
