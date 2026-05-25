import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layout";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <div className="h-screen flex flex-col overflow-hidden">
          <Navbar />
          <Dashboard />
        </div>
      </RootLayout>
    ),
  },
  {
    path: "/share/:id",
    element: (
      <RootLayout>
        <div className="h-screen flex flex-col overflow-hidden">
          <Navbar />
          <Dashboard />
        </div>
      </RootLayout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
