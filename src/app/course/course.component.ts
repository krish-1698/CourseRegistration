import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScheduleAddEditComponent } from '../schedule/schedule-add-edit/schedule-add-edit.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements AfterViewInit{


  isAdmin:boolean = false;
  courseData = [
    {
      courseCode: 'CS101',
      title: 'Introduction to Computer Science',
      description: 'A foundational course covering the basics of computer science and programming.',
    },
    {
      courseCode: 'MATH202',
      title: 'Linear Algebra',
      description: 'An advanced mathematics course focusing on linear algebra concepts and applications.',
    },
    {
      courseCode: 'ENG301',
      title: 'Advanced English Literature',
      description: 'Exploration of classic and contemporary works in English literature.',
    },
    {
      courseCode: 'PHY102',
      title: 'Physics for Engineers',
      description: 'Fundamental principles of physics with an emphasis on applications in engineering.',
    },
    {
      courseCode: 'CHEM201',
      title: 'Organic Chemistry',
      description: 'In-depth study of organic chemistry compounds and reactions.',
    },
    {
      courseCode: 'ART120',
      title: 'Introduction to Visual Arts',
      description: 'Exploration of various forms of visual arts, including drawing, painting, and sculpture.',
    },
    {
      courseCode: 'HIST150',
      title: 'World History: Ancient Civilizations',
      description: 'A historical survey of ancient civilizations and their contributions to human history.',
    },
    {
      courseCode: 'BUS400',
      title: 'Strategic Management',
      description: 'Study of strategic planning and management practices in business organizations.',
    },
    {
      courseCode: 'PSYCH250',
      title: 'Abnormal Psychology',
      description: 'Examination of abnormal psychological conditions and their treatment approaches.',
    },
    {
      courseCode: 'ENVSCI110',
      title: 'Environmental Science Fundamentals',
      description: 'Introduction to environmental science principles and their relevance to global issues.',
    },
  ];

  displayedColumns: string[] = [
    'courseCode',
    'title',
    'description',
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
    this.getCourseList();
   this.isAdmin =  (localStorage.getItem('isAdmin') === 'true' || false)
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CourseAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
        }
      },
    });
  }

  getCourseList() {

        this.dataSource = new MatTableDataSource(this.courseData);
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


  deleteCourseConfirmation(rowId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed, perform the delete action here
        this.deleteCourse(rowId);
      }
    });
  }


  deleteCourse(id: number) {
        this._coreService.openSnackBar('Course deleted!', 'done');
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CourseAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
        }
      },
    });
  }

  openScheduleForm(data:any){
    const dialogRef = this._dialog.open(ScheduleAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
        }
      },
    });
  }

  enrolCourse(id:number){

  }

}
