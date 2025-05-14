import { Component } from '@angular/core';
import { Carro } from '../carro';
import { CarroService } from '../shared/carro.service';
import { RouterModule } from '@angular/router';
import { UncarroComponent } from '../uncarro/uncarro.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carros',
  imports: [RouterModule,UncarroComponent,CommonModule],
  templateUrl: './carros.component.html',
  styleUrl: './carros.component.css'
})
export class CarrosComponent {

  misCarros:Carro[]=[];

  mensajeRecibido:string='';

  testimonios = [
    {
      cliente: 'Carlos Vicente',
      comentario1: '“El carro que vi en SEMIAUTOS es exactamente lo que buscaba. Es moderno, elegante, y me enamoré de él desde el primer momento.”',
      comentario2: '"Un auto impresionante que cambió por completo mi experiencia de conducción. ¡Gracias, SEMIAUTOS!"',
      imagenCliente: 'clientes/carlos.jpeg',
      imagenAuto: 'img/carrusel1.jpg',
      altCliente: 'Carlos Ramírez',
      altAuto: 'Auto visto por Carlos'
    },
    {
      cliente: 'Marco Olivares',
      comentario1: '“Vi un SUV en SEMIAUTOS que cumplía con todos mis requisitos. La calidad es excelente y el precio es justo. ¡Una gran decisión!”',
      comentario2: '"Lo recomiendo al 100%. ¡Gracias por ayudarme a encontrar el vehículo ideal!"',
      imagenCliente: 'clientes/laura.avif',
      imagenAuto: 'img/carrusel3.jpg',
      altCliente: 'Laura Méndez',
      altAuto: 'Auto visto por Laura'
    },
    {
      cliente: 'Fernando Navarro',
      comentario1: '“Desde que vi este auto, supe que tenía que ser mío. SEMIAUTOS tiene una increíble selección de autos y el proceso fue super rápido.”',
      comentario2: '"Estoy completamente satisfecho con mi compra. ¡Gracias por brindarme el mejor servicio!”',
      imagenCliente: 'clientes/jesus.avif',
      imagenAuto: 'img/carrusel4.jpeg',
      altCliente: 'Jesús Hernández',
      altAuto: 'Auto visto por Jesús'
    }
  ];

  constructor(public miservicio:CarroService){
    console.log("carro servicio");
  }
  ngOnInit():void{
    console.log("ngoninit carros");
    this.misCarros=this.miservicio.getCarros();
    console.log(this.misCarros);

  }

  recibirMensaje(mensaje: string) {
    console.log("Mensaje recibido del hijo:", mensaje); // ← imprime 'hola'
    this.mensajeRecibido=mensaje;
  }
  
}
