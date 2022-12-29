import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { OwnerComponent } from './owner/owner.component';
import { DriverComponent } from './driver/driver.component';

const routes: Routes = [
  { path: 'informe', component: ReportComponent },
  { path: 'vehiculo', component: VehicleComponent },
  { path: 'propietario', component: OwnerComponent },
  { path: 'conductor', component: DriverComponent },
  { path: '**', redirectTo:'informe', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    VehicleComponent,
    OwnerComponent,
    DriverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
