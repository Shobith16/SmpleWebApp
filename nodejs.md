Node.js is a powerful, open-source JavaScript runtime environment that allows developers to execute JavaScript code on the server side. Below are the basics of Node.js, including its main imports and example code to help you get started.

## Basics of Node.js

### What is Node.js?

Node.js is built on Chrome's V8 JavaScript engine and is designed for building scalable network applications. It uses an event-driven, non-blocking I/O model, which makes it lightweight and efficient for handling multiple connections simultaneously.

### Key Features

- **Asynchronous and Event-Driven**: Node.js handles multiple requests without blocking the execution of other tasks.
- **Single-Threaded**: It operates on a single thread, making it less resource-intensive.
- **Cross-Platform**: Node.js can run on various operating systems, including Windows, Linux, and macOS.
- **Rich Ecosystem**: It has a vast library of modules available through npm (Node Package Manager).

## Main Imports in Node.js

Here are some commonly used built-in modules in Node.js:

1. **http**: Used to create HTTP servers and clients.
2. **fs**: Provides file system-related functionality to read and write files.
3. **path**: Utilities for working with file and directory paths.
4. **events**: Enables event-driven programming using event emitters.
5. **express**: A popular web framework for building web applications (not built-in but widely used).

## Example Code

### 1. Creating a Simple HTTP Server

This example demonstrates how to create a basic HTTP server using the `http` module.

```javascript
// server.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Running the Server

1. Save the code above in a file named `server.js`.
2. Open your terminal and navigate to the directory where `server.js` is located.
3. Run the command:
   ```bash
   node server.js
   ```
4. Open your browser and go to `http://127.0.0.1:3000/`. You should see "Hello World!".

### 2. Using Express to Create a Web Server

Express is a minimal web framework for Node.js that simplifies server creation.

#### Installation

First, install Express using npm:

```bash
npm install express
```

#### Example Code

```javascript
// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### Running the Express App

1. Save the code above in a file named `app.js`.
2. Open your terminal and navigate to the directory where `app.js` is located.
3. Run the command:
   ```bash
   node app.js
   ```
4. Open your browser and go to `http://localhost:3000/`. You should see "Hello World from Express!".

## Conclusion

Node.js is a versatile platform for building server-side applications using JavaScript. By utilizing built-in modules like `http`, `fs`, and external libraries like `express`, you can create powerful applications. Understanding these basics will help you get started with backend development using Node.js.

Citations:
[1] https://github.com/learning-zone/nodejs-basics
[2] https://www.freecodecamp.org/news/get-started-with-nodejs/
[3] https://www.geeksforgeeks.org/node-js-basics/
[4] https://www.tutorialspoint.com/nodejs/index.htm
[5] https://www.geeksforgeeks.org/nodejs/
[6] https://www.w3schools.com/nodejs/
[7] https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
[8] https://www.w3schools.com/angular/angular_services.asp

## ============================================================================================================================================================================================

CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that allows web applications to request resources from a different domain than the one that served the web page. This is essential for modern web applications that often interact with APIs hosted on different origins.

### How CORS Works

CORS operates through the use of HTTP headers that indicate whether a resource can be shared across different origins. When a browser makes a cross-origin request, it sends an HTTP request that includes an `Origin` header, which specifies the origin of the request. The server can respond with specific headers to allow or deny the request.

### Key Concepts

1. **Same-Origin Policy**: A fundamental security measure that restricts web pages from making requests to a different domain than the one that served the web page. CORS is a way to relax this policy.

2. **Preflight Requests**: For certain types of requests (like those using methods other than GET or POST, or custom headers), the browser sends a preliminary request (an OPTIONS request) to the server to check if the actual request is safe to send.

3. **Simple Requests**: These are requests that meet specific criteria, such as using GET or POST with certain headers. They do not require a preflight request.

### CORS Headers

- **Access-Control-Allow-Origin**: Specifies which origins are allowed to access the resource. It can be a specific origin or a wildcard (`*`) to allow all origins.
- **Access-Control-Allow-Methods**: Lists the HTTP methods that are allowed when accessing the resource.
- **Access-Control-Allow-Headers**: Specifies which headers can be used when making the actual request.
- **Access-Control-Max-Age**: Indicates how long the results of a preflight request can be cached.

### Implementing CORS in Node.js with Express

To enable CORS in a Node.js application using Express, you can use the `cors` middleware package. Below are examples of how to set it up.

#### Installation

First, install the `cors` package:

```bash
npm install cors
```

#### Basic Usage

Here’s how to enable CORS for all routes:

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get('/products/:id', (req, res) => {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});
```

#### Enabling CORS for Specific Origins

You can also configure CORS to allow only specific origins:

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://example.com', // Allow only example.com
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/products/:id', cors(corsOptions), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for only example.com.' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});
```

#### Dynamic Origin Handling

You can also set up dynamic origin handling based on a list of allowed origins:

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const allowlist = ['http://example1.com', 'http://example2.com'];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // Reflect the requested origin
  } else {
    corsOptions = { origin: false }; // Disable CORS for this request
  }
  callback(null, corsOptions);
};

app.get('/products/:id', cors(corsOptionsDelegate), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});
```

### Conclusion

CORS is an essential mechanism for enabling secure cross-origin requests in web applications. By configuring CORS properly on your server, you can allow specific domains to access your resources while maintaining security. Understanding how to implement CORS in Node.js with Express will help you build flexible and secure applications that interact with various APIs and services.

Citations:
[1] https://expressjs.com/en/resources/middleware/cors.html
[2] https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[3] https://supertokens.com/blog/what-is-cross-origin-resource-sharing
[4] https://aws.amazon.com/what-is/cross-origin-resource-sharing/
[5] https://hackernoon.com/understanding-cors-why-its-important-and-how-it-works
[6] https://portswigger.net/web-security/cors
[7] https://www.geeksforgeeks.org/cross-origin-resource-sharing-cors/
[8] https://github.com/learning-zone/nodejs-basics


