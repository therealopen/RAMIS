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
  role: string='';
  logmsg: string =''



  constructor(private router: Router, private http: HttpClient) {}

  //login function
  login() {
 
    //api link for authentication    
    this.http.post<any>("http://localhost:8089/student/login", { email: this.email,password: this.password,role: this.role}
    ).subscribe((resultData: any) => {
      sessionStorage.setItem('email', resultData.data=this.email);
      sessionStorage.setItem('password',resultData.data=this.password);
      sessionStorage.setItem('displayLoginMessage', resultData.message);
      //invalid message for login
      this.logmsg=resultData.message;
  
      //check is student or warden authentication
      if (resultData.message==="student") {
          //console.log(resultData.message);
          sessionStorage.setItem('sessionStudent',resultData.message);
         this.router.navigate(['home']);
      }
          else if (resultData.message === 'warden') {
            //console.log(resultData.message);
            sessionStorage.setItem('sessionWarden',resultData.message);
            this.router.navigate(['view']);
         
        }
    });

  }
}