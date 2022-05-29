import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const userURL = process.env.REACT_APP_API_URL + "users/";

  const FormDataConfig = { "Content-Type": "multipart/form-data" };

  const addUser = (userData) => {
    setLoading(true);
    axios
      .post(userURL, userData)
      .then((res) => {
        setLoading(false);
        if (!res.data.error) {
          //handle success
          getUsers();
          console.log("res: ", res);
        }
      })
      .catch((err) => {
        //handle error
        //console.log(err.response.data.error);
      });
  };

  const updateUser = async (FormData, _id) => {
    try {
      const response = await axios({
        method: "put",
        url: userURL + _id,
        data: FormData,
        headers: FormDataConfig,
      });
      //handle success
      if (!response.data.error) {
        getUsers();
        navigate("../utilisateurs");
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const changePassword = async (passwordData, _id) => {
    try {
      const response = await axios({
        method: "put",
        url: userURL + _id,
        data: passwordData,
      });
      //handle success
      if (!response.data.error) {
        getUsers();
        navigate("../utilisateurs");
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const removeUser = async (_id) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "delete",
        url: userURL + _id,
      });
      setLoading(false);
      //handle success
      if (!response.data.error) {
        setUsers(users.filter((item) => item._id !== _id));
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: userURL,
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setUsers(response.data);
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getUser = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: userURL + _id,
    })
      .then((response) => {
        setLoading(false);
        //handle success
        if (!response.data.error) {
          return response.data;
        }
      })
      .catch((err) => {
        //handle error
        console.log(err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        addUser,
        updateUser,
        changePassword,
        removeUser,
        getUsers,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;
