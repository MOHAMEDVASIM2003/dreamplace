import { PropertiesModel, BookingModel } from "../models/Contactformmodel";

const sampleProperties = [
  {
    name: "Sydney Harbour View Suite",
    country: "Australia",
    address: "123 Circular Quay, Sydney NSW 2000, Australia",
    overview:
      "A stunning suite overlooking the iconic Sydney Harbour Bridge and Opera House. Steps away from world-class dining, shopping, and entertainment.",
    shortDescription:
      "Luxury suite with spectacular harbour views in the heart of Sydney.",
    longDescription:
      "Experience the magic of Sydney from this exquisite harbour-view suite. Watch the sunrise over the Opera House each morning, enjoy fine dining at nearby restaurants, and explore the vibrant Rocks district just outside your door. The suite features floor-to-ceiling windows, a private balcony, a king-size bed, and a marble bathroom with a soaking tub.",
    rating: 4.8,
    reviews: 124,
    currentPrice: 320,
    originalPrice: 450,
    roomDays: "per night",
    discount: "29% OFF",
    bookingOffer: "Free breakfast included",
    propertyType: "Hotel and apartments",
    sortTag: "Top Pick",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    image1:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&auto=format&fit=crop",
    image4:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop",
    image5:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop",
    image6:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
    topFacilities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym", "Parking"],
    tags: ["luxury", "ocean view", "city center", "harbour"],
    activities: ["Beach", "Hiking", "Cycling"],
    highlights: [
      "Harbour Bridge view",
      "5-min walk to Opera House",
      "24h concierge",
    ],
    exploreArea: [
      { place: "Sydney Opera House", distance: "0.5 km" },
      { place: "Harbour Bridge", distance: "1.2 km" },
      { place: "Darling Harbour", distance: "2.0 km" },
    ],
    rooms: [
      {
        title: "Harbour View King Suite",
        size: "65 m²",
        sleeps: "2 adults",
        beds: "1 King Bed",
        availabilityDates: { from: "2025-01-01", to: "2026-12-31" },
        guests: "2",
        discount: "10%",
      },
    ],
    guestReviews: [
      {
        reviewerName: "Emily R.",
        rating: 5,
        comment:
          "Absolutely breathtaking views. The staff were incredibly attentive.",
        date: new Date("2024-11-12"),
      },
      {
        reviewerName: "James T.",
        rating: 4,
        comment: "Amazing location, very comfortable beds. Will return!",
        date: new Date("2024-10-05"),
      },
    ],
  },
  {
    name: "Tokyo Zen Garden Retreat",
    country: "Japan",
    address: "4-2-8 Shinjuku, Shinjuku-ku, Tokyo 160-0022, Japan",
    overview:
      "A serene retreat in the heart of Tokyo, blending traditional Japanese architecture with modern luxury. Features a private zen garden and onsen.",
    shortDescription:
      "Traditional Japanese inn with private zen garden and onsen in central Tokyo.",
    longDescription:
      "Escape the bustle of Tokyo in this tranquil ryokan-inspired retreat. Your private villa comes with a traditional tatami room, a cedar-wood onsen bath, and a meticulously maintained zen garden. Enjoy kaiseki breakfast each morning and explore Shinjuku's neon-lit streets just minutes away.",
    rating: 4.9,
    reviews: 89,
    currentPrice: 480,
    originalPrice: 600,
    roomDays: "per night",
    discount: "20% OFF",
    bookingOffer: "Kaiseki dinner for two",
    propertyType: "Resort",
    sortTag: "Top Pick",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop",
    image1:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&auto=format&fit=crop",
    image4:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
    image5:
      "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=800&auto=format&fit=crop",
    image6:
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop",
    topFacilities: [
      "Onsen",
      "Free WiFi",
      "Garden",
      "Restaurant",
      "Concierge",
      "Airport Transfer",
    ],
    tags: ["traditional", "zen", "luxury", "onsen", "cultural"],
    activities: ["Hiking", "Sauna", "Night lights"],
    highlights: [
      "Private zen garden",
      "Cedar-wood onsen",
      "Kaiseki breakfast",
    ],
    exploreArea: [
      { place: "Shinjuku Gyoen Park", distance: "0.8 km" },
      { place: "Meiji Shrine", distance: "3.5 km" },
      { place: "Shibuya Crossing", distance: "4.0 km" },
    ],
    rooms: [
      {
        title: "Tatami Zen Suite",
        size: "55 m²",
        sleeps: "2 adults",
        beds: "2 Futon Beds",
        availabilityDates: { from: "2025-01-01", to: "2026-12-31" },
        guests: "2",
        discount: "15%",
      },
    ],
    guestReviews: [
      {
        reviewerName: "Sophie L.",
        rating: 5,
        comment:
          "The most peaceful experience I've ever had. The onsen at night was magical.",
        date: new Date("2024-12-01"),
      },
    ],
  },
  {
    name: "Santorini Clifftop Villa",
    country: "Greece",
    address: "Oia, Santorini 847 02, Greece",
    overview:
      "Perched on the volcanic cliffs of Oia, this iconic white-washed villa offers unobstructed views of the Aegean Sea and the famous Santorini caldera.",
    shortDescription:
      "Iconic white-washed villa with infinity pool and caldera views in Oia.",
    longDescription:
      "Live the Santorini dream in this breathtaking clifftop villa. Watch the world-famous Oia sunset from your private infinity pool, explore cave-like bedrooms carved into the volcanic rock, and stroll to boutique galleries and gourmet restaurants along the cobblestone lanes.",
    rating: 4.9,
    reviews: 203,
    currentPrice: 650,
    originalPrice: 850,
    roomDays: "per night",
    discount: "24% OFF",
    bookingOffer: "Complimentary wine on arrival",
    propertyType: "Residence",
    sortTag: "Top Pick",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop",
    image1:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&auto=format&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&auto=format&fit=crop",
    image4:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop",
    image5:
      "https://images.unsplash.com/photo-1568827999250-2c06d5ad0db6?w=800&auto=format&fit=crop",
    image6:
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&auto=format&fit=crop",
    topFacilities: [
      "Infinity Pool",
      "Free WiFi",
      "Concierge",
      "Breakfast",
      "Terrace",
      "Air Conditioning",
    ],
    tags: ["luxury", "sea view", "romantic", "caldera", "sunset"],
    activities: ["Beach", "Cycling", "Fishing"],
    highlights: [
      "Private infinity pool",
      "Caldera views",
      "Carved cave bedrooms",
    ],
    exploreArea: [
      { place: "Oia Castle", distance: "0.3 km" },
      { place: "Amoudi Bay", distance: "1.5 km" },
      { place: "Fira Town", distance: "12.0 km" },
    ],
    rooms: [
      {
        title: "Caldera Cave Suite",
        size: "70 m²",
        sleeps: "2 adults",
        beds: "1 King Bed",
        availabilityDates: { from: "2025-01-01", to: "2026-12-31" },
        guests: "2",
        promoCode: "SUMMER20",
        discount: "20%",
      },
    ],
    guestReviews: [
      {
        reviewerName: "Marco V.",
        rating: 5,
        comment:
          "The sunset from the infinity pool was life-changing. Truly unforgettable.",
        date: new Date("2024-09-20"),
      },
      {
        reviewerName: "Aisha K.",
        rating: 5,
        comment: "Perfect for a honeymoon. Staff arranged everything for us.",
        date: new Date("2024-08-15"),
      },
    ],
  },
  {
    name: "Queenstown Lake Alpine Lodge",
    country: "New Zealand",
    address: "12 Marine Parade, Queenstown 9300, New Zealand",
    overview:
      "A luxury alpine lodge on the shores of Lake Wakatipu with direct views of the Remarkables mountain range. The adventure capital of the world at your doorstep.",
    shortDescription:
      "Alpine lodge on Lake Wakatipu with mountain views in the adventure capital of the world.",
    longDescription:
      "Nestled on the shores of the crystal-clear Lake Wakatipu, this lodge is your base for world-class adventure. Bungee jump, skydive, jet boat, or simply relax in the outdoor hot tub while watching alpenglow paint the Remarkables. The lodge features locally crafted timber interiors, a roaring fireplace, and gourmet New Zealand cuisine.",
    rating: 4.7,
    reviews: 156,
    currentPrice: 290,
    originalPrice: 390,
    roomDays: "per night",
    discount: "26% OFF",
    bookingOffer: "Free adventure activity voucher",
    propertyType: "Resort",
    sortTag: "Top Pick",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop",
    image1:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&auto=format&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    image4:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop",
    image5:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop",
    image6:
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800&auto=format&fit=crop",
    topFacilities: [
      "Hot Tub",
      "Free WiFi",
      "Fireplace",
      "Restaurant",
      "Ski Storage",
      "Parking",
    ],
    tags: ["adventure", "mountain view", "lake", "alpine", "skiing"],
    activities: ["Hiking", "Fishing", "Cycling"],
    highlights: [
      "Lake Wakatipu access",
      "Remarkables mountain view",
      "Adventure activity voucher",
    ],
    exploreArea: [
      { place: "Queenstown Gondola", distance: "1.0 km" },
      { place: "Skyline Luge", distance: "1.2 km" },
      { place: "Bungy Jump Site", distance: "2.5 km" },
    ],
    rooms: [
      {
        title: "Lake View Deluxe Room",
        size: "45 m²",
        sleeps: "2 adults",
        beds: "1 Queen Bed",
        availabilityDates: { from: "2025-01-01", to: "2026-12-31" },
        guests: "2",
        discount: "10%",
      },
    ],
    guestReviews: [
      {
        reviewerName: "Liam O.",
        rating: 5,
        comment:
          "Woke up to the most incredible mountain view every morning. Staff were brilliant.",
        date: new Date("2024-07-10"),
      },
    ],
  },
  {
    name: "Melbourne Laneways Boutique Hotel",
    country: "Australia",
    address: "47 Flinders Lane, Melbourne VIC 3000, Australia",
    overview:
      "A stylish boutique hotel hidden in Melbourne's famous laneways precinct. Surrounded by street art, specialty coffee, and award-winning restaurants.",
    shortDescription:
      "Designer boutique hotel in Melbourne's vibrant laneways with world-class dining nearby.",
    longDescription:
      "Melbourne's famous laneway culture comes alive at this design-forward boutique hotel. Each room is individually styled by a local artist, the rooftop bar overlooks the CBD skyline, and the hotel's own restaurant was awarded a hat in the most recent Good Food Guide. Explore Federation Square, the MCG, and the Queen Victoria Market all within walking distance.",
    rating: 4.6,
    reviews: 98,
    currentPrice: 210,
    originalPrice: 280,
    roomDays: "per night",
    discount: "25% OFF",
    bookingOffer: "Late checkout until 2pm",
    propertyType: "Hotel and apartments",
    sortTag: "Best Value",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
    image1:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop",
    image4:
      "https://images.unsplash.com/photo-1603289847962-c5e2b2fd9afa?w=800&auto=format&fit=crop",
    image5:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop",
    image6:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop",
    topFacilities: [
      "Rooftop Bar",
      "Free WiFi",
      "Restaurant",
      "Gym",
      "Concierge",
      "Bike Rental",
    ],
    tags: ["boutique", "art", "city", "food", "culture"],
    activities: ["Cycling", "Night lights"],
    highlights: [
      "Artist-designed rooms",
      "Rooftop bar with CBD views",
      "Award-winning restaurant",
    ],
    exploreArea: [
      { place: "Federation Square", distance: "0.4 km" },
      { place: "Queen Victoria Market", distance: "1.8 km" },
      { place: "MCG", distance: "2.2 km" },
    ],
    rooms: [
      {
        title: "Artist Loft Room",
        size: "38 m²",
        sleeps: "2 adults",
        beds: "1 King Bed",
        availabilityDates: { from: "2025-01-01", to: "2026-12-31" },
        guests: "2",
        discount: "5%",
      },
    ],
    guestReviews: [
      {
        reviewerName: "Priya S.",
        rating: 5,
        comment:
          "Every corner of this hotel is Instagram-worthy. Loved the rooftop bar.",
        date: new Date("2024-11-28"),
      },
    ],
  },
  {
    name: "Kyoto Bamboo Forest Ryokan",
    country: "Japan",
    address: "45 Sagatenryuji, Ukyo-ku, Kyoto 616-8385, Japan",
    overview:
      "An authentic Meiji-era ryokan at the edge of the Arashiyama bamboo grove. Experience true Japanese hospitality with tatami rooms, yukata robes, and traditional multi-course dinners.",
    shortDescription:
      "Authentic Meiji-era ryokan at the edge of Arashiyama's bamboo forest in Kyoto.",
    longDescription:
      "Step back in time at this beautifully preserved Meiji-era ryokan. Located at the gateway to the iconic Arashiyama bamboo grove, you can walk the forest path before the tourist crowds arrive each morning. Evenings are spent in yukata robes, soaking in the communal hinoki-wood bath, and enjoying a 10-course kaiseki dinner in your private tatami room.",
    rating: 4.8,
    reviews: 172,
    currentPrice: 380,
    originalPrice: 500,
    roomDays: "per night",
    discount: "24% OFF",
    bookingOffer: "10-course kaiseki dinner included",
    propertyType: "Resort",
    sortTag: "Top Pick",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
    image1:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&auto=format&fit=crop",
    image4:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop",
    image5:
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop",
    image6:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    topFacilities: [
      "Hinoki Onsen",
      "Free WiFi",
      "Garden",
      "Kaiseki Dining",
      "Yukata",
      "Tea Ceremony",
    ],
    tags: ["traditional", "bamboo", "nature", "cultural", "romantic"],
    activities: ["Hiking", "Sauna", "Night lights"],
    highlights: [
      "Bamboo grove at the doorstep",
      "Meiji-era architecture",
      "Private kaiseki dinner",
    ],
    exploreArea: [
      { place: "Arashiyama Bamboo Grove", distance: "0.1 km" },
      { place: "Tenryu-ji Temple", distance: "0.4 km" },
      { place: "Monkey Park", distance: "1.5 km" },
    ],
    rooms: [
      {
        title: "Bamboo View Tatami Suite",
        size: "50 m²",
        sleeps: "2 adults",
        beds: "2 Futon Beds",
        availabilityDates: { from: "2025-01-01", to: "2026-12-31" },
        guests: "2",
        discount: "20%",
      },
    ],
    guestReviews: [
      {
        reviewerName: "Claire M.",
        rating: 5,
        comment:
          "Walked the bamboo grove at 6am with nobody else around. Pure magic.",
        date: new Date("2024-10-15"),
      },
      {
        reviewerName: "Daniel W.",
        rating: 5,
        comment: "The kaiseki dinner was the best meal of my entire trip to Japan.",
        date: new Date("2024-09-30"),
      },
    ],
  },
];

