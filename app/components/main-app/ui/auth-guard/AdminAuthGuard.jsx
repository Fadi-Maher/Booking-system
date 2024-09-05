import Link from "next/link";

const AdminAuthGuard = () => {
  return (
    <div className="vh-100 p-5">
      <h5 className="text-danger align-self-end text-center ">
        You need to be{" "}
        <Link href="/login" className="primary-color">
          Logged In
        </Link>{" "}
        as an Admin to be able to access this page.
      </h5>
    </div>
  );
};

export default AdminAuthGuard;
