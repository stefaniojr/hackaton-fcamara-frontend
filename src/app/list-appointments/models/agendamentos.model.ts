import { Agendamento } from 'src/app/appointment/models/agendamento.model';

export class Agendamentos {
  constructor(
    public status: boolean,
    public data: Agendamento,
    public message: string
  ) {}
}
