import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(1000, style({ opacity: 0 }))]),
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  name: string = undefined;

  public innerWidth: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    this.innerWidth = window.innerWidth;
    const profile = await this.storage.get('profile'); // recupera perfil do user logado do local storage
    this.name = JSON.parse(profile).nome; // recupera nome
  }

  goAppointment() {
    this.router.navigate(['/appointment']); // vai pra tela de iniciar agendamento
  }

  goListAppointments() {
    this.router.navigate(['/list']); // vai pra tela de listar agendamentos
  }

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth; // recupera largura atual da tela
  }
}
