import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('email') !== null;
    if (!isLoggedIn) {
      this.router.navigate(['login']); // Redirect to login page if not logged in
    }
    return isLoggedIn;
  }    
  
  canActivateStudent(){
      const isStudent = sessionStorage.getItem('sessionStudent');
if(isStudent === "student"){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['home']);

    }
    
  }
    canActivateWarden(){    
      const isWarden = sessionStorage.getItem('sessionWarden');
    if(isWarden === "warden"){
      this.router.navigate(['view']);

    }else{
      this.router.navigate(['view']);
    }
   
      }
      
        

  }


