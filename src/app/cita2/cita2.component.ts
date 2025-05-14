import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cita2.component.html'
})
export class Cita2Component implements OnInit {
  citas: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const citasGuardadas = localStorage.getItem('citasRegistradas2');
    this.citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
  }

  borrarCita(index: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la cita permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.citas.splice(index, 1);
      localStorage.setItem('citasRegistradas2', JSON.stringify(this.citas));
      Swal.fire({
        title: '¡Eliminado!',
        text: 'La cita ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}


  editarCita(index: number): void {
    const cita = this.citas[index];

    localStorage.setItem('citaParaEditar2', JSON.stringify(cita));
    localStorage.setItem('citaParaEditarIndex2', index.toString());

    this.router.navigate(['/formulario2']);
  }
}
