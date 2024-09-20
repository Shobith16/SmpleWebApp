// src/app/app.component.ts
import {CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet ,RouterModule } from '@angular/router'; // Import RouterOutlet for standalone components

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule] // Include RouterOutlet to enable routing
})
export class AppComponent { 
 
}
