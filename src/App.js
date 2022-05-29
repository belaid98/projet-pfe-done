import React from "react";
import "./App.css";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";

import { AuthProvider } from "Services/AuthContext";
import { AdminAuthProvider } from "Services/AdminAuthContext";
import { CommandProvider } from "Services/CommandContext";

import LoadingFull from "Components/Loading/LoadingFull";
import LoadingContained from "Components/Loading/LoadingContained";

import SignInAdmin from "Pages/Admin/SignInAdmin/SignInAdmin";
import SignIn from "Pages/Authentification/SignIn/SignIn";
import SignUp from "Pages/Authentification/SignUp/SignUp";

import UserApp from "Pages/User/UserApp";
import AdminApp from "Pages/Admin/AdminApp";
import HomePage from "Pages/User/Home/HomePage";
import NotFoundPage from "Pages/404/NotFoundPage";

/* LAYOUT COMPONENTS */
import DashboardLayout from "Pages/Admin/DashboardLayout/DashboardLayout";
import PeriodePages from "Pages/Admin/periodes/PeriodePages";
import OuvragePages from "Pages/Admin/ouvrages/OuvragePages";
import BilletPages from "Pages/Admin/billets/BilletPages";
import PiecePages from "Pages/Admin/pieces/PiecePages";
import UserPages from "Pages/Admin/users/UserPages";
import Checkout from "Pages/User/CheckOut/Checkout";
import ListCommands from "Pages/Admin/commandes/ListCommands/ListCommands";
import CommandPages from "Pages/Admin/commandes/CommandPages";

const Dashboard = React.lazy(() => import("Pages/Admin/Dashboard/Dashboard"));

/* Periodes Lazy Loaded */
const ListPeriodes = React.lazy(() =>
  import("Pages/Admin/periodes/ListPeriodes/ListPeriodes")
);
const PeriodeForm = React.lazy(() =>
  import("Pages/Admin/periodes/PeriodeForm/PeriodeForm")
);

/* Billets Lazy Loaded */
const ListBillets = React.lazy(() =>
  import("Pages/Admin/billets/ListBillets/ListBillets")
);
const BilletForm = React.lazy(() =>
  import("Pages/Admin/billets/BilletForm/BilletForm")
);

/* Pieces Lazy Loaded */
const ListPieces = React.lazy(() =>
  import("Pages/Admin/pieces/ListPieces/ListPieces")
);
const PieceForm = React.lazy(() =>
  import("Pages/Admin/pieces/PieceForm/PieceForm")
);

/* Ouvrages Lazy Loaded */
const ListOuvrages = React.lazy(() =>
  import("Pages/Admin/ouvrages/ListOuvrages/ListOuvrages")
);
const OuvrageForm = React.lazy(() =>
  import("Pages/Admin/ouvrages/OuvrageForm/OuvrageForm")
);

/* Ouvrages Lazy Loaded */
const ListUsers = React.lazy(() =>
  import("Pages/Admin/users/ListUsers/ListUsers")
);
const UserForm = React.lazy(() =>
  import("Pages/Admin/users/UserForm/UserForm")
);

const BoutiquePage = React.lazy(() =>
  import("Pages/User/E_Boutique/BoutiquePage")
);

function App() {
  smoothscroll.polyfill();
  const navigate = useNavigate();

  const [top, setTop] = React.useState(false);
  const [backButton, setbackButton] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setTop(true);
      } else {
        setTop(false);
      }
    });
    return function cleanup() {
      window.removeEventListener("scroll", () => {});
    };
  });
  //Checks for path to customize the UI
  // URL detection
  let location = useLocation();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    /*
      window.scrollTo(0, 0);
    */
    setTop(false);
  };

  React.useEffect(() => {
    //Scrolls to top of page each time route changes
    if (location.hash) {
      const yOffset = -80;
      const element = document.querySelector(location.hash);
      console.log(element);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      /* document
        
        .scrollIntoView({ offset: 80, behavior: "smooth" }); */
    } else {
      scrollTop();
    }

    // Sets the back button's visibility
    if (location.pathname === "/") {
      setbackButton(false);
    } else {
      setbackButton(true);
    }
    // Sets the navigation buttons' visibility
    if (location.pathname.includes("admin")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    return () => {};
  }, [location]);

  return (
    <>
      <div id="top"></div>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <UserApp />
            </AuthProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="/E_boutique"
            element={
              <React.Suspense fallback={<LoadingFull />}>
                <BoutiquePage />
              </React.Suspense>
            }
          />
          <Route
            path="commander"
            element={
              <CommandProvider>
                <Checkout />
              </CommandProvider>
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        <Route
          path="admin"
          element={
            <AdminAuthProvider>
              <AdminApp />
            </AdminAuthProvider>
          }
        >
          <Route path="sign-in" element={<SignInAdmin />} />
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route
              index
              element={
                <React.Suspense fallback={<LoadingContained />}>
                  <Dashboard />
                </React.Suspense>
              }
            />

            <Route path="utilisateurs" element={<UserPages />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <ListUsers />
                  </React.Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <UserForm />
                  </React.Suspense>
                }
              />
            </Route>

            <Route path="billets" element={<BilletPages />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <ListBillets />
                  </React.Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <BilletForm />
                  </React.Suspense>
                }
              />
            </Route>

            <Route path="commandes" element={<CommandPages />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <ListCommands />
                  </React.Suspense>
                }
              />
            </Route>

            <Route path="ouvrages" element={<OuvragePages />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <ListOuvrages />
                  </React.Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <OuvrageForm />
                  </React.Suspense>
                }
              />
            </Route>

            <Route path="periodes" element={<PeriodePages />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <ListPeriodes />
                  </React.Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <PeriodeForm />
                  </React.Suspense>
                }
              />
            </Route>

            <Route path="pieces" element={<PiecePages />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <ListPieces />
                  </React.Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <React.Suspense fallback={<LoadingContained />}>
                    <PieceForm />
                  </React.Suspense>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>

      {visible && backButton && (
        <div className="nav-back">
          <Fab
            variant="extended"
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardArrowLeft /> Retour
          </Fab>
        </div>
      )}

      {visible && (
        <div className="nav-top">
          <Zoom in={top} unmountOnExit>
            <Fab size="medium" color="primary" onClick={scrollTop}>
              <UpIcon />
            </Fab>
          </Zoom>
        </div>
      )}
    </>
  );
}

export default App;
