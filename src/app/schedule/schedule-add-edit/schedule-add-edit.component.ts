import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-schedule-add-edit',
  templateUrl: './schedule-add-edit.component.html',
  styleUrls: ['./schedule-add-edit.component.css']
})
export class ScheduleAddEditComponent {
  courses = [
    'Introduction to Computer Science',
    'Web Development Fundamentals',
    'Database Management',
    'Software Engineering Principles',
    'Mobile App Development', 
  ];

   fullDayTimeSlots = [
    '12:00 AM - 1:00 AM',
    '1:00 AM - 2:00 AM',
    '2:00 AM - 3:00 AM',
    '3:00 AM - 4:00 AM',
    '4:00 AM - 5:00 AM',
    '5:00 AM - 6:00 AM',
    '6:00 AM - 7:00 AM',
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
    '10:00 PM - 11:00 PM',
    '11:00 PM - 12:00 AM',
  ];
  
   instructorNames = [
    'John Smith',
    'Jane Doe',
    'Mark Johnson',
    'Emily White',
    'Chris Brown',
    'Sarah Taylor',
    'Michael Davis',
    'Alex Turner',
    'Olivia Martinez',
    'Daniel Wilson',
    // Add more instructor names as needed
  ];

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  scheduleForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ScheduleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.scheduleForm = this._fb.group({
      course: '',
      day: '',
      time: '',
      instructor: '',
    });
  }

  ngOnInit(): void {
    this.scheduleForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.scheduleForm.valid) {
      if (this.data) {
              this._coreService.openSnackBar('Schedule detail updated!');
              this._dialogRef.close(true);
    
      } else {
            this._coreService.openSnackBar('EmpSchedule added successfully');
            this._dialogRef.close(true);
      }
    }
  }
}
