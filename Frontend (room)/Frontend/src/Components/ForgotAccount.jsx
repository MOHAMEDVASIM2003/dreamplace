// import React, { useState } from "react";
// import { Box, Typography, TextField, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import Logo from "../assets/Logo.png";
// import inbox1 from "../assets/inbox1.png";

// const ForgotAccount = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleSubmit = () => {
//     if (validateEmail(email)) {
//       setError("");
//       console.log("Password reset email sent to:", email);
//       setStep(2);
//     } else {
//       setError("Please enter a valid email address");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "100vh",
//         bgcolor: "white",
//         position: "relative",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: "100%",
//           maxWidth: "1440px",
//           height: "68px",
//           bgcolor: "#FFFFFF",
//           top: 0,
//           left: 0,
//           display: "flex",
//           alignItems: "center",
//           px: 4,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             position: "absolute",
//             left: "100px",
//             top: "22px",
//           }}
//         >
//           <img
//             src={Logo}
//             alt="My Dream Place Logo"
//             style={{
//               position: "relative",
//               top: "-1.5px",
//               width: "20px",
//               height: "20px",
//             }}
//           />
//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 500,
//               fontSize: "18px",
//               lineHeight: "21px",
//               color: "#1B1F2D",
//             }}
//           >
//             My Dream Place
//           </Typography>
//         </Box>
//       </Box>

//       {step === 1 ? (
//         <Box
//           sx={{
//             position: "absolute",
//             top: "160px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: { xs: "90%", sm: "400px" },
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 600,
//               fontSize: "28px",
//               lineHeight: "33px",
//               textAlign: "center",
//               color: "#181818",
//               mb: 2,
//             }}
//           >
//             Forgot your password?
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 400,
//               fontSize: "16px",
//               lineHeight: "140%",
//               textAlign: "center",
//               color: "#4F4F4F",
//               mb: 3,
//             }}
//           >
//             We’ll send you a link to reset it. Enter your email address used for
//             My Dream Place
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 500,
//               fontSize: "14px",
//               lineHeight: "140%",
//               color: "#181818",
//               alignSelf: "flex-start",
//               mb: 1,
//             }}
//           >
//             Your email address
//           </Typography>

//           <TextField
//             fullWidth
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             error={!!error}
//             helperText={error}
//             sx={{
//               width: "100%",
//               height: "44px",
//               bgcolor: "#F2F2F2",
//               borderRadius: "4px",
//               mb: 3,
//               "& .MuiOutlinedInput-root": {
//                 padding: "11px 12px",
//                 height: "44px",
//                 "& fieldset": { border: "none" },
//                 "& input": {
//                   fontFamily: "SF Pro Display",
//                   fontWeight: 400,
//                   fontSize: "15px",
//                   lineHeight: "140%",
//                   color: "#181818",
//                   padding: 0,
//                 },
//               },
//             }}
//           />

//           <Button
//             fullWidth
//             onClick={handleSubmit}
//             sx={{
//               padding: "12px 18px",
//               width: "100%",
//               height: "44px",
//               bgcolor: "#2F80ED",
//               borderRadius: "6px",
//               textTransform: "none",
//               mb: 3,
//               "&:hover": { bgcolor: "#1B6CCE" },
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 500,
//                 fontSize: "15px",
//                 lineHeight: "20px",
//                 color: "#FFFFFF",
//               }}
//             >
//               Send Reset Link
//             </Typography>
//           </Button>

//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 400,
//               fontSize: "14px",
//               lineHeight: "18px",
//               textAlign: "center",
//               color: "#4F4F4F",
//               mb: 3,
//             }}
//           >
//             By creating an account, you agree with our{" "}
//             <Typography
//               component="span"
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 color: "#2F80ED",
//                 cursor: "pointer",
//                 fontWeight: 500,
//                 textDecoration: "none",
//                 "&:hover": { textDecoration: "underline" },
//               }}
//             >
//               Terms and Conditions
//             </Typography>{" "}
//             and{" "}
//             <Typography
//               component="span"
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 color: "#2F80ED",
//                 cursor: "pointer",
//                 fontWeight: 500,
//                 textDecoration: "none",
//                 "&:hover": { textDecoration: "underline" },
//               }}
//             >
//               Privacy Statement
//             </Typography>
//             .
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: "SF Pro Display",
//               fontWeight: 400,
//               fontSize: "16px",
//               lineHeight: "19px",
//               textAlign: "center",
//               color: "#4F4F4F",
//             }}
//           >
//             Remember your password?{" "}
//             <Typography
//               component={Link}
//               to="/signin"
//               sx={{
//                 color: "#2F80ED",
//                 fontFamily: "SF Pro Display",
//                 cursor: "pointer",
//                 fontWeight: 500,
//                 textDecoration: "none",
//                 "&:hover": { textDecoration: "underline" },
//               }}
//             >
//               Sign in
//             </Typography>
//           </Typography>
//         </Box>
//       ) : (
//         <>
//           <Box
//             sx={{
//               position: "absolute",
//               width: "280px",
//               height: "250px",
//               left: "50%",
//               top: "285px",
//               transform: "translate(-50%, -50%)",
//               bgcolor: "rgba(254, 226, 101, 0.3)",
//               borderRadius: "20px",
//               zIndex: 0,
//             }}
//           />

