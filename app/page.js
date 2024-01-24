
import Image from "next/image";
import Link from "next/link";
import Home from "/app/components/Home";
import React from "react";
import Navbar from "/app/components/NavBar.js";
import "/public/index.css";





export default function Base() {
  return (
    
      <div className="window">
      <Navbar/>

      <Home/>

    
    </div>
    
  );
}
