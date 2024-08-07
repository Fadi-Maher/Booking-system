"use client";

import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

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
      router.push("/");
      alert("User Created Successfully");
    } catch (error) {
      console.log(error);
      alert("User creation failed");
      alert(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onhandleSubmit)}>
        <h5>Create an account</h5>
        <div>
          <div>
            <label>Your email address</label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              required={true}
              {...register("email", {
                required: "Email is Required!!!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={Boolean(errors.email)}
              onKeyUp={() => {
                trigger("email");
              }}
            ></input>
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
          <div>
            <label>Your password</label>
            <input
              name="password"
              id="password"
              type="password"
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
                  value: 20,
                  message: "Password must be less than 20 characters",
                },
              })}
              onKeyUp={() => {
                trigger("password");
              }}
              error={Boolean(errors.password)}
            ></input>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <div>
            <label>Confirm your password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
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
              error={Boolean(errors.confirmPassword)}
              className={`form-control ${errors.confirmPassword && "invalid"}`}
              required={true}
              onKeyUp={() => {
                trigger("confirmPassowrd");
              }}
            />
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}{" "}
              </small>
            )}
          </div>
          <div>
            <label>Your full name</label>
            <input
              name="name"
              type="name"
              className={`form-control ${errors.name && "invalid"}`}
              required={true}
              defaultValue=""
              {...register("name", { required: "Fullname is Required!!!" })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="text-danger">Fullname is Required!!!</small>
            )}
          </div>
          <div>
            <label>Your phone number</label>
            <input
              name="phoneNumber"
              type="text"
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
              })}
              error={Boolean(errors.phoneNumber)}
              onKeyUp={() => {
                trigger("phoneNumber");
              }}
            />
            {errors.phoneNumber && (
              <small className="text-danger">
                {errors.phoneNumber.message}
              </small>
            )}
          </div>
          <div>
            <button disabled={!isValid} type="submit">
              Create an account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
