import { Router } from "express";
import { createEvent , getSingleEventById,registerForEvent,UpcomingEvents,cancelingTheRegistration,eventStats} from "../controllers/event.controllers.js"

const router = Router();

router.route("/createEvent").post(createEvent);
router.route("/upcoming").get(UpcomingEvents);
router.route("/Events/:id").get(getSingleEventById);
router.route("/Events/:id/register").post(registerForEvent);
router.route("/Events/:id/cancel").post(cancelingTheRegistration);
router.route("/Events/:id/stats").get(eventStats);

export default router;