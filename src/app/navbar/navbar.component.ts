// NavbarComponent
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  estaLogueado = false;
  usuario: string | null = ''; // El usuario actual

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Suscripción al estado de login
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
    });

    // Suscripción al usuario actual
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  buscarUnCarro(nombre: string) {
    this.router.navigate(['/buscador', nombre]);
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
