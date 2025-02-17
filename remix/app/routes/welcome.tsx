import React from "react";
import { Link } from "react-router";

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Application!</h1>
      <p>Please choose an option:</p>
      <Link to="/login">Login</Link>
      <Link to="/onboarding">Create Account</Link>
    </div>
  );
};

export default WelcomePage;
