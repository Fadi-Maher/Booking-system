"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { auth } from "../firebase"; // Adjust based on your setup
import {
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Login = () => {
  const { handleSubmit, register, trigger, formState: { errors, isValid } } = useForm();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const submitHandler = async ({ email, password }) => {
    try {
      
      if (rememberMe) {
        await setPersistence(auth, browserSessionPersistence);
      }

      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

    
      const authToken = await userCredential.user.getIdToken();

       
      localStorage.setItem('authToken', authToken);

       
      toast.success("Logged in successfully!");
      setTimeout(() => {
        router.push("/");  
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <MDBContainer fluid className="p-3 my-2">
        <MDBRow>
          <MDBCol col="10" md="5">
            <img
              src="/Hotel Booking.png"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="4" md="5">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label className="mt-5 mb-2" htmlFor="email">
                  Email
                </label>
                <MDBInput
                  wrapperClass="mb-1"
                  id="email"
                  type="email"
                  size="lg"
                  required={true}
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                {errors.email && (
                  <small className="text-danger mt-n2">
                    {errors.email.message}
                  </small>
                )}
              </div>
              <div className="mt-4">
                <label className="mb-2" htmlFor="password">
                  Password
                </label>
                <MDBInput
                  wrapperClass="mb-1"
                  id="password"
                  type="password"
                  size="lg"
                  required={true}
                  {...register("password", {
                    required: "You must specify a password!",
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      message:
                        "Password must contain at least one number, one special character and one uppercase character!",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be more than 8 characters!",
                    },
                    maxLength: {
                      value: 17,
                      message: "Password must be less than 17 characters!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                {errors.password && (
                  <small className="text-danger mt-n2">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div className="mt-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>
              <button
                className={`btn mb-4 w-100 mt-4 text-light btn-lg  bg-primary`}
                disabled={!isValid}
                type="submit"
              >
                Sign in
              </button>
              <Link href="/register" className="text-primary">
                Register
              </Link>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
};

export default Login;
