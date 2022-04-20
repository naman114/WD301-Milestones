import React, { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import { User } from "./types/userTypes";
import { me } from "./utils/apiUtils";
import { userContext } from "./utils/formUtils";

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  // console.log(currentUser);
  setCurrentUser(currentUser);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  useEffect(() => {
    try {
      getCurrentUser(setCurrentUser);
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  }, []);

  return (
    <userContext.Provider value={currentUser}>
      <AppRouter />
    </userContext.Provider>
  );
}

export default App;
