import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oet-angular';
  menu: any[]

  constructor() {
    this.menu = [
      {
        uri: 'vehiculo',
        text: 'Vehículo'
      },
      {
        uri: 'informe',
        text: 'Informe'
      },
      {
        uri: 'propietario',
        text: 'Propietario'
      },
      {
        uri: 'conductor',
        text: 'Conductor'
      },
    ]
  }
}
