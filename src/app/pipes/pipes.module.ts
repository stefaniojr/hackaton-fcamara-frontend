
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFirstName } from './first-name.pipe';
import { GetDateText } from './date-text.pipe';
import { GetTurnoText } from './turno-text.pipe';
import { GetSPText } from './sp-text.pipe';
import { GetShortName } from './short-name.pipe';

@NgModule({
    declarations: [GetFirstName, GetDateText, GetTurnoText, GetSPText, GetShortName],
    imports: [CommonModule],
    exports: [GetFirstName, GetDateText, GetTurnoText, GetSPText, GetShortName],
})
export class PipesModule {}
