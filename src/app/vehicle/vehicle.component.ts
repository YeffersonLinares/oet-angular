import { Component } from '@angular/core';
import { Helper } from '../Helpers/Helper';
import axios from "axios";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent extends Helper {
  vehicle: any
  vehicles: any[]
  owners: any[]
  drivers: any[]
  type_vehicles: any[]
  aux: any

  constructor() {
    super()
    this.vehicles = []
    this.owners = []
    this.drivers = []
    this.type_vehicles = []
    this.vehicle = {
      id: null,
      plate: null,
      color: null,
      brand: null,
      owner_id: "",
      driver_id: "",
      type_vehicle_id: ""
    }
    this.aux = { index: -1, is_edit: false }

    let url = this.base_url + '/api/index-vehicle'
    axios.get(url).then(res => {
      this.vehicles = res.data
    })

    url = this.base_url + '/api/params-vehicles'
    axios.get(url).then(res => {
      this.owners = res.data.owners
      this.drivers = res.data.drivers
      this.type_vehicles = res.data.type_vehicles
    })
  }

  add_vehicle() {
    let error_messages: any = {
      id: 'id',
      plate: 'Placa',
      color: 'Color',
      brand: 'Marca',
      owner_id: "Propietario",
      driver_id: "Conductor",
      type_vehicle_id: "Tipo de vehiculo"
    }
    let validator = this.validacionFormulario(this.vehicle, ['id'], '', error_messages);
    if (!validator.exito) {
      alert(Object.values(validator.errors)[0]);
      return;
    }

    if (this.validacionFormulario(this.vehicle))
      if (this.aux.is_edit == true) this.vehicles = this.updated_array(this.vehicles, this.vehicle, this.aux.index, '/api/update-vehicle/')
      else this.vehicles = this.add_array(this.vehicles, this.vehicle, '/api/store-vehicle', true)

    let clear = this.clear_form(this.vehicle)
    this.vehicle = clear.item
    this.aux = clear.aux
  }

  edit_vehicle(item: any, index: number) {
    let edit = this.edit_array(item, index)
    this.vehicle = edit.item
    this.aux = edit.aux
  }
}
