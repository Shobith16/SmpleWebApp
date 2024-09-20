import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import axios , { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:8000'; // Base API URL

  constructor() {}

  async getTutorials() {
    try {
      // Set up the request body with modelName and query
      const requestBody = {
        modelName: 'Tutorial', // Specify the model name
        ...query // Spread any additional query parameters
      };

      const response = await axios.post(`${this.apiUrl}/api/find`, requestBody); // Send POST request
      // console.warn("Received in Frontend:", response.data);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      throw error; // Rethrow the error for further handling
    }
  }

  async updateTutorials(id: string, details: any) {
    try {
      // Set up the request body with modelName and query
      const requestBody = {
        modelName: 'Tutorial', // Specify the model name
        _id: id,
        ...details // Spread any additional query parameters
      };
      console.log("Service file ::",requestBody)
      
      // Send a POST request to update the tutorial
      const response = await axios.post(`${this.apiUrl}/api/update`, requestBody);
      // console.warn("Received in Frontend:", response.data.message);
      return response.data.message; // Return the data from the response
    } catch (error) {
      console.error('Error updating tutorials:', error);
      throw error; // Rethrow the error for further handling
    }
  }
  async Tutorialsdeletebyid(_id: string) {
    try {
      // Set up the request body with modelName and ID
      const query={modelName: 'Tutorial',_id};

      
      console.log("Service file ::", query);
      
      // Send a POST request to delete the tutorial
      const response = await axios.post(`${this.apiUrl}/api/delete`, query);
      // console.warn("Received in Frontend:", response.data);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error deleting tutorial:', error); // Updated error message
      throw error; // Rethrow the error for further handling
    }
  }



  async AddTutorial(query: any): Promise<number | string> {
      try {
          // Set up the request body with modelName and ID
          const requestBody = {
              modelName: 'Tutorial', // Specify the model name
              ...query  // Include the ID of the tutorial to delete
          };
          
          console.log("Service file ::", requestBody);
          
          // Send a POST request to add the tutorial
          const response = await axios.post(`${this.apiUrl}/api/insert`, requestBody);
  
          // console.warn("Received in Frontend:", response);
          return response.status;  // Return the status code of the response
      } catch (error) {
          console.error('Error adding tutorial:', error); 
          const axiosError = error as AxiosError;
  
          if (axiosError.response?.status === 409) {
              console.warn("Record Exists!!");
              return "Record Exists!!";  // Return a message if the record exists
          }
  
          // Handle other errors
          return "An error occurred while adding the tutorial."; // Return a generic error message
      }
  }

  async remove() {
    try {
      // Set up the request body with modelName and query
      const query={modelName: 'Tutorial'};

      const response = await axios.post(`${this.apiUrl}/api/deleteall`,query); // Send POST request
      // console.warn("Received in Frontend:", response.data);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      throw error; // Rethrow the error for further handling
    }
  }
}
