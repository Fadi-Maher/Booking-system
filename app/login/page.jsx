"use client";

import { useRouter } from "next/navigation.js";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm();

  const router = useRouter();

  const submitHandler = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Email</label>
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
                value: 17,
                message: "Password must be less than 17 characters",
              },
            })}
            onKeyUp={() => {
              trigger("password");
            }}
          ></input>
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>
        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
export default Login;
