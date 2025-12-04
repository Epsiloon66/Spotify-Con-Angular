import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{  
 
  mainMenu: {
    defaultOptions: Array<any>,
    accessLink: Array<any>,
  } = {defaultOptions: [], accessLink: []}
  customOptions: Array<any> = []

  constructor(){ }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/']
      },
        {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
        {
        name: 'Tu Biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites']
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear Lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones Que Te Gustan',
        icon: 'uil-heart-medical'
      }
    ]

    this.customOptions = [
      {
        name: 'Mi Lista º1',
        router: ['/']
      },
      {
        name: 'Mi Lista º2',
        router: ['/']
      },
      {
        name: 'Mi Lista º3',
        router: ['/']
      }
    ]
  }
}
