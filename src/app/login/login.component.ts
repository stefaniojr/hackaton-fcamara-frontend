import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeInputType(){
    if(this.showPassword){
      this.showPassword = false;
    } else{
      this.showPassword = true;
    }
  }

}
