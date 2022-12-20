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
  ngOnInit(): void {

  }

  resetPassword(){
    if(this.resetForm.valid){
      this.oAuthService.resetPassword(this.resetForm.value.password, this.resetForm.value.password2)
      .subscribe({
        next: (resp: string) => {
          console.log(resp);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }
  }


}
