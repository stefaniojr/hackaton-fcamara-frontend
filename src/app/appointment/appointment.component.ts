import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { Filtro } from './models/filtro.model';
import { Funcionario } from './models/funcionario.model';
import { GetShortName } from 'src/app/pipes/short-name.pipe';
import { GetTurnoText } from 'src/app/pipes/turno-text.pipe';

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
  today = new Date();
  minDate: Date;
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

  // variáveis de controle das etapas do agendamento
  showStep1: boolean = true;
  showStep2: boolean = false;
  showStep3: boolean = false;
  showStep4: boolean = false;
  showFinish: boolean = false;

  selected: boolean = false; // o que está selecionado
  invitedFriends: boolean = false;
  funcionarios: Funcionario[]; // funcionários FCamra
  emails: string[] = []; // emails dos funcionários
  id: string; // id do user logado
  nome: string; // nome do user logado

  public innerWidth: any;

  dataFiltro: Filtro;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private storage: StorageService,
    private api: ApiService,
    public pipename: GetShortName,
    public turnopipe: GetTurnoText
  ) {}

  async ngOnInit() {
    this.minDate = new Date(this.today); // data de hoje
    this.minDate.setDate(this.minDate.getDate() + 1); // recupera a data de amanhã

    this.innerWidth = window.innerWidth; // largura da tela atual
    this.funcionarios = await this.obterFuncionarios(); // recupera lista de funcionários
    this.funcionarios.sort(this.compare); // ordena os funcionários
    const profile = await this.storage.get('profile'); // recupera perfil do user logado pelo local storage
    // parse de infos necessárias
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
  // obtém os funcionários através de uma requisição
  async obterFuncionarios() {
    return await this.api.getFuncionarios();
  }

  // navegação nas etapas de agendamento
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

    this.submitAgendamento();
    // caso tenha escolhido a opção de convidar, faz a requisição de convites a API
    if (invited) {
      await this.api.inviteFriends(
        this.emails.join(),
        this.pipename.transform(this.nome),
        this.form.value.data,
        this.turnopipe.transform(this.form.value.turno)
      );
    }
  }

  // vai pro path root da aplicação
  goHome() {
    this.router.navigate(['/']);
  }

  // seta a data selecionada no form
  async setDate(event: any) {
    let data = this.datepipe.transform(event, 'dd/MM/yyyy');
    this.form.controls['data'].setValue(data);
    this.form.controls['turno'].setValue(''); // se trocar a data, reseta o radio
    this.dataFiltro = await this.api.filtrarData(data, this.form.value.local);
  }
  
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // evita que sábado e domingo sejam selecionados
    return day !== 0 && day !== 6;
  };

  // seta escritório de SP como lugar de agendamento
  setSP() {
    this.form.controls['local'].setValue('SP');
    this.dataFiltro = undefined; // essa linha surte efeito quando um usuário "volta" pra essa etapa no agendamento. ela faz com que a etapa de seleção de turno seja resetada
    this.goForward();
  }

  // seta escritório de SP como lugar de agendamento
  setSantos() {
    this.form.controls['local'].setValue('Santos');
    this.dataFiltro = undefined; // essa linha surte efeito quando um usuário "volta" pra essa etapa no agendamento. ela faz com que a etapa de seleção de turno seja resetada
    this.goForward();
  }

  setTurno(turno: string) {
    this.form.controls['turno'].setValue(turno); // define o turno escolhido
  }

  async submitAgendamento() {
    // se for selecionados ambos, faz duas requisições separadas, uma pra manhã e outra pra tarde
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

  // manipula emails selecionados em um array
  addOrRemoveEmail(funcionario: Funcionario) {
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

  // remove um elemento qualquer de um array
  arrayRemove(arr: string[], value: string) {
    return arr.filter(function (r) {
      return r != value;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth; // recupera largura atual da janela
  }

  // função de callback, ordenação ascendente de nome
  compare(a: any, b: any) {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  }
}
