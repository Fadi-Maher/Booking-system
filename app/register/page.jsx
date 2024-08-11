"use client";

import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import styles from "../login/page.module.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    register,
    watch,
  } = useForm();

  const router = useRouter();

  async function onhandleSubmit(data) {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
        data.name,
        data.phoneNumber
      );
         toast.success("User Registered Successfully!");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
     
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already registered. Please log in instead.");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  }
}
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
            <form onSubmit={handleSubmit(onhandleSubmit)}>
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
                    required: "Email is Required!!!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
              </div>

              {errors.email && (
                <small className="text-danger mb-2 mt-n2">
                  {errors.email.message}
                </small>
              )}

              <div className="mt-4">
                <label className="mb-2" htmlFor="password">
                  Password
                </label>
                <MDBInput
                  wrapperClass="mb-1"
                  id="password"
                  type="password"
                  size="lg"
                  autoComplete="off"
                  className={`form-control ${errors.password && "invalid"}`}
                  required={true}
                  {...register("password", {
                    required: "You must specify a password",
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      message:
                        "Password should contain at least one number, one special character and one uppercase character",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be more than 8 characters",
                    },
                    maxLength: {
                      value: 17,
                      message: "Password must be less than 17 characters",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                {errors.password && (
                  <small className="text-danger mb-4 mt-n2">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <div className="mt-4">
                <label className="mb-2" htmlFor="confirmPassword">
                  Confirm your password
                </label>
                <MDBInput
                  wrapperClass="mb-1"
                  id="confirmPassword"
                  type="password"
                  size="lg"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password", "") ||
                      "The passwords do not match",
                  })}
                  autoComplete="off"
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  className={`form-control ${
                    errors.confirmPassword && "invalid"
                  }`}
                  required={true}
                  onKeyUp={() => {
                    trigger("confirmPassword");
                  }}
                />
                {errors.confirmPassword && (
                  <small className="text-danger mb-2 mt-n2">
                    {errors.confirmPassword.message}{" "}
                  </small>
                )}
              </div>
              <div className="mt-4">
                <label className="mb-2" htmlFor="name">
                  Name
                </label>
                <MDBInput
                  wrapperClass="mb-1"
                  id="name"
                  type="name"
                  size="lg"
                  className={`form-control ${errors.name && "invalid"}`}
                  required={true}
                  defaultValue=""
                  {...register("name", { required: "Fullname is Required!!!" })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                />
                {errors.name && (
                  <small className="text-danger mb-2 mt-n2">
                    Fullname is Required!!!
                  </small>
                )}
              </div>
              <div className="mt-4 mb-4">
                <label className="mb-2" htmlFor="phoneNumber">
                  Phone number
                </label>
                <MDBInput
                  wrapperClass="mb-1"
                  id="phoneNumber"
                  type="text"
                  size="lg"
                  className={`form-control`}
                  required={true}
                  {...register("phoneNumber", {
                    pattern: {
                      value: /^01[0-5]\d{1,8}$/,
                      message:
                        "Phone number should start with '01' followed by a digit from 0 to 5",
                    },
                    required: "Phone number is Required!!!",
                    maxLength: {
                      value: 11,
                      message: "Phone number must be 11 numbers",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone number must be 11 numbers",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("phoneNumber");
                  }}
                />
                {errors.phoneNumber && (
                  <small className="text-danger mb-2 mt-n2">
                    {errors.phoneNumber.message}
                  </small>
                )}
              </div>
              <button
                className={`btn mb-4 w-100 mt-4  btn-lg text-light ${styles.btnBg}`}
                disabled={!isValid}
                type="submit"
              >
                Sign up
              </button>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
         <ToastContainer />
    </div>
  );
};

export default Register;
