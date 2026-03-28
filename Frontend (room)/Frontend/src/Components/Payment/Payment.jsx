import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Menu,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import securityUserIcon from "../../assets/security-user-1.png";
import cardTickIcon from "../../assets/card-tick.png";
import lockCircleIcon from "../../assets/lock-circle.png";
import visaIcon from "../../assets/visa.png";
import mastercardIcon from "../../assets/mastercard.png";
import amexIcon from "../../assets/amex.png";
import paypal from "../../assets/paypal.png";
import Rating from "@mui/material/Rating";
import axios from "axios";
import roomImg from "../../assets/room-img.jpg";
import logo from "../../assets/Logo.png";
import whitelogo from "../../assets/WhiteLogo.png";
import { jsPDF } from "jspdf";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, checkInDate, checkOutDate, guests, selectedRoom } =
    location.state || {};
  const [propertyData, setPropertyData] = useState(property || null);
  const [loading, setLoading] = useState(!property);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("Debit/Credit Card");
  const [countryCode, setCountryCode] = useState("+61");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gmailAddress, setGmailAddress] = useState("");
  const [receiveAlerts, setReceiveAlerts] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const stripe = useStripe();
  const elements = useElements();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!property && location.state?.MDPID) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3002/api/getproperties/${location.state.MDPID}`,
            { timeout: 10000 }
          );
          const selectedProperty = response.data;
          if (selectedProperty) {
            setPropertyData(selectedProperty);
          } else {
            setError("Property not found.");
          }
        } catch (err) {
          console.error("Error fetching property:", err);
          setError("Failed to load property details.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProperty();
  }, [property, location.state?.MDPID]);

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
    setPaymentError(null);
    setPaymentSuccess(false);
    setPaymentStatus("idle");
  };

  const handleCountryCodeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCountryCodeClose = (code) => {
    if (code) setCountryCode(code);
    setAnchorEl(null);
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    setIsValidPromo(
      propertyData?.rooms?.some(
        (room) => room.promoCode === event.target.value.toUpperCase()
      )
    );
  };

  const handleCheckboxChange = (event) => {
    setReceiveAlerts(event.target.checked);
  };

  const handleGmailChange = (event) => {
    setGmailAddress(event.target.value);
  };

  const validateGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

 
 



  

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    
    const headerBlue = [47, 128, 237];
    const textGray = [51, 51, 51];
    const accentGreen = [76, 175, 80];

    
    doc.setFillColor(...headerBlue);
    doc.rect(0, 0, 210, 30, "F");

    
    doc.addImage(whitelogo, "PNG", 127, 14, 7, 7); 

    
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 20, 20);

    
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("My Dream Place", 137, 20); 

    doc.setTextColor(...textGray);

   
    let y = 45;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details", 20, y);

    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Property: ${propertyData?.name || "Property Name Not Available"}`,
      20,
      y
    );
    y += 10;
    doc.text(
      `Check-in: ${new Date(checkInDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
      20,
      y
    );
    y += 10;
    doc.text(
      `Check-out: ${new Date(checkOutDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
      20,
      y
    );
    y += 10;
    doc.text(`Guests: ${guests} adults`, 20, y);
    y += 10;
    doc.text(`Room: ${selectedRoom?.title || "Room 1"}`, 20, y);
    y += 10;
    doc.text(`Nights: ${nights}`, 20, y);

    
    y += 20;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Price Details", 20, y);

    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`1 room x ${nights} nights`, 20, y);
    doc.text(`$${subtotal.toFixed(2)}`, 190, y, { align: "right" });

    y += 10;
    doc.text("Tax and service fees", 20, y);
    doc.text(`$${taxFees.toFixed(2)}`, 190, y, { align: "right" });

    
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 10;

    // Total Price
    doc.setFont("helvetica", "bold");
    doc.text("Total", 20, y);
    doc.text(`$${totalPrice.toFixed(2)}`, 190, y, { align: "right" });

    
    if (discount > 0) {
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...accentGreen);
      doc.text("Discount (10%)", 20, y);
      doc.text(`-$${discount.toFixed(2)}`, 190, y, { align: "right" });
      doc.setTextColor(...textGray);
    }

    
    y += 20;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Thank you for your booking! For any inquiries, please contact our support team.",
      20,
      y
    );

    
    doc.save(`invoice_${propertyData?.MDPID || "booking"}.pdf`);
  };

  


  const handlePayment = async () => {
    setPaymentStatus("processing");
    setPaymentError(null);
    setPaymentSuccess(false);

    if (!stripe || !elements) {
      setPaymentStatus("error");
      setPaymentError("Stripe is not initialized.");
      return;
    }

    if (!phoneNumber) {
      setPaymentStatus("error");
      setPaymentError("Phone number is required.");
      return;
    }

    if (!gmailAddress || !validateGmail(gmailAddress)) {
      setPaymentStatus("error");
      setPaymentError("Please enter a valid Gmail address.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentStatus("error");
      setPaymentError("Card details are missing.");
      return;
    }

    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (cardError) {
      setPaymentStatus("error");
      setPaymentError(`Invalid card details: ${cardError.message}`);
      return;
    }

    try {
      console.log("Creating PaymentIntent...");
      const response = await axios.post(
        "http://localhost:3002/api/create-payment-intent",
        {
          amount: Math.round(totalPrice * 100),
          currency: "usd",
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const { clientSecret } = response.data;
      if (!clientSecret) {
        throw new Error("Invalid client secret received");
      }

      console.log("Confirming card payment...");
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            phone: `${countryCode}${phoneNumber}`,
            email: gmailAddress,
          },
        },
      });

      if (result.error) {
        console.error("Stripe Payment Error:", result.error);
        setPaymentStatus("error");
        setPaymentError(`Payment failed: ${result.error.message}`);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", result.paymentIntent);
        setPaymentStatus("success");
        setPaymentSuccess(true);
        handleDownloadInvoice();

        const user = JSON.parse(
          localStorage.getItem("user") || sessionStorage.getItem("user") || "{}"
        );
        const username = user?.Email ? user.Email.split("@")[0] : "guest";

        const bookingDetails = {
          username,
          phone: `${countryCode}${phoneNumber}`,
          propertyName: propertyData?.name || "Property Name Not Available",
          rating: propertyData?.rating || 4.5,
          reviews: propertyData?.reviews || 1200,
          checkIn: new Date(checkInDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          checkOut: new Date(checkOutDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          nights,
          price: totalPrice.toFixed(2),
          originalPrice: totalBeforeDiscount.toFixed(2),
          image: roomImg,
        };

        console.log("Posting booking...");
        await axios.post(
          "http://localhost:3002/api/postbooking",
          {
            booking: bookingDetails,
            receiveAlerts,
            email: gmailAddress,
          },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          }
        );

        console.log("Navigating to /activities...");
        navigate("/activities");
      } else {
        setPaymentStatus("error");
        setPaymentError(
          `Payment incomplete: Status ${result.paymentIntent.status}`
        );
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setPaymentStatus("error");
      setPaymentError(
        `Payment failed. Please try again. Details: ${
          err.message || "Unknown error"
        }`
      );
      setPaymentSuccess(false);
    }
  };

  const countryCodes = ["+61", "+1", "+44", "+91", "+33"];
  const baseRoomPrice =
    selectedRoom?.currentPrice || propertyData?.currentPrice || 120.32;
  const nights = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  );
  const subtotal = baseRoomPrice * nights;
  const taxFees = 8.32;
  const totalBeforeDiscount = subtotal + taxFees;
  const roomPromoCode = propertyData?.rooms?.find(
    (room) => room.promoCode === promoCode.toUpperCase()
  )?.promoCode;
  const discount =
    isValidPromo && roomPromoCode ? totalBeforeDiscount * 0.1 : 0;
  const totalPrice = totalBeforeDiscount - discount;

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography component="div">Loading payment details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography component="div" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "rgba(242, 242, 242, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        paddingBottom: "40px",
      }}
    >
      <Box
        sx={{
          width: "1240px",
          maxWidth: "95%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Stack
            direction="column"
            spacing={3}
            sx={{
              width: { xs: "100%", md: "810px" },
              maxWidth: "100%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "380px",
                background: "#FFFFFF",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "60px",
                  left: 0,
                  top: 0,
                  background: "#2F80ED",
                  borderRadius: "6px 6px 0px 0px",
                }}
              >
                <Box
                  component="img"
                  src={securityUserIcon}
                  alt="Security User"
                  sx={{
                    position: "absolute",
                    left: "24px",
                    top: "16px",
                    width: "28px",
                    height: "28px",
                  }}
                />
                <Typography
                  component="div"
                  sx={{
                    position: "absolute",
                    height: "24px",
                    left: "68px",
                    top: "18px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "24px",
                    letterSpacing: "0.01em",
                    color: "#FFFFFF",
                  }}
                >
                  {selectedRoom?.title || "Room 1"}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    position: "absolute",
                    height: "24px",
                    left: "152px",
                    top: "18px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0.01em",
                    color: "#FFFFFF",
                    ml: "350px",
                  }}
                >
                  {guests} adults, {selectedRoom?.beds || "1 Double, 1 Twin"}
                </Typography>
              </Box>
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  height: "20px",
                  left: "24px",
                  top: "92px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#181818",
                }}
              >
                First name
              </Typography>
              <TextField
                placeholder="First name"
                sx={{
                  position: "absolute",
                  width: "374px",
                  height: "44px",
                  left: "24px",
                  top: "116px",
                  background: "#F2F2F2",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    height: "44px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "15px",
                    lineHeight: "140%",
                    letterSpacing: "0.02em",
                    color: "#333333",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#828282",
                    opacity: 1,
                  },
                }}
              />
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  height: "20px",
                  left: "412px",
                  top: "92px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#181818",
                }}
              >
                Last name
              </Typography>
              <TextField
                placeholder="Last name"
                sx={{
                  position: "absolute",
                  width: "374px",
                  height: "44px",
                  left: "412px",
                  top: "116px",
                  background: "#F2F2F2",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    height: "44px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "15px",
                    lineHeight: "140%",
                    letterSpacing: "0.02em",
                    color: "#333333",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#828282",
                    opacity: 1,
                  },
                }}
              />
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  height: "20px",
                  left: "24px",
                  top: "180px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#181818",
                }}
              >
                Mobile number
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ position: "absolute", left: "24px", top: "204px" }}
              >
                <TextField
                  value={countryCode}
                  onClick={handleCountryCodeClick}
                  sx={{
                    width: "100px",
                    height: "44px",
                    background: "#F2F2F2",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      height: "44px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontSize: "15px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#333333",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => handleCountryCodeClose(null)}
                  PaperProps={{
                    style: { maxHeight: 200, width: "100px" },
                  }}
                >
                  {countryCodes.map((code) => (
                    <MenuItem
                      key={code}
                      onClick={() => handleCountryCodeClose(code)}
                    >
                      {code}
                    </MenuItem>
                  ))}
                </Menu>
                <TextField
                  placeholder="Mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{
                    width: "488px",
                    height: "44px",
                    background: "#F2F2F2",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      height: "44px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontSize: "15px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#333333",
                      "& fieldset": { border: "none" },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#828282",
                      opacity: 1,
                    },
                  }}
                />
              </Stack>
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  height: "20px",
                  left: "24px",
                  top: "268px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#181818",
                }}
              >
                Gmail address
              </Typography>
              <TextField
                placeholder="example@gmail.com"
                value={gmailAddress}
                onChange={handleGmailChange}
                error={gmailAddress && !validateGmail(gmailAddress)}
                helperText={
                  gmailAddress && !validateGmail(gmailAddress)
                    ? "Please enter a valid Gmail address"
                    : ""
                }
                sx={{
                  position: "absolute",
                  width: "588px",
                  height: "44px",
                  left: "24px",
                  top: "292px",
                  background: "#F2F2F2",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    height: "44px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "15px",
                    lineHeight: "140%",
                    letterSpacing: "0.02em",
                    color: "#333333",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#828282",
                    opacity: 1,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={receiveAlerts}
                    onChange={handleCheckboxChange}
                    sx={{
                      width: "21px",
                      height: "20px",
                      border: "1px solid #BDBDBD",
                      borderRadius: "5px",
                      position: "absolute",
                      top: "18px",
                    }}
                  />
                }
                label={
                  <Typography
                    component="span"
                    sx={{
                      width: "223px",
                      height: "20px",
                      left: "28px",
                      top: "20px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "17px",
                      letterSpacing: "0.02em",
                      color: "rgba(51, 51, 51, 1)",
                      position: "absolute",
                      zIndex: 1,
                    }}
                  >
                    Receive text alerts about this trip.
                  </Typography>
                }
                sx={{
                  position: "absolute",
                  left: "24px",
                  top: "340px",
                  margin: 0,
                }}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "480px",
                background: "#FFFFFF",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "60px",
                  left: 0,
                  top: 0,
                  background: "#2F80ED",
                  borderRadius: "6px 6px 0px 0px",
                }}
              >
                <Box
                  component="img"
                  src={cardTickIcon}
                  alt="Card Tick"
                  sx={{
                    position: "absolute",
                    left: "24px",
                    top: "16px",
                    width: "28px",
                    height: "28px",
                  }}
                />
                <Typography
                  component="div"
                  sx={{
                    position: "absolute",
                    width: "133px",
                    height: "24px",
                    left: "68px",
                    top: "18px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "24px",
                    letterSpacing: "0.01em",
                    color: "#FFFFFF",
                  }}
                >
                  Payment options
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "48px",
                  left: 0,
                  top: "60px",
                  background: "#FFFFFF",
                  boxShadow: "0px 1px 0px #E0E0E0",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.75}
                  sx={{ position: "absolute", left: "24px", top: "0px" }}
                >
                  {["Debit/Credit Card", "Paypal", "Bank transfer"].map(
                    (method) => (
                      <Box
                        key={method}
                        sx={{
                          width:
                            method === "Debit/Credit Card"
                              ? "136px"
                              : method === "Paypal"
                              ? "69px"
                              : "109px",
                          height: "40px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "37px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "10px 14px",
                            cursor: "pointer",
                          }}
                          onClick={() => handlePaymentChange(method)}
                        >
                          <Typography
                            component="div"
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "17px",
                              letterSpacing: "0.02em",
                              color: "#333333",
                            }}
                          >
                            {method}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "3px",
                            background:
                              selectedPayment === method
                                ? "#2F80ED"
                                : "transparent",
                          }}
                        />
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
              {selectedPayment === "Debit/Credit Card" && (
                <>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ position: "absolute", left: "24px", top: "138px" }}
                  >
                    <Box
                      component="img"
                      src={mastercardIcon}
                      alt="Mastercard"
                      sx={{
                        width: "60px",
                        height: "40px",
                        borderRadius: "5px",
                        background: "#F2F2F2",
                      }}
                    />
                    <Box
                      component="img"
                      src={visaIcon}
                      alt="Visa"
                      sx={{
                        width: "60px",
                        height: "40px",
                        borderRadius: "5px",
                        background: "#F2F2F2",
                      }}
                    />
                    <Box
                      component="img"
                      src={amexIcon}
                      alt="Amex"
                      sx={{
                        width: "60px",
                        height: "40px",
                        borderRadius: "5px",
                        background: "#F2F2F2",
                      }}
                    />
                  </Stack>
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "24px",
                      top: "204px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    Name on card
                  </Typography>
                  <TextField
                    placeholder="Name on card"
                    sx={{
                      position: "absolute",
                      width: "762px",
                      height: "44px",
                      left: "24px",
                      top: "228px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#333333",
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#828282",
                        opacity: 1,
                      },
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "24px",
                      top: "282px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    Debit/Credit card number
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "742px",
                      height: "24px",
                      left: "24px",
                      top: "310px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      padding: "10px",
                    }}
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontFamily: "'SF Pro Display', sans-serif",
                            fontSize: "15px",
                            color: "#333333",
                            "::placeholder": { color: "#828282" },
                          },
                          invalid: { color: "#EB5757" },
                        },
                      }}
                    />
                  </Box>
                  {paymentStatus === "processing" && (
                    <Typography
                      component="div"
                      sx={{
                        position: "absolute",
                        left: "24px",
                        top: "360px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "14px",
                        color: "#333333",
                      }}
                    >
                      Processing payment...
                    </Typography>
                  )}
                  {paymentStatus === "success" && (
                    <Typography
                      component="div"
                      sx={{
                        position: "absolute",
                        left: "24px",
                        top: "360px",
                        color: "#4CAF50",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      Payment successful!
                    </Typography>
                  )}
                  {paymentStatus === "error" && (
                    <Typography
                      component="div"
                      sx={{
                        position: "absolute",
                        left: "24px",
                        top: "360px",
                        color: "#EB5757",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      {paymentError}
                    </Typography>
                  )}
                </>
              )}
              {selectedPayment === "Paypal" && (
                <>
                  <Box
                    component="img"
                    src={paypal}
                    alt="Paypal"
                    sx={{
                      position: "absolute",
                      left: "24px",
                      top: "138px",
                      width: "60px",
                      height: "40px",
                      borderRadius: "5px",
                      background: "#F2F2F2",
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "24px",
                      top: "204px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    PayPal Email
                  </Typography>
                  <TextField
                    placeholder="PayPal Email"
                    sx={{
                      position: "absolute",
                      width: "762px",
                      height: "44px",
                      left: "24px",
                      top: "228px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#333333",
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#828282",
                        opacity: 1,
                      },
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "40px",
                      left: "24px",
                      top: "292px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#4F4F4F",
                    }}
                  >
                    You will be redirected to PayPal to complete your payment.
                  </Typography>
                </>
              )}
              {selectedPayment === "Bank transfer" && (
                <>
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "24px",
                      top: "138px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    Account Holder Name
                  </Typography>
                  <TextField
                    placeholder="Account Holder Name"
                    sx={{
                      position: "absolute",
                      width: "762px",
                      height: "44px",
                      left: "24px",
                      top: "162px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#333333",
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#828282",
                        opacity: 1,
                      },
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "24px",
                      top: "226px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    Account Number
                  </Typography>
                  <TextField
                    placeholder="Account Number"
                    sx={{
                      position: "absolute",
                      width: "374px",
                      height: "44px",
                      left: "24px",
                      top: "250px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#333333",
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#828282",
                        opacity: 1,
                      },
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "412px",
                      top: "226px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    Routing Number
                  </Typography>
                  <TextField
                    placeholder="Routing Number"
                    sx={{
                      position: "absolute",
                      width: "374px",
                      height: "44px",
                      left: "412px",
                      top: "250px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#333333",
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#828282",
                        opacity: 1,
                      },
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "20px",
                      left: "24px",
                      top: "314px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#181818",
                    }}
                  >
                    Bank Name
                  </Typography>
                  <TextField
                    placeholder="Bank Name"
                    sx={{
                      position: "absolute",
                      width: "762px",
                      height: "44px",
                      left: "24px",
                      top: "338px",
                      background: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#333333",
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#828282",
                        opacity: 1,
                      },
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      position: "absolute",
                      height: "40px",
                      left: "24px",
                      top: "402px",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0.02em",
                      color: "#4F4F4F",
                    }}
                  >
                    Bank transfer details will be provided after booking
                    confirmation.
                  </Typography>
                </>
              )}
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "423px",
                background: "#FFFFFF",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "60px",
                  left: 0,
                  top: 0,
                  background: "#F2C94C",
                  borderRadius: "6px 6px 0px 0px",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    position: "absolute",
                    width: "328px",
                    height: "24px",
                    left: "24px",
                    top: "18px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "24px",
                    letterSpacing: "0.01em",
                    color: "#333333",
                  }}
                >
                  Important information about your booking
                </Typography>
              </Box>
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  width: "762px",
                  height: "115px",
                  left: "24px",
                  top: "92px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: "150%",
                  letterSpacing: "0.02em",
                  color: "#333333",
                }}
              >
                This rate is non-refundable. If you change or cancel your
                booking you will not get a refund or credit to use for a future
                stay. Stay extensions will require a new reservation. Front desk
                staff will greet guests on arrival. No refunds will be issued
                for late check-in or early check-out.
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  width: "762px",
                  height: "40px",
                  left: "24px",
                  top: "239px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#4F4F4F",
                }}
              >
                By clicking the button below, I acknowledge that I have reviewed
                the{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#2F80ED",
                    cursor: "pointer",
                    display: "inline",
                  }}
                >
                  Privacy Statement
                </Typography>{" "}
                and have reviewed and accept the{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#2F80ED",
                    cursor: "pointer",
                    display: "inline",
                  }}
                >
                  Rules and Restrictions
                </Typography>{" "}
                and{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#2F80ED",
                    cursor: "pointer",
                    display: "inline",
                  }}
                >
                  Terms of Use
                </Typography>
                .
              </Box>
              <Button
                onClick={
                  selectedPayment === "Debit/Credit Card"
                    ? handlePayment
                    : undefined
                }
                sx={{
                  position: "absolute",
                  width: "160px",
                  height: "44px",
                  left: "24px",
                  top: "303px",
                  background: "#2F80ED",
                  borderRadius: "6px",
                  "&:hover": { background: "#2366BF" },
                  textTransform: "none",
                }}
                disabled={selectedPayment !== "Debit/Credit Card"}
              >
                <Typography
                  component="div"
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    color: "#FFFFFF",
                  }}
                >
                  Complete Booking
                </Typography>
              </Button>
              <Box
                component="img"
                src={lockCircleIcon}
                alt="Lock Circle"
                sx={{
                  position: "absolute",
                  left: "24px",
                  top: "367px",
                  width: "24px",
                  height: "24px",
                }}
              />
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  width: "731px",
                  height: "20px",
                  left: "56px",
                  top: "368px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#4F4F4F",
                }}
              >
                We use secure transmission and encrypted storage to protect your
                personal information
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="column"
            spacing={3}
            sx={{
              width: { xs: "100%", md: "400px" },
              maxWidth: "100%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "400px",
                background: "#FFFFFF",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "180px",
                  left: 0,
                  top: 0,
                  zIndex: 30,
                  background: `url(${roomImg}) center/cover no-repeat`,
                  borderRadius: "6px 6px 0px 0px",
                }}
              />
              <Typography
                component="div"
                sx={{
                  position: "absolute",
                  height: "21px",
                  left: "24px",
                  top: "200px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "21px",
                  letterSpacing: "0.01em",
                  color: "#181818",
                }}
              >
                {propertyData?.name || "Property Name Not Available"}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ position: "absolute", left: "24px", top: "231px" }}
              >
                <Rating
                  value={propertyData?.rating || 4.5}
                  readOnly
                  precision={0.5}
                  sx={{
                    "& .MuiRating-iconFilled": { color: "#F2994A" },
                    "& .MuiRating-iconEmpty": { color: "#F2994A" },
                  }}
                />
                <Typography
                  component="div"
                  sx={{
                    height: "20px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "140%",
                    letterSpacing: "0.02em",
                    color: "#4F4F4F",
                  }}
                >
                  {propertyData?.rating || 4.5} ({propertyData?.reviews || 1200}{" "}
                  Reviews)
                </Typography>
              </Stack>
              <Stack
                direction="column"
                spacing={1}
                sx={{ position: "absolute", left: "24px", top: "276px" }}
              >
                <Typography
                  component="div"
                  sx={{
                    height: "20px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.01em",
                    color: "#EB5757",
                  }}
                >
                  Non refundable
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    height: "20px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.01em",
                    color: "#4F4F4F",
                  }}
                >
                  Check in:{" "}
                  {new Date(checkInDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    height: "20px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.01em",
                    color: "#4F4F4F",
                  }}
                >
                  Check out:{" "}
                  {new Date(checkOutDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    height: "20px",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.01em",
                    color: "#4F4F4F",
                  }}
                >
                  {nights} night stay
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                width: "100%",
                background: "#FFFFFF",
                borderRadius: "12px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                overflow: "hidden",
                p: 0,
              }}
            >
              <Box
                sx={{
                  background: "#85E0AB",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#181818",
                  }}
                >
                  Price Details
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#4F4F4F",
                      fontFamily: "'SF Pro Display', sans-serif",
                    }}
                  >
                    1 room X {nights} nights
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#4F4F4F",
                      fontFamily: "'SF Pro Display', sans-serif",
                    }}
                  >
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#4F4F4F",
                      fontFamily: "'SF Pro Display', sans-serif",
                    }}
                  >
                    Tax and service fees
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#4F4F4F",
                      fontFamily: "'SF Pro Display', sans-serif",
                    }}
                  >
                    ${taxFees.toFixed(2)}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    borderBottom: "1px solid #E0E0E0",
                    mb: 2,
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "'SF Pro Display', sans-serif",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#181818",
                      fontFamily: "'SF Pro Display', sans-serif",
                    }}
                  >
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#2F80ED",
                    mt: 2,
                    mb: 1,
                    cursor: "pointer",
                  }}
                >
                  Use a coupon, credit or promotional code
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <TextField
                    placeholder="Coupon code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    sx={{
                      flex: 1,
                      backgroundColor: "#F2F2F2",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        height: "44px",
                        "& fieldset": { border: "none" },
                      },
                    }}
                  />
                  <Button
                    sx={{
                      height: "44px",
                      backgroundColor: isValidPromo ? "#4CAF50" : "#333333",
                      color: "#FFFFFF",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: isValidPromo ? "#45A049" : "#2A2A2A",
                      },
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontWeight: 500,
                        fontSize: "15px",
                        lineHeight: "20px",
                        letterSpacing: "0.02em",
                        color: "inherit",
                      }}
                    >
                      {isValidPromo ? "Applied" : "Apply Coupon"}
                    </Typography>
                  </Button>
                </Stack>

                <Button
                  variant="contained"
                  onClick={handleDownloadInvoice}
                  sx={{
                    width: "100%",
                    backgroundColor: "#2F80ED",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    textTransform: "none",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    "&:hover": {
                      backgroundColor: "#2366BF",
                    },
                  }}
                >
                  Download Invoice
                </Button>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Payment;
