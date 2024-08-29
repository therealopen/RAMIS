import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  logmsg: string =''
  admin_role:string ='admin';
  student_role:string ='student';
  warden_role:string ='warden';

  constructor(private router: Router, private http: HttpClient) {}

  //login function
  login() {
   
 
    //api link for authentication    
    this.http.post<any>("http://localhost:8089/student/login", { email: this.email,password: this.password}
    ).subscribe((resultData: any) => {
      // sessionStorage.setItem('email', resultData.data=this.email);
      sessionStorage.setItem('password',resultData.data=this.password);
      sessionStorage.setItem('displayLoginMessage', resultData.message);
      //invalid message for login
      this.logmsg=resultData.message;
      //console.log(resultData.status+' '+resultData.message);
      //check is student authentication
      if (resultData.status='true' &&resultData.message===this.student_role) {
          console.log(resultData.message);
          sessionStorage.setItem('email', resultData.data=this.email);
          sessionStorage.setItem('statusRole',resultData.message);
          this.router.navigateByUrl('home');
          this.logmsg=resultData.message;

      }
        
    });


    //admin
     //api link for authentication    
     this.http.post<any>("http://localhost:8089/users/login", { email: this.email,password: this.password}
     ).subscribe((resultData: any) => {
       
       //invalid message for login
       this.logmsg=resultData.message;
       //console.log(resultData.status+' '+resultData.message);

       //check warden authentication
       if (resultData.status="true" && resultData.message === this.warden_role) {
             console.log(resultData.message);
             sessionStorage.setItem('email', resultData.data=this.email);
             sessionStorage.setItem('statusRole',resultData.message);
             this.router.navigateByUrl('admin-details');
             this.logmsg=resultData.message;

          
         }else if (resultData.status="true" && resultData.message === this.admin_role) {
          console.log(resultData.message);
          sessionStorage.setItem('email', resultData.data=this.email);
          sessionStorage.setItem('statusRole',resultData.message);
          this.router.navigateByUrl('admin-details');
          // console.log('iaADmin: '+resultData.message);
          this.logmsg=resultData.message;

      
     }});
  }
}

