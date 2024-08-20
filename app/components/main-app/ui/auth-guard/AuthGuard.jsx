import Link from "next/link";

const AuthGuard = () => {
  return (
    <div className="vh-100 p-5">
      <h5 className="text-danger align-self-end text-center ">
        You need to be{" "}
        <Link href="/login" className="primary-color">
          Logged In
        </Link>{" "}
        to be able to view this page.
      </h5>
    </div>
  );
};

export default AuthGuard;
