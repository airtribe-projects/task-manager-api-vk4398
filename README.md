# Task-Manager API

A RESTful API built with Node.js, Express.js and in-memory data storage to manage tasks.
Supports creating, reading, updating, and deleting tasks, along with filtering, sorting, and priority-based queries.

---

# Features

- Create , update, delete, and retrieve(all or specific) tasks
- Filter tasks by completion status
- Sort tasks by creation date
- Retrieve tasks based on priority level (low, medium, high)
- Input validation and error handling

---

# Setup Instructions

- Install Node.js, npm, Express.js (`npm install express`) and other necessary npm packages.
- Retrieve the project from the git repository via `git clone <project url>`.
- Install nodemon for auto-refresh of the server (`npm install --save-dev nodemon`)
- Navigate to the task folder using `cd <task manager api path>`
- Start the server by running `nodemon app.js`

# API Endpoints

1. Base URL - GET "/"

2. Get all Tasks - GET "/tasks"

Query Parameters:

- sortOrder - Query parameter to sort the tasks by completion date in ascending or descending order (`sortOrder=ascending` OR `sortOrder=descending`)
- completed - Query parameter to filter the tasks based on completion status (`completed=true` OR `completed=false`)

How to Test:

- via curl :
  curl http://localhost:{PORT}/tasks?completed=false&sortOrder=Ascending

- via Postman
  Method: GET
  Endpoint: http://localhost:{PORT}/tasks?completed=false&sortOrder=Ascending

3. Get Task by ID - GET "/tasks/:id"

How to Test:

- via curl :
  curl http://localhost:{PORT}/tasks/{ID}

- via Postman
  Method: GET
  Endpoint: http://localhost:{PORT}/tasks/{ID}

4. Get Tasks by Priority - GET "/tasks/priority/:level"
   Path param : level = low, medium or high

How to Test:

- via curl :
  curl http://localhost:{PORT}/tasks/priority/low

- via Postman
  Method: GET
  Endpoint: http://localhost:{PORT}/tasks/priority/low

5. Create a Task - POST "/tasks"

How to Test:

- via curl :
  curl -X POST http://localhost:{PORT}/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Title","description":"Sample Description","completed":false,"priority":"high"}'

- via Postman
  Method: POST

  Endpoint: http://localhost:{PORT}/tasks

  Headers: Content-Type: application/json

  Body (raw JSON):

  {
  "title": "Sample Title",
  "description": "Sample Description",
  "completed": false,
  "priority": "high"
  }

6. Update a Task - PUT "/tasks/:id"

How to Test:

- via curl :
  curl -X PUT http://localhost:{PORT}/tasks/{ID} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","description":"Updated Description","completed":true,"priority":"high"}'

- via Postman
  Method: PUT

  Endpoint: http://localhost:{PORT}/tasks/{ID}

  Headers: Content-Type: application/json

  Body (raw JSON):

  {
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true,
  "priority": "high"
  }

7. Delete a Task - DELETE "/tasks/:id"

How to Test:

- via curl :
  curl -X DELETE http://localhost:{PORT}/tasks/{ID}

- via Postman
  Method: DELETE

  Endpoint: http://localhost:{PORT}/tasks/{ID}

# Invalid Inputs and their Responses

- Test invalid inputs by passing empty or incorrect type values in the body, incorrect path and query params

- Invalid inputs:
  title, description - Empty
  priority - Anything other than low, medium, high
  completed - Anything other than true, false
  sortOrder (Query Param) - Anything other than ascending or descending

- Invalid Query Parameters:
  completed - Anything other than true, false
  sortOrder (Query Param) - Anything other than ascending or descending

- Invalid Path Parameters:
  level - Anything other than low, medium, high
  id - Any id for which corresponding task does not exist

- Will receive a response with status code of 404 and an appropriate message in the body.
