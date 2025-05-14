import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';  // Importamos SweetAlert2

@Component({
  selector: 'app-home',
  imports: [MatCardModule,MatToolbar,MatTabsModule,MatExpansionModule,MatSlideToggle,RouterLink,
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   mensajeNotificaciones: string = 'Activar notificaciones';
   onToggleChange(event: MatSlideToggleChange): void {
    if (event.checked) {
      Swal.fire({
        icon: 'success',
        title: '¡Notificaciones activadas!',
        text: 'Las notificaciones para ofertas especiales han sido activadas.',
      });
       this.mensajeNotificaciones = 'Desactivar notificaciones';
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Notificaciones activadas!',
        text: 'Las notificaciones para ofertas especiales han sido desactivadas.',
      });
       this.mensajeNotificaciones = 'Activar notificaciones';
    }
  }
}
