// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
// } from "@mui/material";

// import Syd from "../../assets/Syd.png";
// import Jap from "../../assets/Jap.png";
// import New from "../../assets/New.png";
// import Gre from "../../assets/Gre.png";
// import Lake from "../../assets/Lake.png";
// import Recce from "../../assets/Recce.png";
// import Fireside from "../../assets/Fireside.png";
// import Oculous from "../../assets/Oculous.png";
// import Mobile from "../../assets/Mobile.png";
// import Aus from "../../assets/Aus.png";
// import Top from "../../assets/Top.png";
// import World from "../../assets/World.png";

// const destinations = [
//   { name: "Australia", properties: "2246 properties", image: Syd, left: 100 },
//   { name: "Japan", properties: "1278 properties", image: Jap, left: 415 },
//   { name: "New Zealand", properties: "480 properties", image: New, left: 730 },
//   { name: "Greece", properties: "320 properties", image: Gre, left: 1045 },
// ];

// const popularHotels = [
//   {
//     name: "Lakeside Motel Warefront",
//     properties: "2246 properties",
//     image: Lake,
//     left: 100,
//   },
//   {
//     name: "Recce Graham resort",
//     properties: "1278 properties",
//     image: Recce,
//     left: 415,
//   },
//   {
//     name: "Fireside Dinners",
//     properties: "480 properties",
//     image: Fireside,
//     left: 730,
//   },
//   {
//     name: "Oculous Inn Stay",
//     properties: "320 properties",
//     image: Oculous,
//     left: 1045,
//   },
// ];

// const inspirationCards = [
//   {
//     title: "Sydeny’s 10 most fashionable 5 star hotels",
//     description:
//       "Browse the fastest growing tourism sector in the heart of Australia tourism capital ....",
//     image: Aus,
//     left: 100,
//   },
//   {
//     title: "Top cities for Vegan Travellers",
//     description:
//       "Top sites where you do not have to worry about being a vegan. Our tourist guide is here...",
//     image: Top,
//     left: 520,
//   },
//   {
//     title: "World’s top destinations during and post covid timeline",
//     description:
//       "Pandemic is still intact and will be here for a longer time. Here’s where your next destination...",
//     image: World,
//     left: 940,
//   },
// ];

// const HomeGallery = () => {
//   return (
//     <Box sx={{ position: "relative", width: "1440px", height: "2800px" }}>
//       <Typography
//         sx={{
//           position: "absolute",
//           width: 504,
//           height: 32,
//           left: 100,
//           top: 784,
//           fontFamily: "SF Pro Display",
//           fontWeight: 600,
//           fontSize: 28,
//           lineHeight: "33px",
//           color: "#181818",
//         }}
//       >
//         Enjoy your dream vacation
//       </Typography>

//       <Typography
//         sx={{
//           position: "absolute",
//           width: 610,
//           height: 44,
//           left: 100,
//           top: 832,
//           fontFamily: "SF Pro Display",
//           fontWeight: 400,
//           fontSize: 16,
//           lineHeight: "22px",
//           letterSpacing: "0.02em",
//           color: "#333333",
//         }}
//       >
//         Plan and book our perfect trip with expert advice, travel tips,
//         destination information and inspiration from us
//       </Typography>

//       {destinations.map((dest, idx) => (
//         <Box
//           key={idx}
//           sx={{
//             position: "absolute",
//             width: 295,
//             height: 220,
//             left: dest.left,
//             top: 906,
//             borderRadius: 2,
//             backgroundImage: `url(${dest.image})`,
//             backgroundSize: "cover",
//           }}
//         />
//       ))}

//       {destinations.map((dest, idx) => (
//         <Box
//           key={idx}
//           sx={{
//             position: "absolute",
//             width: 295,
//             height: 47,
//             left: dest.left,
//             top: 1140,
//             display: "flex",
//             flexDirection: "column",
//             gap: "6px",
//           }}
//         >
//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 600,
//               fontSize: 20,
//               lineHeight: "24px",
//               color: "#181818",
//             }}
//           >
//             {dest.name}
//           </Typography>
//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 400,
//               fontSize: 14,
//               lineHeight: "17px",
//               letterSpacing: "0.02em",
//               color: "#181818",
//             }}
//           >
//             {dest.properties}
//           </Typography>
//         </Box>
//       ))}

//       <Typography
//         sx={{
//           position: "absolute",
//           width: 504,
//           height: 32,
//           left: 100,
//           top: 1247,
//           fontFamily: "SF Pro Display",
//           fontWeight: 600,
//           fontSize: 28,
//           lineHeight: "33px",
//           color: "#181818",
//         }}
//       >
//         Get inspiration for your next trip
//       </Typography>

