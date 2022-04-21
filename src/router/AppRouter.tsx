import { useRoutes } from "raviger";
import About from "../Components/About";
import AppContainer from "../Components/AppContainer";
import FormList from "../Components/FormList";
import Home from "../Components/Home";
import UserForm from "../Components/UserForm";
import Preview from "../Components/Preview";
import Login from "../Components/Login";
import { useContext } from "react";
import { userContext } from "../utils/formUtils";

export default function AppRouter() {
  const currentUser = useContext(userContext);

  const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
    "/about": () => <About />,
    "/forms": () => <FormList />,
    "/forms/:id": ({ id }: { id: string }) =>
      currentUser.status === "NOT_AUTHENTICATED" ? (
        <Login />
      ) : (
        <UserForm formId={Number(id)} />
      ),
    "/preview/:id": ({ id }: { id: string }) =>
      currentUser.status === "NOT_AUTHENTICATED" ? (
        <Login />
      ) : (
        <Preview formId={Number(id)} />
      ),
  };

  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
