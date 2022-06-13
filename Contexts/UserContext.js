import { createContext } from "react";

// user data which is used throughout application
const UserContext = createContext({
  authenticated: false,
  uid: "",
  userName: "",
  picUrl: "",
});

export default UserContext;
