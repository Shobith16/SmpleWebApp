import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { TutorialService } from '../tutorial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
 



  constructor(private tutorialService: TutorialService,private router:Router) {
   
  }
  async delete(){
    const deleteInput = document.getElementById("id") as HTMLInputElement; // Cast the element
    const _id = deleteInput.value;

    try {
      // Call the service to update tutorials
      const response = await this.tutorialService.Tutorialsdeletebyid(_id);
      if (response) {
          alert(response.message); 
          console.log("Response from server:", response);
          
      
          deleteInput.value="";
          this.router.navigate(['/']);
       } else {
           // If the record is not found or any other issue
           alert("Record not found or could not be deleted."); 
       }
     

    } catch (error) {
        console.error('Error deleting tutorial:', error);
        alert("An error occurred while trying to delete the record.check the id!");
    }




  }
}
