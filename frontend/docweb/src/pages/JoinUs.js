import React, { useState } from "react";
import Button from "../components/Button";
import DoctorImage from "../resources/doctor2.png";

export default function JoinUs({}) {
    return (
      <div className="w-full flex flex-col items-start ">
            <div className="w-full h-[700px] flex flex-col justify-center align-middle items-center bg-gradient-to-r from-purple-500 to-pink-500">
              <p className="pb-10 text-7xl text-white font-bold">Join us now!</p>
              <div className="bg-transparent hover:bg-pink-500 active:bg-pink-500 border border-4 border-pink-300 py-3 px-14 rounded-md text-pink-300 text-2xl font-bold transition duration-150 ease-in-out">
                <a href="/sign_up">
                    Sign up
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-20 py-20 px-20">
                <div className="flex flex-col gap-10">
                  <h className="text-3xl font-medium">DocApp- your best bet</h>
                  <p className="text-xl">
                  Join our new doctor’s appointment website, where you can easily schedule visits to your clinic, choose your favourite doctors, and have the easiest access to their schedule!
                  </p>

                  <p className="text-xl">

DocApp will provide you with all the necessary tools to make your life easier. With this innovative scheduling system, making a doctors appointment will be a matter of several seconds!
                  </p>
                </div>
                <div>
                  <img src={DoctorImage} className="object-fill" />
                </div>
              </div>
        </div>
    );
}