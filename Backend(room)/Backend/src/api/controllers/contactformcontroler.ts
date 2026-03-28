import { Request, Response } from "express";
import { Login, Register, Properties, PaymentIntent ,Booking,PasswordResetRequest} from "../../dtos/Contactdtos";
import {
  CreateLogin,
  GetLogins,
  CreateRegister,
  GetRegisters,
  CreateProperty,
  GetProperties,
  CreatePaymentIntent,
  CreateBooking,
  GetBookings,
  InitiatePasswordReset,
  ResetPassword,
} from "../../services/ContactServices";



export const createLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const login = req.body as Login;
    const newLogin = await CreateLogin(login);
    res.status(201).json(newLogin);
  } catch (error) {
    res.status(500).json({ message: "Error creating login", error });
  }
};

export const getLogins = async (req: Request, res: Response): Promise<void> => {
  try {
    const logins = await GetLogins();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logins", error });
  }
};



export const createRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const register = req.body as Register;
    const newRegister = await CreateRegister(register);
    res.status(201).json(newRegister);
  } catch (error) {
    res.status(500).json({ message: "Error creating register", error });
  }
};

export const getRegisters = async (req: Request, res: Response): Promise<void> => {
  try {
    const registers = await GetRegisters();
    res.status(200).json(registers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registers", error });
  }
};



export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = req.body as Properties;
    const newProperty = await CreateProperty(property);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
};

export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await GetProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, currency } = req.body;
    if (!amount || !currency) {
      res.status(400).json({ message: "Amount and currency are required" });
      return; // Early exit without returning a value
    }
    const paymentIntent = await CreatePaymentIntent(amount, currency);
    res.status(201).json(paymentIntent);
  } catch (error: unknown) {
    console.error("Payment Intent Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Error creating payment intent", error: errorMessage });
  }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { booking, receiveAlerts, email } = req.body;
    if (!booking || !email) {
      res.status(400).json({ message: "Booking details and email are required" });
      return;
    }
    const newBooking = await CreateBooking(booking, receiveAlerts, email);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.query;
    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Username is required" });
      return;
    }
    const bookings = await GetBookings(username);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export const initiatePasswordReset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as PasswordResetRequest;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    const result = await InitiatePasswordReset(email);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Error initiating password reset", error: errorMessage });
  }
};

// New controller for resetting password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      res.status(400).json({ message: "Token and new password are required" });
      return;
    }
    const result = await ResetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Error resetting password", error: errorMessage });
  }
};