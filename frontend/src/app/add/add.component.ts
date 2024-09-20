// src/app/add/add.component.ts
import { Component } from '@angular/core';
import { TutorialService } from '../tutorial.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports:[FormsModule]
})
export class AddComponent {
    constructor(private tutorialService : TutorialService,private router:Router){
      
    }
    async add(){
      console.log("entered")
      const Title = (document.getElementById("title") as HTMLInputElement).value.trim();
      const Desc = (document.getElementById("desc") as HTMLInputElement).value.trim();
      const Author = (document.getElementById("author") as HTMLInputElement).value.trim();
      const Cost = (document.getElementById("cost") as HTMLInputElement).value.trim();
    
      if (!Title || !Desc || !Author || !Cost) {
        alert("Please fill in all the fields.");
        return;
      }
      const query= {
        Title,Desc,Author,Cost : Number(Cost)
      };
      try {
        // const tutorial = TutorialService;
        const responce = await this.tutorialService.AddTutorial(query); 
        if(responce==201){
          alert("Creation Successful!");
          this.router.navigate(['/']);
        }else{
          // console.log("Frontend :",responce);
          alert(responce);
        }
       
        // location.reload();

      } catch (error) {
         console.error("Error Occured While Adding new record :",error)
      }
      
    }

 }
