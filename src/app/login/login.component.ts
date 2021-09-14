import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])]
})
export class LoginComponent implements OnInit {
  form: FormGroup; // define um formulário a ser usado para login.

  showPassword: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, private api: ApiService) { }

  async ngOnInit() {
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  changeInputType(){
    if(this.showPassword){
      this.showPassword = false;
    } else{
      this.showPassword = true;
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

    /**
   * Realiza login do usuário e redireciona para a rota path
   */
  public async onLogin() {
    if (this.form.valid) {
      //this.loading = true; // inicia carregamento
      try {
        const profile = await this.api.login(
          this.form.value.email,
          this.form.value.senha
        ); // faz requisição à api e recupera o token
        console.log(this.form.value);
        const formData: FormData = new FormData();
        // formData.append('email', this.form.value.email);
        // formData.append('senha', this.form.value.senha);
       
        //realiza o login do usuário
        //console.log(profile);
        await this.auth.login(profile); // salva o token
        this.router.navigate(["home"]); // redireciona para root path
        this.form.reset(); // reseta o form
      } catch (e) {
        console.log(e);
      }
      //this.loading = false; // finaliza carregamento
    }
  }

}
