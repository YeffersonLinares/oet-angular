import { Component } from '@angular/core';
import { Helper } from '../Helpers/Helper';
import axios from "axios";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent extends Helper {
  owner: any
  owners: any[]
  aux: any

  constructor() {
    super()
    this.owners = []
    this.owner = {
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

    let url = this.base_url + '/api/index-owner'
    axios.get(url).then(res => {
      this.owners = res.data
    })
  }

  add_owner() {
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
    let validator = this.validacionFormulario(this.owner, ['id'], '', error_messages);
    if (!validator.exito) {
      alert(Object.values(validator.errors)[0]);
      return;
    }

    if (this.aux.is_edit == true) this.owners = this.updated_array(this.owners, this.owner, this.aux.index, '/api/update-owner/')
    else this.owners = this.add_array(this.owners, this.owner, '/api/store-owner')

    let clear = this.clear_form(this.owner)
    this.owner = clear.item
    this.aux = clear.aux
  }

  edit_owner(item: any, index: number) {
    let edit = this.edit_array(item, index)
    this.owner = edit.item
    this.aux = edit.aux
  }
}
