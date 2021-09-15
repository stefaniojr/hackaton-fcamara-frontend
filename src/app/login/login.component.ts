import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {
  onOnBoarding = false;
  onBoarding1 = true;
  onBoarding2 = false;
  onBoarding3 = false;
  form: FormGroup; // define um formulário a ser usado para login.

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService
  ) {}

  async ngOnInit() {
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  changeInputType() {
    if (this.showPassword) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  /**
   * Realiza login do usuário e redireciona para a rota path
   */
  public async onLogin() {
    if (this.form.valid) {
      try {
        const profile = await this.api.login(
          this.form.value.email,
          this.form.value.senha
        ); // faz requisição à api e recupera o token
        await this.auth.login(profile); // salva o token
        this.form.reset(); // reseta o form
        this.onOnBoarding = profile.primeiro_acesso;
        if (!this.onOnBoarding) {
          this.router.navigate(['/']); // redireciona para root path
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  goOnBoarding1() {
    this.onBoarding1 = true;
    this.onBoarding2 = false;
    this.onBoarding3 = false;
  }

  goOnBoarding2() {
    this.onBoarding1 = false;
    this.onBoarding2 = true;
    this.onBoarding3 = false;
  }

  goOnBoarding3() {
    this.onBoarding1 = false;
    this.onBoarding2 = false;
    this.onBoarding3 = true;
  }

  dismissOnBoarding() {
    this.onOnBoarding = false;
    this.onBoarding1 = false;
    this.onBoarding2 = false;
    this.onBoarding3 = false;
    this.router.navigate(['/']);
  }
}
