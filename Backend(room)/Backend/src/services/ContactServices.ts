import { Login, Register, Properties, PaymentIntent, Booking ,PasswordResetRequest} from "../../src/dtos/Contactdtos";
import { LoginModel, RegisterModel, PropertiesModel, BookingModel,PasswordResetTokenModel } from "../models/Contactformmodel";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-05-28.basil" });

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
if (!emailUser || !emailPass) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});


export const CreateLogin = async (login: Login) => {
  const loginModel = await LoginModel.create(login);
  return loginModel;
};

export const GetLogins = async () => {
  const logins = await LoginModel.find();
  return logins;
};


export const CreateRegister = async (register: Register) => {
  const registerModel = await RegisterModel.create(register);
  return registerModel;
};

export const GetRegisters = async () => {
  const registers = await RegisterModel.find();
  return registers;
};


export const GetProperties = async () => {
  const properties = await PropertiesModel.find();
  return properties;
};

export const CreateProperty = async (property: Properties) => {
  const newProperty = await PropertiesModel.create(property);
  return newProperty;
};

export const GetPropertyById = async (id: string) => {
  const property = await PropertiesModel.findById(id);
  return property;
};

export const DeleteProperty = async (id: string) => {
  const result = await PropertiesModel.findByIdAndDelete(id);
  return result;
};

export const UpdateProperty = async (id: string, updateData: Partial<Properties>) => {
  const updated = await PropertiesModel.findByIdAndUpdate(id, updateData, { new: true });
  return updated;
};


export const CreateBooking = async (booking: Booking, receiveAlerts: boolean, email: string) => {
  const newBooking = await BookingModel.create(booking);
  if (receiveAlerts) {
    await sendBookingEmail(booking, email);
  }
  return newBooking;
};

export const GetBookings = async (username: string) => {
  const bookings = await BookingModel.find({ username });
  return bookings;
};


export const sendBookingEmail = async (booking: Booking, email: string) => {
  try {
    const mailOptions = {
      from: 'suseendrakumar2003@gmail.com',
      to: email,
      subject: "Your Booking Confirmation",
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${booking.username},</p>
        <p>Thank you for your booking! Here are the details:</p>
        <ul>
          <li><strong>Property:</strong> ${booking.propertyName}</li>
          <li><strong>Check-in:</strong> ${booking.checkIn}</li>
          <li><strong>Check-out:</strong> ${booking.checkOut}</li>
          <li><strong>Nights:</strong> ${booking.nights}</li>
          <li><strong>Total Price:</strong> $${booking.price}</li>
          <li><strong>Original Price:</strong> $${booking.originalPrice}</li>
          <li><strong>Contact Phone:</strong> ${booking.phone}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,<br>Your Booking Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Booking email sent to", email, "Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending booking email:", error);
    
  }
};


export const CreatePaymentIntent = async (amount: number, currency: string): Promise<PaymentIntent> => {
  try {
    if (!amount || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
    });
    console.log("Payment Intent Created:", paymentIntent);
    return { clientSecret: paymentIntent.client_secret! };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw error instanceof Error ? error : new Error("Failed to create payment intent");
  }
};

export const InitiatePasswordReset = async (email: string) => {
  try {
    const user = await RegisterModel.findOne({ Email: email.toLowerCase() });
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); 

    await PasswordResetTokenModel.create({
      email: email.toLowerCase(),
      token,
      expires,
    });

    await sendPasswordResetEmail(email, token);
    return { message: "Password reset email sent" };
  } catch (error) {
    console.error("Error initiating password reset:", error);
    throw error instanceof Error ? error : new Error("Failed to initiate password reset");
  }
};


export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const mailOptions = {
      from: 'suseendrakumar2003@gmail.com',
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Reset Your Password</h2>
        <p>Dear User,</p>
        <p>We received a request to reset your password for My Dream Place.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #2F80ED; color: #FFFFFF; text-decoration: none; border-radius: 6px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>My Dream Place Team</p>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent to", email, "Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// New function to reset password
export const ResetPassword = async (token: string, newPassword: string) => {
  try {
    const resetToken = await PasswordResetTokenModel.findOne({
      token,
      expires: { $gt: new Date() },
    });

    if (!resetToken) {
      throw new Error("Invalid or expired reset token");
    }

    const user = await RegisterModel.findOne({ Email: resetToken.email });
    if (!user) {
      throw new Error("User not found");
    }

    user.Password = newPassword;
    await user.save();

    await PasswordResetTokenModel.deleteOne({ token });

    return { message: "Password reset successfully" };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error instanceof Error ? error : new Error("Failed to reset password");
  }
};