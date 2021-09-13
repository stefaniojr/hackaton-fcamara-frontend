import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

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

  showPassword: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
