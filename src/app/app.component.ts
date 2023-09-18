import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// interface for the record
export interface Entries {
  API: string;
  Auth: string;
  Category: String;
  Cors: string;
  Description: string;
  HTTPS: boolean;
  Link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  isLoading = false; // Initialize loading status
  dataSource!: Entries[];
  data: any;
  displayedColumns: string[] = ['API', 'Auth', 'Category', 'Cors', 'Description', 'HTTPS', 'Link'];
  errorMessage!:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginator reference
  @ViewChild(MatSort) sort!: MatSort; // Sort reference

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(){
    // Fetch data from an external API
    //this fetches the data from a publicly available api found the internet,it returns the archives of apis.
    this.http.get("https://api.publicapis.org/entries").subscribe({
      next: res => {
        console.log(res);
        if (res) {
          this.isLoading = true; // Data loading set to true to stop the spinner from loading
          this.dataSource = Object.values(res)[1]; //Extracting value from response.
          this.data = new MatTableDataSource<Entries>(this.dataSource);
          this.data.paginator = this.paginator; // Attach paginator to the data
          this.data.sort = this.sort; // Attach sorting to the data
        }
      },
      error: err => {
        console.log(err);
        //ass this is a publicly available api ,instead of handling and showing custom error msg is not much needed and possible.
        this.errorMessage = 'some Error occured.'
      }
    })
  }

  // Function to filter data based on user input
  Filter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.data.filter = value;
  }
}
