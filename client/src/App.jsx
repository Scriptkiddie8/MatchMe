import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const dummyUserId = "123";

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        MatchMe
      </header>
      <main className="p-4">
        <Routes>
          <Route
            path="/profile/:userId"
            element={<Profile userId={dummyUserId} />}
          />
          <Route
            path="/chat/:matchUserId?"
            element={<ChatPage currentUserId={dummyUserId} />}
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
