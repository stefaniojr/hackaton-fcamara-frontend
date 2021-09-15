import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { Filtro } from './models/filtro.model';
import { Funcionario } from './models/funcionario.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentComponent implements OnInit {
  form: FormGroup; // define um formulário a ser usado para login.
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

  showStep1: boolean = true;
  showStep2: boolean = false;
  showStep3: boolean = false;
  showStep4: boolean = false;
  showFinish: boolean = false;
  selected: boolean = false;
  invitedFriends: boolean = false;
  funcionarios: Funcionario[];
  emails: string[] = [];
  id: string;
  nome: string;

  dataFiltro: Filtro;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private storage: StorageService,
    private api: ApiService
  ) {}

  async ngOnInit() {
    this.funcionarios = await this.obterFuncionarios();
    const profile = await this.storage.get('profile');
    this.id = JSON.parse(profile).id;
    this.nome = JSON.parse(profile).nome;
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      id_funcionario: this.id,
      data: [''],
      turno: [''],
      local: [''],
    });
  }

  async obterFuncionarios() {
    return await this.api.getFuncionarios();
  }

  goForward() {
    if (this.showStep1) {
      this.showStep1 = false;
      this.showStep2 = true;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showFinish = false;
    } else if (this.showStep2) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = true;
      this.showStep4 = false;
      this.showFinish = false;
    } else if (this.showStep3) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = true;
      this.showFinish = false;
    } else if (this.showStep4) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showFinish = true;
    }
  }

  goBack() {
    if (this.showStep4) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = true;
      this.showStep4 = false;
      this.showFinish = false;
    } else if (this.showStep3) {
      this.showStep1 = false;
      this.showStep2 = true;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showFinish = false;
    } else if (this.showStep2) {
      this.showStep1 = true;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showFinish = false;
    } else if (this.showStep1) {
      this.showStep1 = true;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showFinish = false;
      this.goHome();
    }
  }

  async finishAppointment(invited: boolean) {
    this.showStep1 = false;
    this.showStep2 = false;
    this.showStep3 = false;
    this.showStep4 = false;
    this.showFinish = true;
    this.invitedFriends = invited;

    if (invited) {
      await this.api.inviteFriends(
        this.emails.join(),
        this.nome,
        this.form.value.data,
        this.form.value.turno
      );
    }

    this.submitAgendamento();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  async setDate(event: any) {
    let data = this.datepipe.transform(event, 'dd/MM/yyyy');
    this.form.controls['data'].setValue(data);
    this.form.controls['turno'].setValue('');
    this.dataFiltro = await this.api.filtrarData(data, this.form.value.local);
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  setSP() {
    this.form.controls['local'].setValue('SP');
    this.dataFiltro = undefined;
    this.goForward();
  }

  setSantos() {
    this.form.controls['local'].setValue('Santos');
    this.dataFiltro = undefined;
    this.goForward();
  }

  setTurno(turno: string) {
    this.form.controls['turno'].setValue(turno);
  }

  async submitAgendamento() {
    if (this.form.value.turno === 'A') {
      try {
        await this.api.agendar(
          this.form.value.id_funcionario,
          this.form.value.data,
          'M',
          this.form.value.local
        );

        await this.api.agendar(
          this.form.value.id_funcionario,
          this.form.value.data,
          'T',
          this.form.value.local
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await this.api.agendar(
          this.form.value.id_funcionario,
          this.form.value.data,
          this.form.value.turno,
          this.form.value.local
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  addOrRemoveEmail(funcionario: Funcionario) {
    //colocar condicional de tamanho
    if (this.emails.includes(funcionario.email)) {
      this.emails = this.arrayRemove(this.emails, funcionario.email);
      funcionario.selected = false;
    } else {
      if (this.emails.length <= 10) {
        this.emails.push(funcionario.email);
        funcionario.selected = true;
      }
    }
  }

  arrayRemove(arr: string[], value: string) {
    return arr.filter(function (r) {
      return r != value;
    });
  }
}
