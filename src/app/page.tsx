"use client";
import { UserButton } from "@clerk/nextjs";
import { CldUploadButton } from "next-cloudinary";
import React from "react";

const Home = () => {
  return (
    <div>
      Home <UserButton />
    </div>
  );
};

export default Home;
