import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// AuthService
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios = [
    { usuario: 'carlos', clave: '1234' },
    { usuario: 'marco', clave: '5678' },
    { usuario: 'fer', clave: 'aaaa' }
  ];

  private usuarioActual = new BehaviorSubject<string | null>(null);

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  usuarioActual$ = this.usuarioActual.asObservable(); // Para observar el usuario actual

  login(usuario: string, clave: string): boolean {
    const userValido = this.usuarios.find(u => u.usuario === usuario && u.clave === clave);
    this.loggedIn.next(!!userValido);
    if (userValido) {
      this.usuarioActual.next(usuario); // Guarda el nombre del usuario
      localStorage.setItem('usuario', usuario); // Guarda el usuario en el localStorage
    }
    return !!userValido;
  }

  logout() {
    this.loggedIn.next(false);
    this.usuarioActual.next(null); // Limpiar el usuario actual al cerrar sesión
    localStorage.removeItem('usuario'); // Eliminar el usuario del localStorage
  }

  getUsuarioActual(): string | null {
    return this.usuarioActual.value;
  }
}
