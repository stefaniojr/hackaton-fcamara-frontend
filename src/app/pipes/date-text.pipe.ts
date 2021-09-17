import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateText',
})
export class GetDateText implements PipeTransform {

  month: string;

  transform(value: string): string {
    var parts = value.split('/'); // quebra a data em partes
    var month = parts[1];
    // escolhe o mês textual
    if (month==='01'){
        this.month = "Janeiro ";
    }

    else if (month==='02'){
        this.month = "Fevereiro ";
    }

    else if (month==='03'){
        this.month = "Março ";
    }

    else if (month==='04'){
        this.month = "Abril ";
    }

    else if (month==='05'){
        this.month = "Maio ";
    }

    else if (month==='06'){
        this.month = "Junho ";
    }

    else if (month==='07'){
        this.month = "Julho ";
    }

    else if (month==='08'){
        this.month = "Agosto ";
    }

    else if (month==='09'){
        this.month = "Setembro ";
    }

    else if (month==='10'){
        this.month = "Outubro ";
    }

    else if (month==='11'){
        this.month = "Novembro ";
    }

    else if (month==='12'){
        this.month = "Dezembro ";
    }
    
    return parts[0] + " de " + this.month + parts[2]; // retornar as partes desejada
  }
}
