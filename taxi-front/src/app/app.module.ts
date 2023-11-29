import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./JwtInterceptor";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserComponent} from "./components/user/user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { OrderComponent } from './components/order/order.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarComponent } from './components/car/car.component';
import { RoadUserComponent } from './components/road-user/road-user.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AcceptOrderComponent, CarDialogComponent} from './components/accept-order/accept-order.component';
import {CommonModule} from "@angular/common";
import { FinishRideComponent } from './components/finish-ride/finish-ride.component';
import { RoadDriverComponent } from './components/road-driver/road-driver.component';
import { CreateBillComponent } from './components/create-bill/create-bill.component';
import { BillsComponent } from './components/bills/bills.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CreateRatingComponent } from './components/create-rating/create-rating.component';
import { AverageRatingComponent } from './components/average-rating/average-rating.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user',component:UserComponent},
  {path:'order', component: OrderComponent},
  {path:'cars',component:CarsComponent},
  {path:'car/create',component:CarComponent},
  {path:'car/:id',component:CarComponent},
  {path:'roaduser',component:RoadUserComponent},
  {path:'accept',component:AcceptOrderComponent},
  {path:'finish',component:FinishRideComponent},
  {path:'roaddriver',component:RoadDriverComponent},
  {path:'createbill/:id',component:CreateBillComponent},
  {path:'bills',component:BillsComponent},
  {path:'createrating/:id', component:CreateRatingComponent},
  {path:'averagerating',component:AverageRatingComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OrderComponent,
    CarsComponent,
    CarComponent,
    RoadUserComponent,
    AcceptOrderComponent,
    FinishRideComponent,
    RoadDriverComponent,
    CreateBillComponent,
    BillsComponent,
    CarDialogComponent,
    CreateRatingComponent,
    AverageRatingComponent
  ],
  imports: [
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule, MatMenuModule,
    CommonModule, MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
