import InfoMessage from "./components/Shared/InfoMessage/InfoMessage";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/HomePage/HomePage";
import Catalog from "./components/Catalog/Catalog";
import Details from "./components/Details/Details";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import CommentCreate from "./components/Details/Comments/CommentCreate/CommentCreate";
import Profile from "./components/Auth/Profile/Profile";
import Logout from "./components/Auth/Logout/Logout";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import { RouteGuard } from "./components/common/RouteGuard";
import { LoggedUserGuard } from "./components/common/LoggedUserGuard";

import "./App.css";

function App() {
  // TODO finish the errors
  // const [errors, setErrors] = useState({});

  return (
    <AuthProvider>
      {/* In case of Error or Success */}
      <InfoMessage />

      <Header />

      <main>
        <GameProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:gameId" element={<Details />} />

            <Route element={<RouteGuard />}>
              <Route path="/create-product" element={<Create />} />
              <Route path="/edit/:gameId" element={<Edit />} />
              <Route path="/delete/:gameId" element={<DeleteProduct />} />
              <Route path="/create-comment/:gameId" element={<CommentCreate />} />
              <Route path="/auth/profile" element={<Profile />} />
              <Route path="/auth/logout" element={<Logout />} />
            </Route>

            <Route element={<LoggedUserGuard />}>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </GameProvider>
      </main>

      <Footer />
    </AuthProvider>
  );
}

export default App;
