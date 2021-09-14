import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

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
  onOnBoarding = true;
  onBoarding1 = true;
  onBoarding2 = false;
  onBoarding3 = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goAppointment() {
    this.router.navigate(['/appointment']);
  }

  goListAppointments() {
    this.router.navigate(['/list']);
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
  }
}
