import { Box } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useTokenStore from "../functions/store/token";
import BarcodeScanner from "./Billings/BarcodeBiller";
import { MenuBar } from "./Menu/MenuBar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setCurrentUserType = useTokenStore((s) => s.setCurrentUserType);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    } else {
      setCurrentUserType(
        (jwtDecode(localStorage.getItem("token")!) as { userName: string })
          .userName
      );
    }
  }, []);

  return (
    <>
      {location.pathname !== "/bill" ? (
        <>
          <MenuBar />
          <Box id="main" height="100%" overflowY="scroll">
            <Outlet />
          </Box>
          <BarcodeScanner />
        </>
      ) : (
        <>
          <Box id="main" height="100%">
            <Outlet />
          </Box>
        </>
      )}
    </>
  );
};

export default Layout;
