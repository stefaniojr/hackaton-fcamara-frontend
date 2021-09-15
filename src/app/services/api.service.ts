import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import { Profile } from './../login/models/profile.model';
import { Agendamentos } from 'src/app/list-appointments/models/agendamentos.model';
import { Agendamento } from 'src/app/appointment/models/agendamento.model';
import { Filtro } from 'src/app/appointment/models/filtro.model';
import { Funcionario } from '../appointment/models/funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  /**
   * URLS
   */
  public static LOGIN_URL = 'login/';
  public static AGENDAMENTOS_URL = 'agendamentos/';
  public static AGENDAR_URL = 'agendamentos/novo/';
  public static DELETAR_URL = 'agendamentos/delete/';
  public static FILTRAR_URL = 'Calendario/Filtro/';
  public static FUNCIONARIOS_URL = 'funcionarios/';
  public static EMAIL_URL = 'Email/';

  /**
   * Realiza uma requisição do tipo POST
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makePost<T>(
    endpoint: string,
    data: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http.post(this.buildURL(endpoint), data).toPromise();
    if (typeof (model as any).toClass === 'function') {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Realiza uma requisição do tipo GET
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makeGet<T>(
    endpoint: string,
    params: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http
      .get(this.buildURL(endpoint), { params })
      .toPromise();
    if (typeof (model as any).toClass === 'function') {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Realiza uma requisição do tipo PUT
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makePut<T>(
    endpoint: string,
    data: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http.put(this.buildURL(endpoint), data).toPromise();
    if (typeof (model as any).toClass === 'function') {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Realiza uma requisição do tipo DELETE
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makeDelete<T>(
    endpoint: string,
    data: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http
      .delete(this.buildURL(endpoint) + data, data)
      .toPromise();
    if (typeof (model as any).toClass === 'function') {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Retorna a URL baseado no endpoint especificado
   * @param endpoint endpoint a ser chamado
   */
  protected buildURL(endpoint: string): string {
    const url = this.getBaseURL() + endpoint;
    return url;
  }

  /**
   * Retorna a URL Base da API
   * Concatena a URL base da configuração
   */
  protected getBaseURL(): string {
    //let baseURL = 'http://localhost/fcamara/api/';
    let baseURL = 'https://fcalendar.anagabatteli.com/api/';
    return baseURL;
  }

  /**
   * Método para realizar login
   * @param email do usuário
   * @param password senha
   */
  public async login(email: string, password: string): Promise<any> {
    var form_data = new FormData();
    form_data.append('email', email);
    form_data.append('senha', password);
    return await this.makePost(ApiService.LOGIN_URL, form_data, Profile);
  }

  /**
   * Recupera as os agendamentos do usuário
   */
  public async getAgendamentos(id: string): Promise<Agendamentos> {
    var form_data = new FormData();
    form_data.append('id_funcionario', id);
    return await this.makePost(
      ApiService.AGENDAMENTOS_URL,
      form_data,
      Agendamentos
    );
  }

  /**
   * Método para agendar
   * @param id do funcionário
   * @param data
   * @param turno
   * @param local
   */
  public async agendar(
    id_funcionario: string,
    data: string,
    turno: string,
    local: string
  ): Promise<any> {
    var form_data = new FormData();
    form_data.append('id_funcionario', id_funcionario);
    form_data.append('data', data);
    form_data.append('turno', turno);
    form_data.append('local', local);
    return await this.makePost(ApiService.AGENDAR_URL, form_data, Agendamento);
  }

  /**
   * Método para deletar um agendamento
   * @param id do agendamento
   */
  public async deleteAgendamento(id: string): Promise<any> {
    var form_data = new FormData();
    form_data.append('id', id);
    return await this.makePost(ApiService.DELETAR_URL, form_data, FormData);
  }

  /**
   * Método para recuperar lotação de um dia
   * @param data de consulta
   * @param estação de trabalho
   */
  public async filtrarData(data: string, estacao: string): Promise<any> {
    var form_data = new FormData();
    form_data.append('data', data);
    form_data.append('estacao', estacao);
    return await this.makePost(ApiService.FILTRAR_URL, form_data, Filtro);
  }

  /**
   * Método para recuperar os funcionários da FCamara
   */
  public async getFuncionarios(): Promise<Funcionario[]> {
    return await this.makeGet(ApiService.FUNCIONARIOS_URL, {}, Funcionario);
  }

  /**
   * Método para recuperar os funcionários da FCamara
   */
   public async inviteFriends(emails: string, funcionario: string, data: string, turno: string): Promise<any> {
    var form_data = new FormData();
    form_data.append('emails', emails);
    form_data.append('funcionario', funcionario);
    form_data.append('data', data);
    form_data.append('turno', turno);
    return await this.makePost(ApiService.EMAIL_URL, form_data, FormData);
  }
}
