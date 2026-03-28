export interface Login {
  Email: string;
  Password: string;
}

export interface Register {
  Email: string;
  Password: string;
}

export interface GuestReview {
  reviewerName: string;
  rating: number; 
  comment: string;
  date?: Date; 
}

export interface Properties {
  MDPID: string;
  image: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
  name: string;
  rating: number;
  reviews: number; 
  guestReviews?: GuestReview[]; 
  shortDescription: string;
  longDescription: string;
  originalPrice?: number | null;
  currentPrice: number;
  roomDays: string;
  discount?: string | null;
  bookingOffer?: string | null;
  address: string;
  overview: string;
  country: string;

  exploreArea?: {
    place: string;
    distance: string;
  }[];

  topFacilities?: string[];
  tags?: string[];
  activities?: string[];
  highlights?: string[];
  propertyType?: string;
  sortTag?: string;
  rooms?: {
    title: string;
    size: string;
    sleeps: string;
    beds: string;
    availabilityDates: {
      from: string;
      to: string;
    };
    guests: string;
    promoCode?: string;
    discount?: string;
  }[];
}

export interface Booking {
  username: string;
  phone: string;
  propertyName: string;
  rating: number;
  reviews: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number;
  originalPrice: number;
  image: string;
}
export interface PaymentIntent {
  clientSecret: string;
}

export interface PasswordResetRequest {
  email: string;
}