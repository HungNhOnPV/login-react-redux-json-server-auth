import axios from "axios";
import Cookie from "js-cookie";

export const userPostFetch = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3000/users/register", user)
      .then((res) => {
        Cookie.set("accessToken", res.data.accessToken);
        dispatch(loginUser(res.config.data));
      })
      .catch((err) => {
        console.log("err:" + err);
      });
  };
};

export const userLoginFetch = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3000/login", user)
      .then((res) => {
        Cookie.set("accessToken", res.data.accessToken);
        dispatch(loginUser(res.config.data));
      })
      .catch((err) => {
        console.log("err:" + err);
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    const token = Cookie.get("accessToken");
    if (token) {
      dispatch(logout());
      Cookie.remove("accessToken");
    }
  };
};

export const getProfileFetch = () => {
  return async (dispatch) => {
    const token = Cookie.get("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .get("http://localhost:3000/660/users", {
          // token: token
        })
        .catch((err) => {
          Cookie.remove("accessToken");
        });
      console.log(response.data);
    }
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});

const logout = () => ({
  type: "LOGOUT_USER",
});
