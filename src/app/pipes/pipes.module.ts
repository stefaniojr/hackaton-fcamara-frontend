
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFirstName } from './first-name.pipe';

@NgModule({
    declarations: [GetFirstName],
    imports: [CommonModule],
    exports: [GetFirstName],
})
export class PipesModule {}
