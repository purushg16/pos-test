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
      <MenuBar />
      <Box id="main" height="100%" overflowY="scroll" zIndex={999}>
        <Outlet />
      </Box>
      <BarcodeScanner />
    </>
  );
};

export default Layout;
