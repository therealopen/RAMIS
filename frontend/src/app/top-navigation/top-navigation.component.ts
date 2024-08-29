import { Component, OnInit } from '@angular/core';
import { Route, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
// @Component({
//   selector: 'a',
//   template: '<label>{{username}}</label>'
 
// })
export class TopNavigationComponent implements OnInit{
  userRole:any;
  statusRole:string='';
  email:string='';
  username:string='MayDay';
  constructor(private router: Router) {}

  ngOnInit(): void {
    let username=sessionStorage.getItem('email');
    let userRole=sessionStorage.getItem('statusRole');
    this.userRole=sessionStorage.getItem('statusRole');
    this.username=sessionStorage.getItem('email') as string;
    
      userRole=sessionStorage.getItem('statusRole');
      username=sessionStorage.getItem('email');
      
    }      //userRole=sessionStorage.getItem('statusRole');

   

  logout():void{
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    // Clear the message after 5 seconds
    setTimeout(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }, 100);

   

  }}

