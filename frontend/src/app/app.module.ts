import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { MyappComponent } from './myapp/myapp.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RegisterStudentComponent } from './register-warden-admin/register-warden-admin.component';
import { RegisterComponent } from './register/register.component';;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ViewComponent,
    MyappComponent,
    TopNavigationComponent,
    AdminDashboardComponent,
    LogoutComponent,
    AdminViewComponent,
    RegisterStudentComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
