import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { Agendamentos } from 'src/app/list-appointments/models/agendamentos.model';
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
  public agendamentos: any;
  id: string;

  constructor(
    private router: Router,
    private storage: StorageService,
    private api: ApiService
  ) {}

  async ngOnInit() {
    const profile = await this.storage.get('profile'); // recupera objeto de perfil do usuário logado
    this.id = JSON.parse(profile).id;
    this.loadAgendamentos(); // carrega os agendamentos
  }

  async loadAgendamentos() {
    try {
      this.agendamentosObj = await this.api.getAgendamentos(this.id); // carrega objeto agendamentos
      this.agendamentos = this.agendamentosObj.data; // pega o field data, field que contém o array de agendamentos do user
      this.agendamentos.sort(this.compare);
    } catch (e) {
      console.log(e);
    }
  }

  // vai pra path raiz
  goBack() {
    this.router.navigate(['/']);
  }

  async cancelarAgendamento(id: string) {
    try {
      await this.api.deleteAgendamento(id); // deleta o agendamento
      await this.loadAgendamentos(); // atualiza a lista
    } catch (e) {
      console.log(e);
    }
  }

  // função de callback para ordenar os agendamentos
  compare(a: any, b: any) {
    // quebra em 3 partes
    var parts1 = a.data.split('/');
    var parts2 = b.data.split('/');
    // coloca no formato YYYYMMDD, formato interessante para ordenação
    var d1 = parts1[2] + parts1[1] + parts1[0];
    var d2 = parts2[2] + parts2[1] + parts2[0];
    if (d1 < d2) {
      return -1;
    }
    if (d1 > d2) {
      return 1;
    }
    return 0;
  }
}
