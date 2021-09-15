export class Filtro {
  constructor(
    public Data: string,
    public Estacao: string,
    public Agendados_Manha: number,
    public Capacidade_Usada_Manha: number,
    public Agendados_Tarde: number,
    public Capacidade_Usada_Tarde: number,
    public Capacidade_Ambos: number
  ) {}
}
