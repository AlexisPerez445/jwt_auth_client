import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(
    private oAuthService: AuthService,
    private oFormBuilder: FormBuilder,
  ) {}

  forgotPassword: FormGroup = this.oFormBuilder.group({
    email: ["", [Validators.required, Validators.email]]
  });

  found!: boolean;

  ngOnInit(): void {

  }

  sendEmail(){
    if(this.forgotPassword.valid){
      this.oAuthService.sendEmail(this.forgotPassword.value.email)
      .subscribe({
        next: (resp: string) => {
            console.log(resp);
            if(resp != 'user email not found'){
                this.found = true;
            } else{
              this.found = false;
            }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    } else{
      this.forgotPassword.markAllAsTouched();
    }
  }

  CampoNoValido(campo: string) {
    return (
      this.forgotPassword.controls[campo].errors &&
      this.forgotPassword.controls[campo].touched
    );
  }

  touched( campo: string ): boolean{
    return this.forgotPassword.controls[campo].touched
  }
}
