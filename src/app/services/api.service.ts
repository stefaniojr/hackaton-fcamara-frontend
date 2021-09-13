import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { ClassConstructor } from "class-transformer";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  /**
   * URLS
   */
  public static LOGIN_URL = 'login/';

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
    if (typeof (model as any).toClass === "function") {
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
    if (typeof (model as any).toClass === "function") {
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
    const res = await this.http
      .put(this.buildURL(endpoint) + data.id, data)
      .toPromise();
    if (typeof (model as any).toClass === "function") {
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
      .delete(this.buildURL(endpoint) + data.id, data)
      .toPromise();
    if (typeof (model as any).toClass === "function") {
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
    let baseURL = "http://localhost/";
    return baseURL;
  }
}
