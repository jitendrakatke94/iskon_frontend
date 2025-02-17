import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Router from './routes';
import { EventProvider } from "./context/EventContext";
function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
