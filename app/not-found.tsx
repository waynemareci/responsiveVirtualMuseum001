import Link from 'next/link'
import React from "react";
 
export default function NotFound() {
  return (
    <div style={{ color: 'white', backgroundImage: `url('/virtualMuseum404.png')`, backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h2 className="mt-5" >Not Found</h2>
      <p>something went wrong</p>
      <Link style={{color: 'white'}} href="/">return to search page</Link>
    </div>
  )
}