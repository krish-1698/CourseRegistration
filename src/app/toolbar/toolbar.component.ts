import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router){
  }

  login(){
    this.isAdmin = true; //Change this for admin and student accordingly
    this.isLoggedIn = true;
    if(this.isAdmin){
      this.router.navigate(['/user']);
    }
    else{
      this.router.navigate(['/myProfile']);
    }
  }

  logout(){
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
