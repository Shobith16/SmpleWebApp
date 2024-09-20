import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialService } from '../tutorial.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for reactive forms
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule for form handling
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'] // Corrected from styleUrl to styleUrls
})
export class EditComponent {
  tutorials: any[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private tutorialService: TutorialService,private router:Router) {
    this.loadTutorials();
  }

  async loadTutorials(): Promise<void> {
    try {
      
      const response = await this.tutorialService.getTutorials();
      this.tutorials = response.headers['x-details']; // Access the details array
      console.log("RES :",this.tutorials)
    } catch (error) {
      console.error('Error loading tutorials:', error);
    }
  }

  search() {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase().trim();
    console.log("Entered Search term is:", searchTerm);

    // Clear any previous warning messages
    (document.getElementById('warn') as HTMLElement).textContent = "";
    const course = document.querySelector("#editdetails") as HTMLElement;

    // Check if the search term is exactly 24 characters long
    if (searchTerm.length === 24) {
      if (course) {
        course.style.display = "block"; // Show the course details section
      }

      let found = false; // Flag to track if a matching tutorial is found

      // Iterate through tutorials to find a match
      this.tutorials.forEach(tutorial => {
        if (tutorial._id.toLowerCase().includes(searchTerm)) {
          this.displayinfo(tutorial.Title, tutorial.Desc, tutorial.Author, tutorial.Cost);
          // console.log("Filtered Array: ", tutorial);
          found = true; // Set the flag to true if a match is found
          return; // Exit the loop once a match is found
        }
      });

      // If no matching tutorial was found, clear the display info
      if (!found) {
        course.style.display = "none";
        (document.getElementById('warn') as HTMLElement).textContent = "Record does not exist! Please check the ID!";
      }
    } else {
      if (course) {
        course.style.display = "none"; // Hide the course details section
      }
      (document.getElementById('warn') as HTMLElement).textContent = "Enter the 24-digit ID"; // Display warning message
    }
  }

  displayinfo(Title: string, Desc: string, Author: string, Cost: number) {
   
     (document.getElementById('title') as HTMLInputElement).value = Title;
     (document.getElementById('desc') as HTMLInputElement).value = Desc;
     (document.getElementById('author') as HTMLInputElement).value = Author;
     (document.getElementById('cost') as HTMLInputElement).value = `${Cost}`; 
  }

  async update() {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase().trim();

    // Retrieve values from input fields
    const Title = (document.getElementById('title') as HTMLInputElement).value;
    const Desc = (document.getElementById('desc') as HTMLInputElement).value;
    const Author = (document.getElementById('author') as HTMLInputElement).value;
    const Cost = (document.getElementById('cost') as HTMLInputElement).value;

    // console.log("Updated:", Title);

    // Prepare the query object with the input values
    const query = { Title, Desc, Author, Cost: Number(Cost) };

    try {
      // Call the service to update tutorials
      const response = await this.tutorialService.updateTutorials(searchTerm, query);
      console.log("Response from server:", response);
      alert(response);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error updating tutorials:', error);
    }
  }
}
