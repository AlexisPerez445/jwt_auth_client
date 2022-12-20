import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  constructor(
    private oAuthService: AuthService
  ) {}

  logged = false;

  ngOnInit(): void {
    this.oAuthService.stateLogin
    .subscribe({
      next: (resp : boolean) => {
        this.logged = resp;
      }
    });
    this.oAuthService.checkToken();
  }

  logout(){
    this.oAuthService.logOut();
  }
}
