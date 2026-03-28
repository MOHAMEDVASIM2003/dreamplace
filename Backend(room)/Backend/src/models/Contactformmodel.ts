import mongoose, { Document, Schema } from "mongoose";
import { Login, Register, Properties, GuestReview,Booking,PasswordResetRequest } from "../../src/dtos/Contactdtos"; // Make sure to import GuestReview


const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterModel = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);


interface LoginDoc extends Login, Document {}

const LoginSchema = new Schema<LoginDoc>(
  {
    Email: { type: String, required: true, trim: true, lowercase: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

export const LoginModel = mongoose.models.Login || mongoose.model<LoginDoc>("Login", LoginSchema);


interface RegisterDoc extends Register, Document {}

const RegisterSchema = new Schema<RegisterDoc>(
  {
    Email: { type: String, required: true, trim: true, lowercase: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

export const RegisterModel = mongoose.models.Register || mongoose.model<RegisterDoc>("Register", RegisterSchema);


const GuestReviewSchema = new Schema<GuestReview>(
  {
    reviewerName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false } 
);


interface PropertiesDoc extends Omit<Properties, "id">, Document {
  _id: mongoose.Types.ObjectId;
}

const PropertiesSchema = new Schema<PropertiesDoc>(
  {
    MDPID: { type: String, unique: true },
    image: { type: String },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    image5: { type: String },
    image6: { type: String },
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    guestReviews: [GuestReviewSchema],
    shortDescription: { type: String, trim: true },
    longDescription: { type: String, trim: true },
    originalPrice: { type: Number },
    currentPrice: { type: Number, required: true },
    roomDays: { type: String, trim: true },
    discount: { type: String, trim: true },
    bookingOffer: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    exploreArea: [
      {
        place: { type: String, trim: true },
        distance: { type: String, trim: true },
      },
    ],
    topFacilities: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    activities: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
    propertyType: { type: String, trim: true },
    sortTag: { type: String, trim: true },
    rooms: [
      {
        title: { type: String, trim: true },
        size: { type: String, trim: true },
        sleeps: { type: String, trim: true },
        beds: { type: String, trim: true },
        availabilityDates: {
          from: { type: String, trim: true },
          to: { type: String, trim: true },
        },
        guests: { type: String, trim: true },
        promoCode: { type: String, trim: true },
        discount: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);


PropertiesSchema.pre("save", async function (next) {
  const doc = this as PropertiesDoc;

  if (!doc.MDPID) {
    try {
      const counter = await CounterModel.findByIdAndUpdate(
        { _id: "property" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      doc.MDPID = `MDP${counter.seq.toString().padStart(2, "0")}`;
      next();
    } catch (err) {
      return next(err instanceof Error ? err : new Error(String(err)));
    }
  } else {
    next();
  }
});

export const PropertiesModel =
  mongoose.models.Properties || mongoose.model<PropertiesDoc>("Properties", PropertiesSchema);

  interface BookingDoc extends Booking, Document {}

const BookingSchema = new Schema<BookingDoc>(
  {
    username: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    propertyName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    nights: { type: Number, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.models.Booking || mongoose.model<BookingDoc>("Booking", BookingSchema);

interface PasswordResetTokenDoc extends Document {
  email: string;
  token: string;
  expires: Date;
}

const PasswordResetTokenSchema = new Schema<PasswordResetTokenDoc>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

export const PasswordResetTokenModel = mongoose.models.PasswordResetToken || mongoose.model<PasswordResetTokenDoc>("PasswordResetToken", PasswordResetTokenSchema);