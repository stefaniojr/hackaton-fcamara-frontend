import { Component } from '@angular/core';

import { loadCldr} from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackaton-fcamara-front-end';
}

declare var require: any;

loadCldr(
require('cldr-data/supplemental/numberingSystems.json'),
require('cldr-data/main/pt/ca-gregorian.json'),
require('cldr-data/main/pt/numbers.json'),
require('cldr-data/main/pt/timeZoneNames.json'));