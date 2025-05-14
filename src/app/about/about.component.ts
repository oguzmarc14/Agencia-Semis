import { Component } from '@angular/core';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-about',
  imports: [SafePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

testimonios = [
    {
      nombre: 'Carlos Ramírez',
      imagen: 'clientes/carlos.jpeg',
      texto: '“Me ayudaron a conseguir el carro que siempre quise, ¡rápido y sin complicaciones! 100% recomendados.”'
    },
    {
      nombre: 'Laura Méndez',
      imagen: 'clientes/laura.avif',
      texto: '“El trato fue excelente desde el primer momento. ¡Gracias por ayudarme a estrenar carro!”'
    },
    {
      nombre: 'Jesús Hernández',
      imagen: 'clientes/jesus.avif',
      texto: '“Variedad, buenos precios y un servicio increíble. Sin duda volveré para mi próxima compra.”'
    }
  ];
}
