import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor (
    private oAuthService: AuthService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router
  ) {}

  loginUser: FormGroup = this.oFormBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });

  logged: boolean = false;

  ngOnInit(): void {

  }

  login(){
    if(this.loginUser.valid){
      this.oAuthService.login(this.loginUser.value.email, this.loginUser.value.password)
      .subscribe({
        next: (resp: AuthResponse) => {
          this.logged = resp.ok;
          console.log(resp);
          if(resp.ok){
            sessionStorage.setItem("token", resp.token);
            this.oRouter.navigateByUrl('/home');
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    } else {
      console.log('Invalid');
    }

  }

}
