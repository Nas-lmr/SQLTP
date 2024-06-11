import Dashboard from "./components/admin/Dashboard";
import Home from "./components/Home";
import UseAuthContext from "./components/contex/useContext";

function PrivateRoutes() {
  const UserFunction = () => {
    const { authUser } = UseAuthContext();

    if (authUser?.user?.userRole === "Admin") {
      return <Dashboard />;
    } else {
      return <Home />;
    }
  };

  return <UserFunction />;
}
export default PrivateRoutes;
