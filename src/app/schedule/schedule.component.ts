import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ScheduleAddEditComponent } from './schedule-add-edit/schedule-add-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit{
  scheduleData = [
    {
      day: 'Monday',
      time: '10:00 AM - 11:00 AM',
      instructor: 'John Smith',
      course: 'Database Management',
    },
    {
      day: 'Tuesday',
      time: '2:00 PM - 3:00 PM',
      instructor: 'Jane Doe',
      course: 'Web Development Fundamentals',
    },
    {
      day: 'Wednesday',
      time: '1:00 PM - 2:00 PM',
      instructor: 'Mark Johnson',
      course: 'Mobile App Development',
    },
    {
      day: 'Thursday',
      time: '9:00 AM - 10:00 AM',
      instructor: 'Emily White',
      course: 'Software Engineering Principles',
    },
    {
      day: 'Friday',
      time: '3:00 PM - 4:00 PM',
      instructor: 'Chris Brown',
      course: 'Mobile App Development',
    },
    {
      day: 'Monday',
      time: '4:00 PM - 5:00 PM',
      instructor: 'Sarah Taylor',
      course: 'Data Structures and Algorithms',
    },
    {
      day: 'Wednesday',
      time: '10:00 AM - 11:00 AM',
      instructor: 'Michael Davis',
      course: 'Artificial Intelligence Concepts',
    },
    {
      day: 'Thursday',
      time: '1:00 PM - 2:00 PM',
      instructor: 'Alex Turner',
      course: 'Network Security Fundamentals',
    },
    {
      day: 'Tuesday',
      time: '11:00 AM - 12:00 PM',
      instructor: 'Olivia Martinez',
      course: 'Human-Computer Interaction',
    },
    {
      day: 'Friday',
      time: '2:00 PM - 3:00 PM',
      instructor: 'Daniel Wilson',
      course: 'Cloud Computing Essentials',
    },
  ];
    
  
  displayedColumns: string[] = [
    'course',
    'day',
    'time',
    'instructor',
    'action',
  ];
  
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getScheduleList();
  }

  openAddEditUserForm() {
    const dialogRef = this._dialog.open(ScheduleAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getScheduleList();
        }
      },
    });
  }

  getScheduleList() {
        this.dataSource = new MatTableDataSource(this.scheduleData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteScheduleConfirmation(rowId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed, perform the delete action here
        this.deleteSchedule(rowId);
      }
    });
  }
  deleteSchedule(id: number) {
    this._coreService.openSnackBar('Schedule deleted!', 'done');
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ScheduleAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getScheduleList();
        }
      },
    });
  }
}
