import { Router } from "express";
import {
  createLogin,
  createRegister,
  createProperty,
  getLogins,
  getRegisters,
  getProperties,
  createPaymentIntent,
  createBooking,
  getBookings,
  initiatePasswordReset,
  resetPassword
} from "../controllers/contactformcontroler";

import { authorise } from "../middleware/auth.middleware";


const router = Router();


router.post("/postlogin", createLogin);
router.post("/postregister", createRegister);
router.post("/postproperties", createProperty); 
router.post("/create-payment-intent", createPaymentIntent);
router.post("/postbooking", createBooking);
router.post("/forgot-password", initiatePasswordReset); // New route for initiating password reset
router.post("/reset-password", resetPassword);

router.get("/getlogins", authorise, getLogins);
router.get("/getregisters", authorise, getRegisters);
router.get("/getproperties", authorise, getProperties);
router.get("/getbookings", authorise, getBookings);


export default router;