const sampleBookings = [
  {
    username: "guest",
    phone: "+61 412 345 678",
    propertyName: "Sydney Harbour View Suite",
    rating: 4.8,
    reviews: 124,
    checkIn: "2025-08-10",
    checkOut: "2025-08-14",
    nights: 4,
    price: 1280,
    originalPrice: 1800,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
  },
  {
    username: "guest",
    phone: "+61 412 345 678",
    propertyName: "Santorini Clifftop Villa",
    rating: 4.9,
    reviews: 203,
    checkIn: "2025-10-05",
    checkOut: "2025-10-10",
    nights: 5,
    price: 3250,
    originalPrice: 4250,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop",
  },
];

export const seedDatabase = async (): Promise<void> => {
  try {
    const propertyCount = await PropertiesModel.countDocuments();

    if (propertyCount > 0) {
      console.log(`Seed skipped: ${propertyCount} properties already in DB.`);
      return;
    }

    console.log("Seeding database with sample data...");

    // Use create() one-by-one so the pre-save MDPID hook runs on each document
    for (const property of sampleProperties) {
      await PropertiesModel.create(property);
    }
    console.log(`✓ Inserted ${sampleProperties.length} properties.`);

    for (const booking of sampleBookings) {
      await BookingModel.create(booking);
    }
    console.log(`✓ Inserted ${sampleBookings.length} bookings.`);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Seed error:", error);
  }
};
