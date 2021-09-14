import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
   const isAuthenticated = await this.auth.isAuthenticated();
    if (!isAuthenticated) {
      await this.router.navigate(['/login']); // redireciona para tela de login
    }

    return await this.auth.isAuthenticated(); // retorna se está autenticado ou não
  }
}