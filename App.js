import React from "react";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { AuthProvider } from "./src/context/AuthContext";
import MenuNavigation from "./src/navigation/MenuNavigation";

const App = () => {
  return (
    <AuthProvider>
      <AuthNavigation />
    </AuthProvider>
  );
};

export default App;