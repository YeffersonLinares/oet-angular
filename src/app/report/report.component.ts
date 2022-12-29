import { Component } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  vehicles:any[]

  constructor() {
    this.vehicles = []
    let url = 'http://127.0.0.1:8000/api/report-vehicles';
    axios.get(url).then(res => {
      this.vehicles = res.data
      console.log('this.vehicles ==> ', this.vehicles);

    })
  }
}