//       {inspirationCards.map((card, idx) => (
//         <Box
//           key={idx}
//           sx={{
//             position: "absolute",
//             width: 400,
//             height: 280,
//             left: card.left,
//             top: 1303,
//             backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${card.image})`,
//             backgroundSize: "cover",
//             borderRadius: 2,
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               left: 20,
//               bottom: 20,
//               color: "#FFFFFF",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 600,
//                 fontSize: 20,
//                 lineHeight: "24px",
//                 width: 360,
//                 mb: 1,
//               }}
//             >
//               {card.title}
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 400,
//                 fontSize: 16,
//                 lineHeight: "22px",
//                 letterSpacing: "0.02em",
//                 width: 360,
//               }}
//             >
//               {card.description}
//             </Typography>
//           </Box>
//         </Box>
//       ))}

//       <Typography
//         sx={{
//           position: "absolute",
//           width: 504,
//           height: 32,
//           left: 100,
//           top: 1643,
//           fontFamily: "SF Pro Display",
//           fontWeight: 600,
//           fontSize: 28,
//           lineHeight: "33px",
//           color: "#181818",
//         }}
//       >
//         Popular hotels
//       </Typography>

//       {popularHotels.map((hotel, idx) => (
//         <Box key={idx}>
//           <Box
//             sx={{
//               position: "absolute",
//               width: 295,
//               height: 300,
//               left: hotel.left,
//               top: 1699,
//               borderRadius: 2,
//               backgroundImage: `url(${hotel.image})`,
//               backgroundSize: "cover",
//             }}
//           />
//           <Box
//             sx={{
//               position: "absolute",
//               width: 295,
//               height: 47,
//               left: hotel.left,
//               top: 2013,
//               display: "flex",
//               flexDirection: "column",
//               gap: "6px",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 600,
//                 fontSize: 20,
//                 lineHeight: "24px",
//                 color: "#181818",
//               }}
//             >
//               {hotel.name}
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 400,
//                 fontSize: 14,
//                 lineHeight: "17px",
//                 letterSpacing: "0.02em",
//                 color: "#181818",
//               }}
//             >
//               {hotel.properties}
//             </Typography>
//           </Box>
//         </Box>
//       ))}

//       <Box
//         sx={{
//           position: "absolute",
//           width: 1240,
//           height: 280,
//           left: 100,
//           top: 2120,
//           borderRadius: 2,
//           backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${Mobile})`,
//           backgroundSize: "cover",
//         }}
//       />

//       <Box
//         sx={{
//           position: "absolute",
//           left: 169,
//           top: 2184,
//           display: "flex",
//           flexDirection: "column",
//           gap: "30px",
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "SF Pro Display",
//             fontWeight: 600,
//             fontSize: 28,
//             lineHeight: "39px",
//             color: "#FFFFFF",
//             width: 580,
//           }}
//         >
//           Download the mobile application for bonus coupons and travel codes
//         </Typography>
//         <Box
//           sx={{
//             width: 182,
//             height: 44,
//             background: "#2F80ED",
//             borderRadius: "6px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: "12px 18px",
//           }}
//         >
//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 500,
//               fontSize: 15,
//               lineHeight: "20px",
//               letterSpacing: "0.02em",
//               color: "#FFFFFF",
//             }}
//           >
//             Download mobile app
//           </Typography>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           width: 719.71,
//           height: 515.6,
//           left: 551,
//           top: 2132.28,
//           backgroundImage: `url(${Mobile})`,
//           backgroundSize: "cover",
//           transform: "rotate(-15deg)",
//           opacity: 0.6,
//           mixBlendMode: "multiply",
//         }}
//       />

//       <Box
//         sx={{
//           position: "absolute",
//           width: 820,
//           height: 70,
//           left: 310,
//           top: 2480,
//           textAlign: "center",
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "SF Pro Display",
//             fontWeight: 600,
//             fontSize: 28,
//             lineHeight: "39px",
//             color: "#181818",
//           }}
//         >
//           Explore the world with My Dream place
//         </Typography>
//         <Typography
//           sx={{
//             fontFamily: "SF Pro Display",
//             fontWeight: 400,
//             fontSize: 16,
//             lineHeight: "22px",
//             letterSpacing: "0.02em",
//             color: "#2F80ED",
//           }}
//         >
//           Discover new places and experiences
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default HomeGallery;
