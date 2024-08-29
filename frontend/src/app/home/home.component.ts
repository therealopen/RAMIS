import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

interface Student {
  _id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  gender: string;
  block: string;
  floor: string;
  room: string;
  wing: string;
  phone: string;
  password: string;
  role: string;
  __v: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: Student | null = null;
  students: Student[] = [];
  id: string = '';
  firstname: string = '';
  middlename: string = '';
  lastname: string = '';
  email: string = '';
  gender: string = '';
  block: string = '';
  floor: string = '';
  room: string = '';
  wing: string = '';
  phone: string = '';
  password: string = '';
  loginData: any;
  successfulLoginMessage = '';

  successMessage:string='';
  updateForm:FormGroup;
  
  cpassword:string='';
  npassword:string='';
  opassword:string=''
  adminData: any;

  constructor(private http: HttpClient, private router: Router,private userService: UsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private url: ActivatedRoute
  ){
    this.updateForm = this.fb.group({
      npassword: ['', Validators.required],
      opassword: ['', Validators.required],
      cpassword: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    const email = sessionStorage.getItem('email');
    this.id = this.url.snapshot.params['id'];
    this.email = this.url.snapshot.params['email'];

    console.log('ID update'+ this.id);
    if (email) {
      this.getUserData(email);
      this.getAdminData(email);
    }
    this.email = sessionStorage.getItem('email') || '';
    this.password = sessionStorage.getItem('password') || '';

     // Check if successful login message should be displayed
     const displayLoginMessage = sessionStorage.getItem('displayLoginMessage');
     if (displayLoginMessage) {
       this.successfulLoginMessage = 'logged in success!';
      sessionStorage.removeItem('displayLoginMessage');
      console.log(this.successfulLoginMessage);
       //Clear the message after 5 seconds
       setTimeout(() => {
         this.successfulLoginMessage = '';
       }, 5000);
     }
     //changed success message should display here
     const updateMessage = sessionStorage.getItem('updateMessage');
     if (updateMessage) {
       this.successMessage = 'Password Changed Successful';
      sessionStorage.removeItem('updateMessage');
      console.log(this.successMessage);
       //Clear the message after 5 seconds
       setTimeout(() => {
         this.successMessage = '';
       }, 3000);
     }

  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  getAllStudent(): void {
    this.http.get('http://localhost:8089/api/student').subscribe(
      (resultData: any) => {
        //console.log('getAllStudent Method:',resultData);
        this.students = resultData.data;
      },
      (error) => {
        //console.error('Error fetching student data:', error);
      }
    );
  }

//admin details
getAdminData(email: string): void {
  this.http.get<any>(`http://localhost:8089/api/users?email=${email}`).subscribe(
    (responseData: any) => {
      ///console.log('message getUserData Method:',resultData);
      const matchingStudents = responseData.data;
      // if (matchingStudents.length > 0) {
      //   this.userData = matchingStudents[0];
      // }
      const sessionEmail = sessionStorage.getItem('email');
      //console.log('Displayed session:',sessionEmail);
      if (sessionEmail && matchingStudents) {
        const adminData = matchingStudents.find((student: any) => student.email === sessionEmail);
        //console.log('check sessionEmail:',userData);
        if (adminData) {
          this.adminData = adminData;
          //console.log('display userData:',userData);
        }
      }
    },
    (error) => {
      console.error('Error fetching user data:', error);
    }
  );
}

//users data
  getUserData(email: string): void {
    this.http.get<any>(`http://localhost:8089/api/student?email=${email}`).subscribe(
      (resultData: any) => {
        ///console.log('message getUserData Method:',resultData);
        const matchingStudents = resultData.data;
        // if (matchingStudents.length > 0) {
        //   this.userData = matchingStudents[0];
        // }
        const sessionEmail = sessionStorage.getItem('email');
        //console.log('Displayed session:',sessionEmail);
        if (sessionEmail && matchingStudents) {
          const userData = matchingStudents.find((student: any) => student.email === sessionEmail);
          //console.log('check sessionEmail:',userData);
          if (userData) {
            this.userData = userData;
            //console.log('display userData:',userData);
          }
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  printPage() {
    const printContent = document.getElementById('print-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.print();
      }
    }
  }
//session roles
studentRole=sessionStorage.getItem('sessionStudent');
wardenRole=sessionStorage.getItem('sessionWarden');
msg:string='';
//update password


updateData(){
    this.opassword = this.updateForm.value;
    this.npassword = this.updateForm.value;
    this.cpassword = this.updateForm.value;
    console.log('show this  '+this.cpassword);


  const body ={
    password: this.updateForm.value.cpassword,
    
  }
  console.log('myddddddddd body '+body);
// const npd=this.updateForm.value.npassword;
// const opd=this.updateForm.value.opassword;
// const cpd=this.updateForm.value.cpassword;
this.userService.getAllEmail(this.email).subscribe(response => {
  const upwd = response.data;
      for (let i = 0; i < upwd.length; i++) {
        const item = upwd[i];
  
if(item.email===this.email){
  // console.log('this is my id: '+ item._id);
  const idu=item._id;
  this.id=idu;
  const idPwd= item.password;

  //check for match
  if(this.opassword === idPwd){
    this.successMessage = 'Old Password match.';

  }else{

  //update password
  this.userService.updateData(body,this.id).subscribe(
    response => {
      console.log('Response:' + response);
      if(response.status===true){
      sessionStorage.setItem('updateMessage', 'true');
      this.successMessage="Password changed successfully";
      }
    })
}
}
}
});

}
}
















