import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ViewComponent } from './view/view.component';
import { MyappComponent } from './myapp/myapp.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RegisterComponent } from './register/register.component';
import { RegisterStudentComponent } from './register-warden-admin/register-warden-admin.component';



const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'list-student', component: ViewComponent, canActivate: [AuthGuard] },
  { path: 'view/myapp/:id', component: ViewComponent, canActivate: [AuthGuard] },

  { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'top', component: TopNavigationComponent, canActivate: [AuthGuard] },

  { path: 'admin-details', component: AdminViewComponent, canActivate: [AuthGuard] },

  { path: 'edit-student-room/:id', component: MyappComponent, canActivate: [AuthGuard]},

  { path: 'main', component: AdminDashboardComponent, canActivate: [AuthGuard]},

  { path: 'register-student', component: RegisterComponent },
  { path: 'select-user-role', component: RegisterStudentComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }