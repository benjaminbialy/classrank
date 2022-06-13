import "../styles/globals.css";

import UserContext from "../Contexts/UserContext";
import { AuthService } from "../firebase/Auth";

function MyApp({ Component, pageProps }) {
  const userStatus = AuthService();

  return (
    <UserContext.Provider value={userStatus}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
