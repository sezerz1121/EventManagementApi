<!DOCTYPE html>
<html lang="en">

<body>

  <h1>Event Management API</h1>
  <p>This is a simple API to create events, register users, and manage event registrations.</p>
  <p>
    You can test all the API requests using Postman: <br />
    <strong>Postman Documentation:</strong>
    <a href="https://www.postman.com/lively-desert-712000/my-workspace/documentation/9gjx7hs/event-api" target="_blank">EventManagementApi</a>
  </p>

<h2>Base URL</h2>
<p>If you don't want to set it up on your PC, you can use this URL directly in Postman:</p>
<pre>https://event-management-api-five.vercel.app</pre>

  <h2>Setup Instructions</h2>
  <p>Follow these steps to run the project locally:</p>
  <ol>
    <li>Clone the repository</li>
    <li>Install dependencies:</li>
    <pre><code>npm install</code></pre>
    <li>Create a file called <code>.env</code> in the root directory</li>
    <li>Add the following line to your <code>.env</code> file:</li>
    <pre><code>PG_URL=postgresql://event_manager_srly_user:stpxNXDckUtTb5N4llcdsOaDEVwRKxOL@dpg-d1r2bb3e5dus73e69jh0-a.singapore-postgres.render.com/event_manager_srly</code></pre>
    <li>Start the server</li>
    <pre><code>npm run dev</code></pre>
  </ol>

  <h2>Endpoints</h2>

  <h3>1. Create Event</h3>
  <p><strong>POST /events/createEvent</strong></p>
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/hdh8rfw/event-create" target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/hdh8rfw/event-create</a>
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
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/vgu9sk0/get-single-event" target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/vgu9sk0/get-single-event</a>
  <p>Get details of a specific event by ID.</p>
  <pre>GET /events/13</pre>
   <pre>
     {
    "statusCode": 200,
    "data": {
        "message": "Found the event successfully",
        "event": {
            "id": 13,
            "title": "clg",
            "datetime": "2025-09-02T18:00:00.000Z",
            "location": "pune",
            "capacity": 2,
            "registrations": [
                1
            ],
            "created_at": "2025-07-15T14:05:12.791Z",
            "updated_at": "2025-07-15T14:05:20.812Z"
        }
    },
    "message": "success",
    "success": true
}
 </pre>
  <h3>3. Register a User</h3>
  <p><strong>POST /user/createUser</strong></p>
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/3278nbm/register-user" target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/3278nbm/register-user</a>
  <p>Create a new user.</p>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td>name</td><td>string</td><td>User's name</td></tr>
    <tr><td>email</td><td>string</td><td>User's email address</td></tr>
  </table>
  <pre>
     {
    "statusCode": 200,
    "data": {
        "message": "Created user successfully",
        "user": {
            "id": 6,
            "name": "Tatsam",
            "email": "Tatsamv90@gmail.com",
            "created_at": "2025-07-15T16:20:48.252Z",
            "updated_at": "2025-07-15T16:20:48.252Z"
        }
    },
    "message": "success",
    "success": true
}
 </pre>

  <h3>4. Register a User for an Event</h3>
  <p><strong>POST /events/:id/register</strong></p>
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/6lmnuin/register-a-user-for-the-event" target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/6lmnuin/register-a-user-for-the-event</a>
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
  <pre>
    {
    "statusCode": 200,
    "data": {
        "message": "User registered for event successfully",
        "event": {
            "id": 15,
            "title": "clg",
            "datetime": "2025-09-02T18:00:00.000Z",
            "location": "mumbai",
            "capacity": 100,
            "registrations": [
                3,
                5,
                6
            ],
            "created_at": "2025-07-15T15:01:37.666Z",
            "updated_at": "2025-07-15T16:21:48.117Z"
        }
    },
    "message": "success",
    "success": true
}
  </pre>
  <h3>5. Get Upcoming Events</h3>
  <p><strong>GET /events/upcoming</strong></p>
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/b8p1ohr/upcoming-events " target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/b8p1ohr/upcoming-events </a>
  <p>Get a list of all upcoming events.</p>
  <pre>
    {
    "statusCode": 200,
    "data": {
        "message": "All upcoming event found successfully",
        "event": [
            {
                "id": 6,
                "title": "react-data",
                "datetime": "2025-08-01T18:00:00.000Z",
                "location": "ahemdabad",
                "capacity": 500,
                "registrations": [
                    2,
                    1
                ],
                "created_at": "2025-07-15T12:16:58.095Z",
                "updated_at": "2025-07-15T13:30:21.608Z"
            },
            {
                "id": 4,
                "title": "react",
                "datetime": "2025-08-01T18:00:00.000Z",
                "location": "surat",
                "capacity": 500,
                "registrations": [],
                "created_at": "2025-07-15T11:21:36.576Z",
                "updated_at": "2025-07-15T11:21:36.576Z"
            },
            {
                "id": 5,
                "title": "react",
                "datetime": "2025-08-01T18:00:00.000Z",
                "location": "surat",
                "capacity": 500,
                "registrations": [],
                "created_at": "2025-07-15T11:22:44.921Z",
                "updated_at": "2025-07-15T11:22:44.921Z"
            },
            {
                "id": 3,
                "title": "hi",
                "datetime": "2025-08-01T18:00:00.000Z",
                "location": "surat",
                "capacity": 500,
                "registrations": [],
                "created_at": "2025-07-15T11:16:31.230Z",
                "updated_at": "2025-07-15T11:16:31.230Z"
            },
            {
                "id": 7,
                "title": "react-data-new",
                "datetime": "2025-08-01T18:00:00.000Z",
                "location": "zankhvav",
                "capacity": 1000,
                "registrations": [
                    1,
                    2
                ],
                "created_at": "2025-07-15T13:02:41.599Z",
                "updated_at": "2025-07-15T14:21:30.030Z"
            },
            {
                "id": 9,
                "title": "clg",
                "datetime": "2025-08-02T18:00:00.000Z",
                "location": "assam",
                "capacity": 1000,
                "registrations": [],
                "created_at": "2025-07-15T13:44:46.289Z",
                "updated_at": "2025-07-15T13:44:46.289Z"
            },
            {
                "id": 15,
                "title": "clg",
                "datetime": "2025-09-02T18:00:00.000Z",
                "location": "mumbai",
                "capacity": 100,
                "registrations": [
                    3,
                    5,
                    6
                ],
                "created_at": "2025-07-15T15:01:37.666Z",
                "updated_at": "2025-07-15T16:21:48.117Z"
            },
            {
                "id": 18,
                "title": "clg",
                "datetime": "2025-09-02T18:00:00.000Z",
                "location": "mumbai",
                "capacity": 1000,
                "registrations": [],
                "created_at": "2025-07-15T15:06:38.834Z",
                "updated_at": "2025-07-15T15:06:38.834Z"
            },
            {
                "id": 19,
                "title": "clg",
                "datetime": "2025-09-02T18:00:00.000Z",
                "location": "mumbai",
                "capacity": 1000,
                "registrations": [],
                "created_at": "2025-07-15T15:19:01.205Z",
                "updated_at": "2025-07-15T15:22:20.058Z"
            },
            {
                "id": 17,
                "title": "clg",
                "datetime": "2025-09-02T18:00:00.000Z",
                "location": "mumbai",
                "capacity": 1000,
                "registrations": [],
                "created_at": "2025-07-15T15:06:05.856Z",
                "updated_at": "2025-07-15T15:06:05.856Z"
            },
            {
                "id": 14,
                "title": "clg",
                "datetime": "2025-09-02T18:00:00.000Z",
                "location": "pune",
                "capacity": 1,
                "registrations": [
                    1
                ],
                "created_at": "2025-07-15T14:05:30.727Z",
                "updated_at": "2025-07-15T14:05:36.016Z"
            },
            {
                "id": 13,
                "title": "clg",
                "datetime": "2025-09-02T18:00:00.000Z",
                "location": "pune",
                "capacity": 2,
                "registrations": [
                    1
                ],
                "created_at": "2025-07-15T14:05:12.791Z",
                "updated_at": "2025-07-15T14:05:20.812Z"
            }
        ]
    },
    "message": "success",
    "success": true
}
  </pre>
  <h3>6. Cancel Registration</h3>
  <p><strong>POST /events/:id/cancel</strong></p>
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/np3hy12/cancel-registration-from-event" target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/np3hy12/cancel-registration-from-event</a>
  <p>Cancel a user’s registration.</p>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td>userId</td><td>number</td><td>ID of the user</td></tr>
  </table>
  <p>Note: Returns error if user was never registered.</p>
  <pre>
    {
    "statusCode": 200,
    "data": {
        "message": "User cancel registration from event successfully",
        "event": {
            "id": 15,
            "title": "clg",
            "datetime": "2025-09-02T18:00:00.000Z",
            "location": "mumbai",
            "capacity": 100,
            "registrations": [
                3,
                5
            ],
            "created_at": "2025-07-15T15:01:37.666Z",
            "updated_at": "2025-07-15T16:22:49.406Z"
        }
    },
    "message": "success",
    "success": true
}
  </pre>
  <h3>7. Get Event Stats</h3>
  <p><strong>GET /events/:id/stats</strong></p>
  <a href="https://www.postman.com/lively-desert-712000/my-workspace/request/wvqswxa/event-stats" target="_blank">https://www.postman.com/lively-desert-712000/my-workspace/request/wvqswxa/event-stats</a>
  <p>Get number of users registered and available capacity.</p>
  <pre>
    {
    "statusCode": 200,
    "data": {
        "message": "data fetch",
        "capacity": 100,
        "Totall_Registrations": 2,
        "Percentage_Used": 2
    },
    "message": "success",
    "success": true
}
  </pre>
  <h2>Made By</h2>
  <p>Tatsam Vasava<br />
  <a href="https://github.com/sezerz1121" target="_blank">GitHub</a></p>

</body>
</html>
