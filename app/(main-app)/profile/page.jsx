"use client";

import { AuthContext } from "@/app/AuthContext";
import { useContext, useState } from "react";
import ProfileNameModal from "@/app/components/main-app/ui/modals/ProfileNameModal";
import ProfilePhoneModal from "@/app/components/main-app/ui/modals/ProfilePhoneModal";
import ProfileEmailModal from "@/app/components/main-app/ui/modals/ProfileEmailModal";
import ProfilePasswordModal from "@/app/components/main-app/ui/modals/ProfilePasswordModal";
import ProfileDeleteModal from "@/app/components/main-app/ui/modals/ProfileDeleteModal";
import AuthGuard from "@/app/components/main-app/ui/auth-guard/AuthGuard";
import { Grid } from "react-loader-spinner";

const Profile = () => {
  const { currentUser, userDetails, isLoading } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(true);

  if (!currentUser && !isLoading) return <AuthGuard />;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100 ">
        <Grid
          visible={true}
          height="180"
          width="180"
          color="#dfa974"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }

  return (
    <div className="mt-3 mb-5 mx-auto" style={{ maxWidth: "35rem" }}>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col" colSpan="2">
              <span className="primary-color">Basic Info:</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style={{ width: "5rem" }}>
              Name
            </th>
            <td className="w-50 p-2">
              <span className="primary-color">{userDetails?.username}</span>
            </td>
            <td>
              <ProfileNameModal
                modalTitle="New Name"
                currentUser={currentUser}
              />
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ width: "5rem" }}>
              Email
            </th>
            <td className="w-50 p-2">
              <span className="primary-color">{userDetails?.userEmail}</span>
            </td>
            <td>
              <ProfileEmailModal />
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ width: "5rem" }}>
              Phone
            </th>
            <td className="w-50 p-2">
              <span className="primary-color">{userDetails?.phoneNum}</span>
            </td>
            <td>
              <ProfilePhoneModal
                modalTitle="New Phone Number"
                currentUser={currentUser}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <ProfilePasswordModal
          modalTitle="New Password"
          currentUser={currentUser}
        />
        <ProfileDeleteModal
          modalTitle="Delete Account"
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default Profile;
