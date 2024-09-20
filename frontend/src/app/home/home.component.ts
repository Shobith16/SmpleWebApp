import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialService } from '../tutorial.service';
import axios, { AxiosError } from 'axios'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  tutorials: any[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;


  constructor(private tutorialService: TutorialService) {
    this.loadTutorials();
  }




  async loadTutorials(): Promise<void> {
    try {
      const response = await this.tutorialService.getTutorials();
      // console.log(response);
        
      this.tutorials = response.details; 

      // Hide the details in the console
      // console.log(
      //   '%cGetting the details from the database:',
      //   'color: #ffff; font-weight: bold;'
      // );
      // console.log('%c', this.tutorials);

    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion for AxiosError
      if (axiosError.response?.request.status === 404) {
          console.error('Error loading tutorials: No records found at the specified endpoint.', axiosError.response.data);
          alert("There are no Courses as of now!");
      } else {
          console.error('Error loading tutorials:', error);
          alert("An error occurred while loading tutorials. Please try again later.");
      }
    }
}

  search() {
    const course = document.querySelector(".displayinfo") as HTMLElement;

    if (course) {
      course.style.display = "none";
    }

    const searchTerm = this.searchInput.nativeElement.value.toLowerCase().trim();
    // console.log("Entered Search term is:", searchTerm);

    if (searchTerm.length > 0) {
      // Filter the tutorials based on the search term
      this.tutorials = this.tutorials.filter(tutorial =>
        tutorial.Title.toLowerCase().includes(searchTerm)
      );
      // console.log("Filtered Array:", this.tutorials);
    } else {
      this.loadTutorials();
      // console.log("Reset Filtered Array:", this.tutorials);
    }
  }

  displayinfo(Title: string, Desc: string, Author: string, Cost: number,_id :string) {
    const course = document.querySelector(".displayinfo") as HTMLElement;

    if (course) {
      course.style.display = "block";
    }

    const title = document.getElementById('title') as HTMLElement;
    const desc = document.getElementById('desc') as HTMLElement;
    const author = document.getElementById('author') as HTMLElement;
    const cost = document.getElementById('cost') as HTMLElement;
    const deleteButton = document.getElementById('delete') as HTMLElement;
    const editButton = document.getElementById('edit') as HTMLElement;

    title.textContent = Title;
    desc.textContent = Desc;
    author.textContent = Author;
    cost.textContent = `Rs. ${Cost}`; 

    
    if (deleteButton) {
        deleteButton.onclick = () => this.delete(_id); // Use an arrow function to preserve 'this'
    }
    if (editButton) {
      editButton.onclick = () => this.update(_id,Title,Desc,Author,Cost); // Use an arrow function to preserve 'this'
    }
  }
  close(){
    const infocontainer = (document.getElementById('info') as HTMLElement);
    const editinfocontainer = (document.getElementById('editinfo') as HTMLElement);
      editinfocontainer.style.display = "none";
      infocontainer.style.display = "block";
    const course = document.querySelector(".displayinfo") as HTMLElement;

    if (course) {
      course.style.display = "none";
    }
  }
  async delete(id : string){
   
    const _id = id;
    console.log(_id)
    try {
      // Call the service to update tutorials
      const response = await this.tutorialService.Tutorialsdeletebyid(_id);
      if (response) {
          alert(response.message); 
          console.log("Response from server:", response);
          location.reload();
          
       } else {
           // If the record is not found or any other issue
           alert("Record not found or could not be deleted."); 
       }
     

    } catch (error) {
        console.error('Error deleting tutorial:', error);
        alert("An error occurred while trying to delete the record.check the id!");
    }




  }
  async update(_id:string,title:string,desc:string,author:string,cost:number) {
    const infocontainer = (document.getElementById('info') as HTMLElement);
    const editinfocontainer = (document.getElementById('editinfo') as HTMLElement);

    infocontainer.style.display = "none";
    editinfocontainer.style.display = "block";
    console.log(_id,title,desc,author,cost);

     // Set the values in the input fields
     const titleInput = document.getElementById('Etitle') as HTMLInputElement;
     const descInput = document.getElementById('Edesc') as HTMLInputElement;
     const authorInput = document.getElementById('Eauthor') as HTMLInputElement;
     const costInput = document.getElementById('Ecost') as HTMLInputElement;
 
     if (titleInput && descInput && authorInput && costInput) {
         titleInput.value = title;
         descInput.value = desc;
         authorInput.value = author;
         costInput.value = `${cost}`; 
     } else {
         console.error('One or more input elements are not found.');
         return; 
     }
     // Prepare the submit button click handler
     const submitButton = document.getElementById('update') as HTMLElement;
     if (submitButton) {
         submitButton.onclick = async () => {
             const updatedTitle = (document.getElementById('Etitle') as HTMLInputElement).value;
             const updatedDesc = (document.getElementById('Edesc') as HTMLInputElement).value;
             const updatedAuthor = (document.getElementById('Eauthor') as HTMLInputElement).value;
             const updatedCost = Number((document.getElementById('Ecost') as HTMLInputElement).value);

            //  console.log(updatedTitle,updatedAuthor,updatedDesc,updatedCost)
             const query = { Title: updatedTitle, Desc: updatedDesc, Author: updatedAuthor, Cost: updatedCost };
             await this.updaterecord(_id, query); 
         };
     }

     const CancelButton = document.getElementById('cancel') as HTMLElement;
     if (CancelButton) {
         CancelButton.onclick = () => {
          editinfocontainer.style.display = "none";
          infocontainer.style.display = "block";
         }
      }
   
  }
  async updaterecord(id:string,query:any){
    try {
      
      // Call the service to update tutorials
      const response = await this.tutorialService.updateTutorials(id, query);
      console.log("Response from server:", response);
      alert(response);
      const infocontainer = (document.getElementById('info') as HTMLElement);
      const editinfocontainer = (document.getElementById('editinfo') as HTMLElement);
      editinfocontainer.style.display = "none";
      infocontainer.style.display = "block";
    } catch (error) {
      console.error('Error updating tutorials:', error);
    }
  }

  async remove(){
    try {
      const del_all_warn = (document.getElementById("del-all-warn") as HTMLElement);
      del_all_warn.style.display="block";
      const Yes = document.getElementById('yes') as HTMLElement;

      Yes.onclick = () =>{
        del_all_warn.style.display="none";
          // Call the service to update tutorials
        const response = this.tutorialService.remove();
        console.log("Response from server:", response);
        location.reload();
        
      }

      const No = document.getElementById('no') as HTMLElement;

      No.onclick = () =>{
        del_all_warn.style.display="none";
      }
      
      
    
    } catch (error) {
      console.error('Error updating tutorials:', error);
    }
  }

}