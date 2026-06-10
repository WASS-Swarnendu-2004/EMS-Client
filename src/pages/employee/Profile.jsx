import React from "react";

const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">

        
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>

        
        <div className="space-y-4">

          <div className="border-b pb-3">
            <p className="text-gray-500 text-sm">
              Email
            </p>
            <p className="text-lg font-semibold">
              {user?.email}
            </p>
          </div>

          <div className="border-b pb-3">
            <p className="text-gray-500 text-sm">
              Role
            </p>
            <p className="text-lg font-semibold capitalize">
              {user?.role}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;