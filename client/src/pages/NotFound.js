import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="max-w-lg mx-auto px-5 py-32 text-center">
    <h1 className="text-5xl text-brass mb-4">404</h1>
    <p className="text-stone mb-8">This page doesn't exist, or the khussa you're looking for has been moved.</p>
    <Link to="/" className="bg-brass text-ink px-7 py-3 text-sm">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
