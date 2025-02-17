import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ME, DELETE_ME } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import EditProfileModal from "../components/EditProfileModal";
import Greeting from "../components/Greeting";
import Auth from "../utils/auth";
import DeleteUser from "../components/DeleteUser";

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
        <div className="flex-col">
          {Auth.loggedIn() ? (
            <>
              <h2 className="text-center my-3">Your Profile</h2>
              {loading && <p>Loading...</p>}

              {/*Greeting import */}
              <div className="mx-auto">
                <div className="text-center">
                  <Greeting
                    username={userData.username}
                    email={userData.email}
                  />
                </div>

                {/* Edit Profile Button */}

                <div className="text-center my-4">
                  <Button
                    onClick={() => handleEditFormToggle(userData._id)}
                    className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto fornLengthButton"
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

                <div className="text-center">
                  <Button
                    className="btn btn-danger col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto fornLengthButton"
                    onClick={() =>
                      DeleteUser(userData._id, setInfoMessage, deleteUser)
                    }
                  >
                    Delete Account <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            window.location.replace("./login")
          )}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
