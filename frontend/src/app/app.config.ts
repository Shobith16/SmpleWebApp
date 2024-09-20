// src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Import routes

export const appConfig = {
  providers: [
    provideRouter(routes) // Provide the router with routes
  ]
};
