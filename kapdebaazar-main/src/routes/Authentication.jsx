import SignUpForm from "../components/Sign-Up-Form";
import SignInForm from "../components/Sign-In-Form";
import "../resources/signin.scss";
import Spinner from "../components/Spinner";
import { useState } from "react";
const Authentication = () => { 
  const [loading,setloading]= useState(false);
  return (
    <div className="signin">
      <SignInForm setloading={setloading}/>
      <SignUpForm setloading={setloading}/>
      {loading && <Spinner/>}
    </div>
  )
};

export default Authentication