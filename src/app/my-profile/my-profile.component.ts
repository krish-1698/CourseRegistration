import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditComponent } from '../student/student-add-edit/student-add-edit.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

 
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    address: '123 Main St, Cityville',
    phoneNo: '123-456-7890',
  }

  constructor(
    private _dialog: MatDialog
  ) {}

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getUserList();
        }
      },
    });
  }

}
