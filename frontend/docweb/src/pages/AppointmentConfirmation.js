import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";

export default function AppointmentConfirmation() {
    return (
      <div className="w-full flex flex-col items-start ">
        <img className="absolute object-contain" src={GreenBackground} alt="radio button" />
        <div className="relative w-full h-screen flex flex-col gap-4 justify-center align-middle items-center">
          <h1 className="text-6xl font-medium pb-10">Thank you for adding an appointment!</h1>
          <p className="text-3xl font-normal">Now you can <a href="/view_appointments" className="underline font-medium">check your appointemnts</a> or <a href="/" className="underline font-medium">return to dashboard</a>.</p>
        </div>
      </div>
    );
}