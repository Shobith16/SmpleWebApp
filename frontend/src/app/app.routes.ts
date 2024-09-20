import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Import standalone AppComponent
import { AddComponent } from './add/add.component'; // Import standalone AddComponent
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'add', component: AddComponent } ,// Route to AddComponent
  { path:'edit',component:EditComponent} ,
  { path:'delete',component:DeleteComponent}
];