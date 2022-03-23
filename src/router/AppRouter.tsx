import { useRoutes } from "raviger";
import About from "../Components/About";
import AppContainer from "../Components/AppContainer";
import FormList from "../Components/FormList";
import Home from "../Components/Home";
import UserForm from "../Components/UserForm";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms": () => <FormList />,
  "/forms/:id": ({ id }: { id: string }) => <UserForm formId={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}