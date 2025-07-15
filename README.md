<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Event Management API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: auto;
      padding: 20px;
      background: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #222;
    }
    code, pre {
      background: #eee;
      padding: 8px;
      display: block;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 8px;
      border: 1px solid #ccc;
    }
    a {
      color: #0066cc;
    }
  </style>
</head>
<body>

  <h1>Event Management API</h1>
  <p>This is a simple API to create events, register users, and manage event registrations.</p>
  <p>
    You can test all the API requests using Postman: <br />
    <strong>Postman Documentation:</strong>
    <a href="https://www.postman.com/lively-desert-712000/my-workspace/documentation/9gjx7hs/event-api" target="_blank">EventManagementApi</a>
  </p>

  <h2>Base URL</h2>
  <pre>https://event-management-api-five.vercel.app</pre>

  <h2>Endpoints</h2>

  <h3>1. Create Event</h3>
  <p><strong>POST /events/createEvent</strong></p>
  <p>Create a new event.</p>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td>title</td><td>string</td><td>Name of the event</td></tr>
    <tr><td>datetime</td><td>string</td><td>Date and time (ISO format)</td></tr>
    <tr><td>location</td><td>string</td><td>Where the event will happen</td></tr>
    <tr><td>capacity</td><td>number</td><td>Maximum number of participants</td></tr>
  </table>

  <pre>
{
  "statusCode": 200,
  "data": {
    "event": {
      "id": 1,
      "title": "College Fest",
      "datetime": "2025-09-02T08:00:00.000Z",
      "location": "Mumbai",
      "capacity": 1000,
      "registrations": [],
      "createdAt": "...",
      "updatedAt": "..."
    }
  },
  "success": true
}
  </pre>

  <h3>2. Get Single Event</h3>
  <p><strong>GET /events/:id</strong></p>
  <p>Get details of a specific event by ID.</p>
  <pre>GET /events/13</pre>

  <h3>3. Register a User</h3>
  <p><strong>POST /user/createUser</strong></p>
  <p>Create a new user.</p>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td>name</td><td>string</td><td>User's name</td></tr>
    <tr><td>email</td><td>string</td><td>User's email address</td></tr>
  </table>

  <h3>4. Register a User for an Event</h3>
  <p><strong>POST /events/:id/register</strong></p>
  <p>Register a user for a specific event.</p>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td>userId</td><td>number</td><td>ID of the user</td></tr>
  </table>
  <p>Note:</p>
  <ul>
    <li>User can't register twice for the same event.</li>
    <li>If event is full, registration will not work.</li>
  </ul>

  <h3>5. Get Upcoming Events</h3>
  <p><strong>GET /events/upcoming</strong></p>
  <p>Get a list of all upcoming events.</p>

  <h3>6. Cancel Registration</h3>
  <p><strong>POST /events/:id/cancel</strong></p>
  <p>Cancel a user’s registration.</p>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td>userId</td><td>number</td><td>ID of the user</td></tr>
  </table>
  <p>Note: Returns error if user was never registered.</p>

  <h3>7. Get Event Stats</h3>
  <p><strong>GET /events/:id/stats</strong></p>
  <p>Get number of users registered and available capacity.</p>

  <h2>Made By</h2>
  <p>Tatsam Vasava<br />
  <a href="https://github.com/sezerz1121" target="_blank">GitHub</a></p>

</body>
</html>
