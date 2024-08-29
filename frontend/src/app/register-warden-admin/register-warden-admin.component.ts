import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-warden-admin.component.html',
  styleUrls: ['./register-warden-admin.component.scss']
})
export class RegisterStudentComponent {
  wdForm: FormGroup;
  regMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.wdForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      phone: [''],
      password: [''],
      role: ['', Validators.required]
    });
  }

  wdStudent() {
    console.log('incoming' + this.wdForm.value.lastname);

    const bodyData = {
      "role": this.wdForm.value.role,
      "firstname": this.wdForm.value.firstname,
      "middlename": this.wdForm.value.middlename,
      "lastname": this.wdForm.value.lastname,
      "email": this.wdForm.value.email,
      "gender": this.wdForm.value.gender,
      "phone": this.wdForm.value.phone,
      "password": this.wdForm.value.lastname
    };

    console.log('this body: ' + bodyData.firstname);

    this.http.post("http://localhost:8089/users/create", bodyData).subscribe((response: any) => {
      if (response.status) {
        this.regMessage = response.message;
        console.log('incoming mayday');
      } else {
        this.regMessage = response.message;
        console.log('homeaway');
      }

      // Clear the form after submission
      // this.wdForm.reset();
    });
  }
}
