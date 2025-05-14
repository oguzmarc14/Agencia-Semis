import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario2',
  standalone: true,
  imports: [ReactiveFormsModule],
  styles: [`
  .form-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f8fafc;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .form-container h2 {
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-top: 1rem;
    font-weight: 600;
    color: #1f2937;
  }

 input,
  select {
    width: 100%;
    padding: 0.6rem;
    margin-top: 0.4rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background-color: #fff;
    font-size: 0.95rem;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
    transform: scale(1.2);
    vertical-align: middle;
  }

  label input[type="checkbox"] {
    display: inline-block;
    width: auto;
    margin-top: 1rem;
    font-weight: normal;
  }

  button {
    margin-top: 2rem;
    width: 100%;
    padding: 0.8rem;
    background-color: #3b82f6;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover:not(:disabled) {
    background-color: #2563eb;
  }

  button:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`],

  template: `
    <div class="form-container" [formGroup]="formulario">
      <h2>{{ isEditMode ? 'Editar Cita' : 'Agendar Cita de Servicios' }}</h2>

      <!-- Nombre -->
      <label>Nombre:</label>
      <input formControlName="nombre" type="text" />

      <!-- Correo -->
      <label>Correo electrónico:</label>
      <input formControlName="correo" type="email" />

      <!-- Teléfono -->
      <label>Teléfono:</label>
      <input formControlName="telefono" type="text" maxlength="10" />

      <!-- Servicio -->
      <label>Servicio de interés:</label>
      <select formControlName="modelo">
        <option value="">Seleccione un servicio</option>
        <option [value]="servicios[0]">{{ servicios[0] }}</option>
        <option [value]="servicios[1]">{{ servicios[1] }}</option>
        <option [value]="servicios[2]">{{ servicios[2] }}</option>
      </select>

      <!-- Lavado -->
      <label>
        <input type="checkbox" formControlName="lavado" />
        ¿Interesado en lavado?
      </label>

      <!-- Fecha -->
      <label>Fecha de la cita:</label>
      <input type="date" formControlName="fecha" [min]="minDate" />

      <!-- Botón -->
      <button (click)="enviar()" [disabled]="botonDeshabilitado">
        {{ isEditMode ? 'Editar' : 'Enviar' }}
      </button>
    </div>
  `,
})
export class Formulario2Component implements OnInit {
  formulario: FormGroup;
  minDate: string;
  botonDeshabilitado = true;
  isEditMode = false;

  // 👉 Arreglo de servicios
  servicios = ['Afinacion', 'Cambio de aceite', 'Alineacion'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.minDate = new Date().toISOString().split('T')[0];

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      modelo: ['', Validators.required],
      lavado: [false],
      fecha: ['', Validators.required],
    });

    this.formulario.valueChanges.subscribe(() => {
      this.botonDeshabilitado = !this.formulario.valid;
    });
  }

  ngOnInit() {
    const citaEdit = localStorage.getItem('citaParaEditar2');
    if (citaEdit) {
      this.isEditMode = true;
      const cita = JSON.parse(citaEdit);
      this.formulario.patchValue({
        nombre: cita.nombre,
        correo: cita.correo,
        telefono: cita.telefono,
        modelo: cita.modelo,
        lavado: cita.lavado,
        fecha: cita.fecha
      });
      localStorage.removeItem('citaParaEditar2');
    }
  }

  enviar() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  const nuevaCita = this.formulario.value;

  // Validar que la fecha no sea pasada
  const fechaSeleccionada = new Date(nuevaCita.fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Eliminar la hora para comparar solo fechas

  if (fechaSeleccionada < hoy) {
    Swal.fire({
      title: 'Fecha inválida',
      text: 'No puedes seleccionar una fecha pasada para la cita.',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  const citasGuardadas = JSON.parse(localStorage.getItem('citasRegistradas2') || '[]');

  if (this.isEditMode) {
    const index = parseInt(localStorage.getItem('citaParaEditarIndex2')!, 10);
    citasGuardadas[index] = nuevaCita;
    Swal.fire({
      title: '¡Éxito!',
      text: 'Cita actualizada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  } else {
    citasGuardadas.push(nuevaCita);
    Swal.fire({
      title: '¡Éxito!',
      text: 'Cita enviada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  localStorage.setItem('citasRegistradas2', JSON.stringify(citasGuardadas));
  this.formulario.reset();
  const redireccion = this.isEditMode ? '/cita2' : '/home';
  this.isEditMode = false;
  this.router.navigate([redireccion]);
}


}
