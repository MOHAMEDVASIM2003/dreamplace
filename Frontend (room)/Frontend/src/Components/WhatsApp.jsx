import React from 'react'
import {FloatingWhatsApp} from "react-floating-whatsapp"
import Logo from "../assets/Logo.png"
const WhatsApp = () => {
  return (
    <div>
      <FloatingWhatsApp 
      phoneNumber="+918825909953"
      accountName="Customer Support"
      statusMessage="Typically replies in a few minutes"
      chatMessage="Hi there! 👋 How can I help you?"
      placeholder="Type your message..."
    
      avatar={Logo} 
      allowClickAway={true}
      notification={true}
      notificationDelay={60000} 
      />
    </div>
  )
}

export default WhatsApp
