import {
  Navigate,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import authStore from "../functions/store/authStore";
import router from "../routing/router";
import "./App.css";

function App() {
  const currentUser = authStore((s) => s.currentUser);
  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div id="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
