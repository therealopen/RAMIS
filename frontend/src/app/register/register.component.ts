import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  studentForm: FormGroup;
  regMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      block: [''],
      floor: [''],
      room: [''],
      wing: [''],
      phone: [''],
      password: ['', Validators.required],
    });
  }

  registerStudent() {
    console.log('homecomming' +this.studentForm.value);
    // if (this.studentForm.valid) {
      const bodyData = {
        "firstname":this.studentForm.value.firstname,
        "middlename":this.studentForm.value.middlename,
        "lastname":this.studentForm.value.lastname,
        "email":this.studentForm.value.email,
        "gender":this.studentForm.value.gender,
        "block":this.studentForm.value.block,
        "floor":this.studentForm.value.floor,
        "room":this.studentForm.value.room,
        "wing":this.studentForm.value.wing,
        "phone":this.studentForm.value.phone,
        "password":this.studentForm.value.lastname

      }
      console.log('this body: '+bodyData);

      this.http.post("http://localhost:8089/student/create", bodyData).subscribe((response: any) => {
        if (response.status) {
          this.regMessage = response.message;
        } else {
          this.regMessage = response.message;
        }

        // Clear the form after submission
        this.studentForm.reset();
      });
    }
  }
// }
