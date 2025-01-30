import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      {<RouterProvider router={router} />}
      <Toaster />
    </div>
  );
}
