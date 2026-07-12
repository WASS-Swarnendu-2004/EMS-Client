import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import {Loader2} from "lucide-react"

const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/auth/profile");

      setEmployee(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
       error?.response?.data?.message ||
       "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
       <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin"/>
              <p className="text-lg font-semibold text-gray-600">
                Loading Your Profile..
              </p>
        </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">
        {/* Avatar */}

        <div className="flex justify-center mb-6">
          {/* <div
            className="
            w-24
            h-24
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            text-3xl
            font-bold
          "
          >
            {employee?.name
              ?.charAt(0)
              .toUpperCase()}
          </div> */}
          <img
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${employee?.name}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Profile Details */}

        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="text-gray-500 text-sm">Name</p>

            <p className="text-lg font-semibold">{employee?.name || "N/A"}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-gray-500 text-sm">Email</p>

            <p className="text-lg font-semibold">{employee?.email || "N/A"}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-gray-500 text-sm">Role</p>

            <span
              className="
  inline-block
  px-4
  py-2
  rounded-full
  bg-blue-100
  text-blue-700
  font-semibold
  "
            >
              {employee?.role || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
