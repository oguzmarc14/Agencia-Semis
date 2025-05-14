import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule,CommonModule]
})
export class LoginComponent {
  usuario = '';
  clave = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

 iniciarSesion() {
  // Guardar usuario en localStorage (esto es sincrónico)
  localStorage.setItem('usuario', this.usuario);

  // Leer inmediatamente el valor para validarlo
  const usuarioGuardado = localStorage.getItem('usuario');

  if (usuarioGuardado === this.usuario) {
    const exito = this.authService.login(this.usuario, this.clave);
    if (exito) {
      Swal.fire({
        icon: 'success',
        title: 'Sesión iniciada',
        text: `Bienvenido, ${this.usuario}!`,
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['/home']);
      });
    } else {
      this.error = 'Usuario o clave incorrectos';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.error,
        confirmButtonColor: '#d33'
      });
    }
  } else {
    console.error("El usuario en localStorage no se actualizó correctamente.");
  }
}


}
