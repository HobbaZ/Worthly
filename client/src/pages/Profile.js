import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ME, DELETE_ME } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import EditProfileModal from "../components/EditProfileModal";
import Greeting from "../components/Greeting";
import Auth from "../utils/auth";
import DeleteUser from "../components/DeleteUser";
import AuthLogin from "../components/AuthLogin";

const Profile = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteUser] = useMutation(DELETE_ME);
  const [updateUser] = useMutation(UPDATE_ME);
  const [infoMessage, setInfoMessage] = useState("");

  //Open and close edit form
  function handleEditFormToggle(userId) {
    setShowEditForm(userId === showEditForm ? null : userId);
  }

  return (
    <Container>
      <div className="main">
        {Auth.loggedIn() ? (
          <>
            <h2 className="text-center my-5">Your Profile</h2>
            {loading && <p>Loading...</p>}

            {/*Greeting import */}
            <div className="w-100">
              <div className="col-xs-10 col-sm-6 col-md-6 col-lg-5 mx-auto">
                <div className="text-center">
                  <Greeting
                    username={userData.username}
                    email={userData.email}
                  />
                </div>

                {/* Edit Profile Button */}

                <div className="text-center col-xs-10 col-sm-10 col-md-10 col-lg-8 col-xl-4 my-3 p-0 mx-auto">
                  <Button
                    onClick={() => handleEditFormToggle(userData._id)}
                    className="btn form-btn w-75 my-3"
                  >
                    Edit <i className="fas fa-pen-to-square"></i>
                  </Button>

                  {showEditForm === userData._id && (
                    <>
                      <EditProfileModal
                        user={userData}
                        show={showEditForm !== null}
                        onClose={() => setShowEditForm(null)}
                        updateUser={updateUser}
                        Auth={Auth}
                      />
                    </>
                  )}
                </div>

                {/* Delete Profile Button */}

                <div className="text-center col-xs-10 col-sm-10 col-md-10 col-lg-8 col-xl-4 my-3 p-0 mx-auto">
                  <Button
                    className="btn btn-danger w-75 my-3"
                    onClick={() =>
                      DeleteUser(userData._id, setInfoMessage, deleteUser)
                    }
                  >
                    Delete Account <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          window.location.replace("./login")
        )}
      </div>
    </Container>
  );
};

export default Profile;
