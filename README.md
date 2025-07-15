# EventManagementApi
Event Management API
This is a simple API to create events, register users, and manage event registrations.

You can test all the API requests using Postman:
Postman Documentation: EventManagementApi

Base URL
arduino
Copy
Edit
https://event-management-api-five.vercel.app
Endpoints
1. Create Event
POST /events/createEvent

Use this to create a new event.

Request (x-www-form-urlencoded):
Field	Type	Description
title	string	Name of the event
datetime	string	Date and time (in ISO format)
location	string	Where the event will happen
capacity	number	Maximum number of people allowed

Example Response:
json
Copy
Edit
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
2. Get Single Event
GET /events/:id

Use this to get details of one event by its ID.

Example:

bash
Copy
Edit
GET /events/13
3. Register a User
POST /user/createUser

Use this to create a new user.

Request:
Field	Type	Description
name	string	Name of the user
email	string	Email address

4. Register a User for an Event
POST /events/:id/register

Use this to register a user to an event.

Request:
Field	Type	Description
userId	number	ID of the user

Note:

A user can't register twice for the same event.

If the event is full, it won’t allow more registrations.

5. Get Upcoming Events
GET /events/upcoming

This gives a list of all upcoming events.

6. Cancel Registration
POST /events/:id/cancel

Use this to cancel a user’s registration from an event.

Request:
Field	Type	Description
userId	number	ID of the user

Note:

If the user was not registered, it will return an error.

7. Get Event Stats
GET /events/:id/stats

Gives information like:

How many users registered

How many spots are left

Made by
Tatsam Vasava
GitHub

