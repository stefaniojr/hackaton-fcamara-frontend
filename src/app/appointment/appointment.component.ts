import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

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
})
export class AppointmentComponent implements OnInit {

  
  showStep1: boolean = true;
  showStep2: boolean = false;
  showStep3: boolean = false;
  showStep4: boolean = false;
  showFinish: boolean = false;
  selected: boolean = false;
  invitedFriends: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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

  onSelectCard() {
    this.selected = !this.selected;
  }

  finishAppointment(invited: boolean) {
    this.showStep1 = false;
    this.showStep2 = false;
    this.showStep3 = false;
    this.showStep4 = false;
    this.showFinish = true;
    this.invitedFriends = invited;
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
