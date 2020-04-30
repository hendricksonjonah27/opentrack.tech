import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

import { UserService } from '../user.service'

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '250px',
      data: {
        username: this.username,
        password: this.password,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.username = result.username;
      this.password = result.password;
      this.onLogin();
    });
  }

  onLogin(): void {
    this.userService.loginUser(this.username, this.password).subscribe(
      response => {
        alert('User '  + this.username + ' logged in.');
      },
      error => {
        console.log('error', error);
      }
    )
  }
}
