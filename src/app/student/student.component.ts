import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements AfterViewInit{

   userData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      address: '123 Main St, Cityville',
      phoneNo: '123-456-7890',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'securepass',
      address: '456 Oak Ave, Townsville',
      phoneNo: '987-654-3210',
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      password: 'pass123',
      address: '789 Pine Rd, Villagetown',
      phoneNo: '555-123-4567',
    },
    {
      firstName: 'Alice',
      lastName: 'Williams',
      email: 'alice.williams@example.com',
      password: 'p@ssw0rd',
      address: '321 Elm Blvd, Hamletville',
      phoneNo: '222-333-4444',
    },
    {
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      password: 'brownie123',
      address: '987 Cedar Ln, Riverside',
      phoneNo: '777-888-9999',
    },
    {
      firstName: 'Emily',
      lastName: 'Miller',
      email: 'emily.miller@example.com',
      password: 'pass123',
      address: '654 Birch Ct, Lakeside',
      phoneNo: '333-222-1111',
    },
    {
      firstName: 'Michael',
      lastName: 'Taylor',
      email: 'michael.taylor@example.com',
      password: 'taylorpass',
      address: '876 Pineapple St, Beachtown',
      phoneNo: '444-555-6666',
    },
    {
      firstName: 'Sophia',
      lastName: 'Davis',
      email: 'sophia.davis@example.com',
      password: 'secure123',
      address: '111 Mango Ave, Orchard City',
      phoneNo: '666-777-8888',
    },
    {
      firstName: 'Daniel',
      lastName: 'Wilson',
      email: 'daniel.wilson@example.com',
      password: 'd@niel123',
      address: '222 Cherry Dr, Hillside',
      phoneNo: '999-111-2222',
    },
    {
      firstName: 'Olivia',
      lastName: 'Moore',
      email: 'olivia.moore@example.com',
      password: 'passw0rd',
      address: '333 Lemon Rd, Citrusville',
      phoneNo: '111-222-3333',
    },
  ];
    
  
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'password',
    'address',
    'phoneNo',
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
    this.getUserList();
  }

  openAddEditUserForm() {
    const dialogRef = this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  getUserList() {
        this.dataSource = new MatTableDataSource(this.userData);
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

  deleteUser(id: number) {
        this._coreService.openSnackBar('Course deleted!', 'done');
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }
}
