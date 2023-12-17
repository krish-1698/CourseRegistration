import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';


@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent {
  studentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.studentForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      phoneNo: '',
    });
  }

  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.studentForm.valid) {
      if (this.data) {
              this._coreService.openSnackBar('User Detail updated!');
              this._dialogRef.close(true);
      } else {
            this._coreService.openSnackBar('User Added successfully');
            this._dialogRef.close(true);
      }
    }
  }
}
