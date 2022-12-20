import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private oAuthService: AuthService,
    private oFormBuilder: FormBuilder,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.oActivatedRoute.params.subscribe({
      next: ({ token }: any) => {
        this.token = token;
      },
    });
  }
  resetForm: FormGroup = this.oFormBuilder.group({
    password: ["", Validators.required],
    password2: ["", Validators.required]
  });

  token!: string;
  forbidden: boolean = false;
  samePassword!: boolean;

  ngOnInit(): void {
   console.log(this.token);
  }

  resetPassword(){
    if(this.resetForm.valid){
      this.oAuthService.resetPassword(this.resetForm.value.password, this.resetForm.value.password2, this.token)
      .subscribe({
        next: (resp: string) => {
          console.log(resp);
          if(resp == 'Las contraseñas no son iguales'){
            this.samePassword = false;
          } else {
            this.samePassword = true
          }
          this.forbidden = false;
        },
        error: (err: HttpErrorResponse) => {
          this.forbidden = true;
          console.log(err);
        }
      })
    } else{
      this.resetForm.markAllAsTouched();
    }
  }
  CampoNoValido(campo: string) {
    return (
      this.resetForm.controls[campo].errors &&
      this.resetForm.controls[campo].touched
    );
  }

  touched( campo: string ): boolean{
    return this.resetForm.controls[campo].touched
  }

}
