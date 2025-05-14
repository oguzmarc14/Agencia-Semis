import { Component } from '@angular/core';

@Component({
  selector: 'app-integrantes',
  imports: [],
  templateUrl: './integrantes.component.html',
  styleUrl: './integrantes.component.css'
})
export class IntegrantesComponent {

  estudiantes = [
  {
    nombre: 'Marco Antonio Olivares Guzman',
    carrera: 'Ingeniería en Sistemas',
    id: '29',
    imagen: 'integrantes/chona.jpg',
    desc: 'Apasionado por la tecnología, siempre buscando soluciones innovadoras y trabajando incansablemente para lograr sus objetivos. Con un enfoque práctico y analítico, Marco es un estudiante ejemplar que busca siempre mejorar.'
  },
  {
    nombre: 'Carlos Vicente Muñoz',
    carrera: 'Ingeniería en Sistemas',
    id: '351804',
    imagen: 'integrantes/chente.jpg',
    desc: 'Carlos es un joven con una gran visión del futuro, apasionado por las computadoras y su funcionamiento interno. Su dedicación y creatividad lo convierten en un gran colaborador, siempre dispuesto a ayudar y aprender.'
  },
  {
    nombre: 'Luis Fernando Navarro Lozano',
    carrera: 'Ingeniería en Sistemas',
    id: '242405',
    imagen: 'integrantes/fer.jpg',
    desc: 'Luis es un estudiante curioso, con una mente ágil y siempre dispuesto a explorar nuevas ideas. Su enfoque en la ingeniería y su habilidad para resolver problemas complejos lo convierten en un verdadero líder en su campo.'
  }
];


}
