import axios from "axios";
// import jQuery from "jquery"

export class Helper {

  protected base_url: string
  constructor() {
    this.base_url = 'http://127.0.0.1:8000'
  }

  public list_array(uri: string) {
    let url: string = this.base_url + uri
    let response: any = []
    axios.get(url).then(res => {
      response = res.data
    })
    return response;
  }

  public add_array(array: any[], item: any, uri: string, reload:boolean = false): any[] {
    let item_base: any = {}
    for (const key in item) item_base[key] = item[key]
    let url = this.base_url + uri
    array.push(item_base)
    axios.post(url, item).then(res => {
      if (res.data.code == 422) {
        alert(res.data.msg)
      } else {
        alert('guardado con éxito')
        if(reload) window.location.reload()
      }
    })
    return array
  }

  public updated_array(array: any[], item: any, index: number, uri: string) {
    if(!array[index].id) {
      alert('Por ahora no podemos editar este registro, prueba recargando la pantalla e intenta de nuevo')
      return array
    }
    array[index] = item
    let url = this.base_url + uri + array[index].id
    axios.put(url, item).then(res => {
      alert('guardado con éxito')
    }).catch((errors) => {
      window.location.reload()
    })
    return array
  }

  public edit_array(item: any, index: number) {
    let item_base: any = {}
    for (const key in item) item_base[key] = item[key]
    return { item: item_base, aux: { index: index, is_edit: true } };
  }

  public remove_array(array: any[], index: number, uri: string): any[] {
    let url = this.base_url + '/' + uri
    axios.post(url).then(res => {
      array.splice(index, 1)
    })
    return array
  }

  public clear_form(item: any) {
    let item_base: any = {}
    for (const key in item) item_base[key] = null
    return { item: item_base, aux: { is_edit: false, index: -1 } }
  }

  public validacionFormulario(formulario: any = {}, noValidation: any = [], clave: string = '', errorMessage: any = {}) {
    let exito = true;
    let errors: any = {};
    for (const key in formulario) {
      if (!noValidation.includes(key)) {
        if (!formulario[key]) {
          errors[clave + key] = [];
          exito = false;
          if (Object.values(errorMessage).length == 0) {
            errors[clave + key].push("El campo " + key + " es obligatorio");
          } else {
            errors[clave + key].push("El campo " + errorMessage[key] + " es obligatorio");
          }
        }
      }
    }
    return { exito: exito, errors: errors };
  }
}
