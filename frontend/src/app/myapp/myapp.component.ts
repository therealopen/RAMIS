import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'rxjs';
import { NgModule } from '@angular/core';

;
@Component({
  selector: 'app-myapp',
  templateUrl: './myapp.component.html',
  styleUrls: ['./myapp.component.scss']
})
export class MyappComponent implements OnInit {
   userForm: FormGroup;
  id: any;
  sessionname: string = '';
  isInputDisabled=false;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private url: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      block: ['', Validators.required],
      floor: ['', Validators.required],
      room: ['', Validators.required],
      wing: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    console.log('pakawa: ' + this.id);
    //get data before update
    this.userService.getAllData(this.id).subscribe(response => {
      const usData = response.data;
      for (let i = 0; i < usData.length; i++) {
        const item = usData[i];
        if(item._id===this.id){
       var userData=response.data[i];
       //values display in a form
        this.userForm.patchValue({
          firstname: userData.firstname,
          middlename: userData.middlename,
          lastname: userData.lastname,
          email: userData.email,
          gender: userData.gender,
          block: userData.block,
          floor: userData.floor,
          room: userData.room,
          wing: userData.wing,
          phone: userData.phone,
          password: userData.password,
          role: userData.role
          });

      console.log(response.message);
  }}});
  }

  //submit data
  submitData() {
    const body = this.userForm.value;
    this.userService.postData(body).subscribe(
      response => {
        console.log(response);
        this.userForm.reset();
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }
//prepare updating data
  msg: string ='';
  updateData() {
    console.log('Update_ID: ' + this.id);
    const body = {
      firstname: this.userForm.value.firstname,
      middlename: this.userForm.value.middlename,
      lastname: this.userForm.value.lastname,
      email: this.userForm.value.email,
      gender: this.userForm.value.gender,
      block: this.userForm.value.block,
      floor: this.userForm.value.floor,
      room: this.userForm.value.room,
      wing: this.userForm.value.wing,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
    
    };
    //update data
    this.userService.updateData(body,this.id).subscribe(
      response => {
        console.log('Response:' + response);
       this.msg=response.message;
        //this.userForm.reset();
        if(response.status){
          this.msg=response.message;
          setTimeout(() => {
            this.msg = '';
          }, 5000);
        }
           else {
          this.msg = response.message; // Display error message
          }
        //this.router.navigateByUrl('view');
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }
  //logoutBtn
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}