//           <Box
//             component="img"
//             src={inbox1}
//             alt="Inbox Illustration"
//             sx={{
//               position: "absolute",
//               width: "200px",
//               height: "200px",
//               left: "50%",
//               top: "185px",
//               transform: "translateX(-50%)",
//               zIndex: 1,
//             }}
//           />

//           <Box
//             sx={{
//               position: "absolute",
//               top: "450px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: { xs: "90%", sm: "400px" },
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               zIndex: 2,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 600,
//                 fontSize: "28px",
//                 lineHeight: "33px",
//                 textAlign: "center",
//                 color: "#181818",
//                 mb: 2,
//               }}
//             >
//               Check your Inbox
//             </Typography>

//             <Typography
//               sx={{
//                 fontFamily: "SF Pro Display",
//                 fontWeight: 400,
//                 fontSize: "16px",
//                 lineHeight: "140%",
//                 textAlign: "center",
//                 color: "#4F4F4F",
//                 mb: 3,
//               }}
//             >
//               We have just emailed you the instructions and a reset password
//               link to {email}. It might take a few minutes to arrive.
//             </Typography>

//             <Button
//               fullWidth
//               component={Link}
//               to="/signin"
//               sx={{
//                 padding: "12px 18px",
//                 width: "100%",
//                 height: "44px",
//                 bgcolor: "#2F80ED",
//                 borderRadius: "6px",
//                 textTransform: "none",
//                 "&:hover": { bgcolor: "#1B6CCE" },
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontFamily: "SF Pro Display",
//                   fontWeight: 500,
//                   fontSize: "15px",
//                   lineHeight: "20px",
//                   color: "#FFFFFF",
//                 }}
//               >
//                 Back to Sign in
//               </Typography>
//             </Button>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ForgotAccount;
// ForgotAccount.jsx
// ForgotAccount.jsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import inbox1 from "../assets/inbox1.png";
import bg from "../assets/bg.jpg";
import "@qpokychuk/sf-pro-display";
import axios from "axios";

const ForgotAccount = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setError("");
      
      await axios.post("http://localhost:3002/api/forgot-password", { email });
      setStep(2);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to send reset email. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
        alignItems: "flex-start",
        pl: { md: "100px", xs: 0 },
        position: "relative",
      }}
    >
      {/* Transparent Navbar */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "68px",
          top: 0,
          left: 0,
          px: 4,
          display: "flex",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "absolute",
            left: "100px",
            top: "22px",
          }}
        >
          <img
            src={Logo}
            alt="My Dream Place Logo"
            style={{ width: "20px", height: "20px" }}
          />
          <Typography
            sx={{
              fontFamily: "SF Pro Display",
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "21px",
              color: "#fff",
            }}
          >
            My Dream Place
          </Typography>
        </Box>
      </Box>

      {/* Glassy Card */}
      <Box
        sx={{
          mt: "200px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          padding: { xs: 3, sm: 4 },
          width: { xs: "90%", sm: "400px" },
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {step === 1 ? (
          <>
            <Typography
              sx={{
                fontFamily: "SF Pro Display",
                fontWeight: 600,
                fontSize: "28px",
                color: "#fff",
                mb: 2,
              }}
            >
              Forgot your password?
            </Typography>
            <Typography
              sx={{
                whistlestop: "16px",
                color: "#C0E0FF",
                mb: 3,
              }}
            >
              We’ll send you a link to reset it. Enter your email used for My
              Dream Place.
            </Typography>
            <TextField
              fullWidth
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                  "& fieldset": { border: "none" },
                },
              }}
            />
            <Button
              fullWidth
              onClick={handleSubmit}
              sx={{
                height: "44px",
                bgcolor: "#2F80ED",
                color: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "15px",
                mb: 3,
                "&:hover": { bgcolor: "#1B6CCE" },
              }}
            >
              Send reset link
            </Button>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#fff",
                mb: 3,
              }}
            >
              By continuing, you agree to our{" "}
              <span style={{ color: "#C0E0FF", cursor: "pointer" }}>Terms</span>{" "}
              &{" "}
              <span style={{ color: "#C0E0FF", cursor: "pointer" }}>
                Privacy
              </span>
              .
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "16px" }}>
              Remember your password?{" "}
              <Typography
                component={Link}
                to="/signin"
                sx={{
                  color: "#C0E0FF",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign in
              </Typography>
            </Typography>
          </>
        ) : (
          <>
            <img
              src={inbox1}
              alt="Inbox Illustration"
              style={{
                width: "100px",
                height: "100px",
                marginBottom: "20px",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontFamily: "SF Pro Display",
                fontWeight: 600,
                fontSize: "28px",
                color: "#fff",
                mb: 2,
              }}
            >
              Check your Inbox
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#C0E0FF",
                mb: 3,
              }}
            >
              We’ve sent a reset link to <strong>{email}</strong>. It might take
              a few minutes to arrive.
            </Typography>
            <Button
              fullWidth
              component={Link}
              to="/signin"
              sx={{
                height: "44px",
                bgcolor: "#2F80ED",
                color: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "15px",
                mb: 3,
                "&:hover": { bgcolor: "#1B6CCE" },
              }}
            >
              Back to Sign in
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotAccount;