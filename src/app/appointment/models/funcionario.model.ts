export class Funcionario {
    constructor(
     public id: string,
     public nome: string,
     public email: string,
     public senha: string,
     public admin: string,
     public selected: boolean = false
    ) {}
  }
  