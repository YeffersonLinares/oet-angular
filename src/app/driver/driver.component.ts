import { Component } from '@angular/core';
import { Helper } from '../Helpers/Helper';
import axios from "axios";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent extends Helper {
  driver: any
  drivers: any[]
  aux: any

  constructor() {
    super()
    this.drivers = []
    this.driver = {
      id: null,
      document: null,
      first_name: null,
      second_name: null,
      last_name: null,
      address: null,
      phone: null,
      city: null
    }
    this.aux = { index: -1, is_edit: false }

    let url = this.base_url + '/api/index-driver'
    axios.get(url).then(res => {
      this.drivers = res.data
    })
  }

  add_driver() {
    let error_messages:any = {
      id: 'id',
      document: 'Cédula',
      first_name: 'Primer nombre',
      second_name: 'Segundo nombre',
      last_name: 'Apellidos',
      address: 'Dirección',
      phone: 'Teléfono',
      city: 'Ciudad'
    }
    let validator = this.validacionFormulario(this.driver, ['id'], '', error_messages);
    if (!validator.exito) {
      alert(Object.values(validator.errors)[0]);
      return;
    }

    if (this.aux.is_edit == true) this.drivers = this.updated_array(this.drivers, this.driver, this.aux.index, '/api/update-driver/')
    else this.drivers = this.add_array(this.drivers, this.driver, '/api/store-driver')

    let clear = this.clear_form(this.driver)
    this.driver = clear.item
    this.aux = clear.aux
  }

  edit_driver(item: any, index: number) {
    let edit = this.edit_array(item, index)
    this.driver = edit.item
    this.aux = edit.aux
  }
}
