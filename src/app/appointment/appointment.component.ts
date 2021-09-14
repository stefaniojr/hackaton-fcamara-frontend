import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      id_funcionario: [''],
      data: [''],
      turno: [''],
      local: [''],
    });
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

  setDate(event: any) {
    let data =this.datepipe.transform(event, 'dd/MM/yyyy');
    this.form.controls['data'].setValue(data);
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  setSP() {
    this.form.controls['local'].setValue('SP');
    this.goForward();
  }

  setSantos() {
    this.form.controls['local'].setValue('Santos');
    this.goForward();
  }

  setTurno(turno: string) {
    this.form.controls['turno'].setValue(turno);
  }
}
