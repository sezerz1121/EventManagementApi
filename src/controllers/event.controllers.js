import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { insertEvent,getSingleEvent,registerUserForEvent,getAllEvents,cancelRegistration, getUpcomingEvents, getCapacity, getRegistrations} from "../models/event.models.js";
import { getSingleUser } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getPool from "../db/pool.js";

const pool = await getPool();

const createEvent = asyncHandler(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new ApiError(400, "No form data received");
  }

  const inserted = await insertEvent(pool, {
    title: data.title,
    datetime: data.datetime,
    location: data.location,
    capacity: data.capacity
  });

  if (inserted) {
    return res.status(200).json(
        new ApiResponse(200, {
            message: "Created event successfully",
            event: inserted
        })
        );
  }

  throw new ApiError(500, "Event creation failed");
});


const getSingleEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "No ID received");
  }

  const event = await getSingleEvent(pool, { eventId: id });

  if (event) {
    return res.status(200).json(
      new ApiResponse(200, {
        message: "Found the event successfully",
        event: event
      })
    );
  }

  throw new ApiError(404, "Event not able found");
});

const registerForEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;       
  const { userId } = req.body;     

  if (!id) {
    throw new ApiError(400, "No event ID received");
  }

  if (!userId) {
    throw new ApiError(400, "No user ID received");
  }

  const event = await getSingleEvent(pool, { eventId: id });
  if (!event || event.length === 0) {
    throw new ApiError(404, "Event not found");
  }

  const user = await getSingleUser(pool, { userId }); 
  if (!user || user.length === 0) {
    throw new ApiError(404, "User not found");
  }
  const eventId=id;

  const RegisterNewUserForEvent = await registerUserForEvent(pool, { eventId: parseInt(eventId), userId: parseInt(userId) });


  if (RegisterNewUserForEvent) {
    return res.status(200).json(
      new ApiResponse(200, {
        message: "User registered for event successfully",
        event: RegisterNewUserForEvent,
      })
    );
  }

  throw new ApiError(
    500,
    "New User registration failed"
  );
});

const cancelingTheRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params;       
  const { userId } = req.body;     

  if (!id) {
    throw new ApiError(400, "No event ID received");
  }

  if (!userId) {
    throw new ApiError(400, "No user ID received");
  }

  const event = await getSingleEvent(pool, { eventId: id });
  if (!event || event.length === 0) {
    throw new ApiError(404, "Event not found");
  }

  const user = await getSingleUser(pool, { userId }); 
  if (!user || user.length === 0) {
    throw new ApiError(404, "User not found");
  }
  const eventId=id;

  const RegisterNewUserForEvent = await cancelRegistration(pool, { eventId: parseInt(eventId), userId: parseInt(userId) });


  if (RegisterNewUserForEvent) {
    return res.status(200).json(
      new ApiResponse(200, {
        message: "User cancel registration from event successfully",
        event: RegisterNewUserForEvent,
      })
    );
  }

  throw new ApiError(
    500,
    "User failed to cancel registration"
  );
});



const UpcomingEvents = asyncHandler(async(req,res)=>{
    const allEvent =await getAllEvents(pool);
    if (!allEvent || allEvent.length === 0) {
    throw new ApiError(404, "events not found");
    }

    const getupEvents = await getUpcomingEvents(pool);

    if (getupEvents) {
        return res.status(200).json(
        new ApiResponse(200, {
            message: "All upcoming event found successfully",
            event: getupEvents,
        })
        );
    }

  throw new ApiError(
    500,
    "Failed to get upcoming events"
  );

});


const eventStats = asyncHandler(async (req,res)=>{

    const { id } = req.params;  
  if (!id) {
    throw new ApiError(400, "No event ID received");
  }

 
  const event = await getSingleEvent(pool, { eventId: id });
  if (!event || event.length === 0) {
    throw new ApiError(404, "Event not found");
  }

  const capacity = await getCapacity(pool,{id})
  const regisrations = await getRegistrations(pool,{id})

  console.log("capacity",capacity)
  console.log("regisrations",regisrations[0].registrations.length)

  const FinallCapacity = capacity.capacity;
  const FinallRegisrations = regisrations[0].registrations.length;
  const percentageUsed = (FinallRegisrations / FinallCapacity) * 100;

  if(capacity && regisrations)
  {
   return res.status(200).json(
        new ApiResponse(200, {
            message: "data fetch",
            capacity:FinallCapacity,
            Totall_Registrations:FinallRegisrations,
            Percentage_Used :percentageUsed
        })
        );
    }

  throw new ApiError(
    500,
    "Failed to get event stats"
  );

})

export { 
    createEvent,
    getSingleEventById,
    registerForEvent,
    UpcomingEvents,
    cancelingTheRegistration,
    eventStats
 };
