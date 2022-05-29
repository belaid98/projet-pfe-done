import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "Components/Menu/Menu";
/*import Footer from "Components/Footer/Footer";*/
import Footerv2 from "Components/Footer/Footerv2";
import ErrorInterceptor from "Interceptors/ErrorInterceptor";
import AuthContext from "Services/AuthContext";
import { PanierProvider } from "Services/PanierContext";

function UserApp() {
  const [bar, setBar] = React.useState(true);
  const { logOut } = React.useContext(AuthContext);

  //Checks for path to customize the UI
  // URL detection
  let location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/404") {
      setBar(false);
    } else {
      setBar(true);
    }
  }, [location]);

  return (
    <PanierProvider>
      <ErrorInterceptor logOut={logOut}>
        {/* Menu will be shown in all the routes if bar is true */}
        {bar && <Menu />}

        {/* Website routes */}
        <div className="app-container" id="app-container">
          <Outlet />
          {bar && <Footerv2 />}
        </div>
      </ErrorInterceptor>
    </PanierProvider>
  );
}

export default UserApp;
