import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario1',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  template: `
    <div class="form-container">
  <h2>{{ citaIndex !== null ? 'Actualizar Cita' : 'Agenda la cita para el carro de tus sueños' }}</h2>

  <!-- Campo de nombre -->
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" [(ngModel)]="nombre" name="nombre" required />

  <!-- Campo de teléfono -->
  <label for="telefono">Teléfono:</label>
  <input type="text" id="telefono" [(ngModel)]="telefono" name="telefono" maxlength="10" required />

  <!-- Lista desplegable (opciones escritas a mano) -->
  <label for="modelo">Modelo de Auto:</label>
  <select id="modelo" [(ngModel)]="modelo" name="modelo" required>
    <option value="" disabled selected>Seleccione un modelo</option>
    <option [value]="modelos[0]">{{modelos[0]}}</option>
    <option [value]="modelos[1]">{{modelos[1]}}</option>
    <option [value]="modelos[2]">{{modelos[2]}}</option>
    <option [value]="modelos[3]">{{modelos[3]}}</option>
  </select>

  <!-- Checkbox -->
  <label>¿Desea recibir promoción?</label>
  <input type="checkbox" [(ngModel)]="promocion" name="promocion" />

  <!-- Radio buttons -->
  <label>Tipo de cita:</label>
  <input type="radio" [(ngModel)]="tipoCita" name="tipoCita" value="testDrive" required /> Test Drive
  <input type="radio" [(ngModel)]="tipoCita" name="tipoCita" value="cotizacion" required /> Cotización

  <!-- Campo de fecha -->
  <label for="fecha">Fecha de cita:</label>
  <input 
    type="date" 
    id="fecha" 
    [(ngModel)]="fecha" 
    name="fecha" 
    required 
    [min]="minDate" 
  />

  <!-- Botón de enviar -->
  <button  [disabled]="!formValido1" (click)="enviarFormulario()">{{ citaIndex !== null ? 'Actualizar Cita' : 'Enviar Cita' }}</button>
</div>

<!-- Resumen de los datos ingresados -->
<div class="form-summary">
  <h3>Resumen de Cita</h3>
  <p><strong>Nombre:</strong> {{ nombre }}</p>
  <p><strong>Teléfono:</strong> {{ telefono }}</p>
  <p><strong>Modelo de Auto:</strong> {{ modelo }}</p>
  <p><strong>Promoción:</strong> {{ promocion ? 'Sí' : 'No' }}</p>
  <p><strong>Tipo de Cita:</strong> {{ tipoCita === 'testDrive' ? 'Test Drive' : 'Cotización' }}</p>
  <p><strong>Fecha de Cita:</strong> {{ fecha }}</p>
</div>



  `,
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

input[type="text"],
input[type="date"],
select {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
}

input[type="checkbox"],
input[type="radio"] {
  margin-right: 0.4rem;
  margin-top: 0.6rem;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not([disabled]) {
  background-color: #1d4ed8;
}

button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.form-summary {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-summary h3 {
  text-align: center;
  color: #111827;
  margin-bottom: 1rem;
}

.form-summary p {
  margin: 0.5rem 0;
  color: #374151;
}
`
    
  ]
})

export class Formulario1Component {
  // Propiedades del formulario
  nombre: string = '';
  telefono: string = '';
  modelo: string = '';
  promocion: boolean = false;
  tipoCita: string = '';
  fecha: string = '';

  modelos: string[] = ['Mustang', 'Corolla', 'Model 3', 'Camaro'];


  constructor(private router: Router) {}

  // Fecha mínima
  minDate: string = new Date().toISOString().split("T")[0];

  // El índice de la cita a editar
  citaIndex: number | null = null;

  ngOnInit() {
    const citaParaEditar = localStorage.getItem('citaParaEditar');
    if (citaParaEditar) {
      const cita = JSON.parse(citaParaEditar);
      this.nombre = cita.nombre;
      this.telefono = cita.telefono;
      this.modelo = cita.modelo;
      this.promocion = cita.promocion;
      this.tipoCita = cita.tipoCita;
      this.fecha = cita.fecha;
      // Obtener el índice de la cita
      this.citaIndex = parseInt(localStorage.getItem('citaParaEditarIndex')!, 10);
      localStorage.removeItem('citaParaEditar'); // Limpiar después de cargar
    }
  }

  formValido() {
    return this.nombre.trim() !== '' &&
           this.telefono.trim() !== '' &&
           /^\d{1,10}$/.test(this.telefono) &&
           this.modelo !== '' &&
           this.tipoCita !== '' &&
           this.fecha !== '';
  }

  get formValido1(): boolean {
  return this.nombre.trim() !== '' &&
         /^\d{10}$/.test(this.telefono) &&
         this.modelo !== '' &&
         this.tipoCita !== '' &&
         this.fecha !== '' &&
         this.fecha >= this.minDate;
}


  

enviarFormulario() {
  // Validación de campos del formulario
  if (this.nombre.trim() === '') {
    Swal.fire('Error', 'El nombre no puede estar vacío.', 'error');
    return;
  }

  if (!/^\d+$/.test(this.telefono)) {
    Swal.fire('Error', 'El teléfono debe contener solo números.', 'error');
    return;
  }

  if (!/^\d{10}$/.test(this.telefono)) {
    Swal.fire('Error', 'El teléfono debe contener exactamente 10 dígitos numéricos.', 'error');
    return;
  }

  if (this.fecha < this.minDate) {
    Swal.fire('Error', 'No se puede seleccionar una fecha pasada.', 'error');
    return;
  }

  if (!this.formValido()) {
    Swal.fire('Error', 'Por favor, complete todos los campos del formulario.', 'error');
    return;
  }

  // Confirmación antes de guardar
  Swal.fire({
    title: this.citaIndex !== null ? '¿Deseas actualizar esta cita?' : '¿Deseas registrar esta cita?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      const nuevaCita = {
        nombre: this.nombre,
        telefono: this.telefono,
        modelo: this.modelo,
        promocion: this.promocion,
        tipoCita: this.tipoCita,
        fecha: this.fecha
      };

      let citasRegistradas = JSON.parse(localStorage.getItem('citasRegistradas') || '[]');

      if (this.citaIndex !== null) {
        citasRegistradas[this.citaIndex] = nuevaCita;
        localStorage.setItem('citasRegistradas', JSON.stringify(citasRegistradas));
        Swal.fire('Éxito', 'Cita actualizada correctamente.', 'success').then(() => {
          this.router.navigate(['/cita1']);
        });
      } else {
        citasRegistradas.push(nuevaCita);
        localStorage.setItem('citasRegistradas', JSON.stringify(citasRegistradas));
        Swal.fire('Éxito', 'Cita agregada correctamente.', 'success').then(() => {
          this.router.navigate(['/home']);
        });
      }
    }
  });
}

  
}
