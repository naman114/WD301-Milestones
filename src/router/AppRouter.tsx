import { useRoutes } from "raviger";
import About from "../Components/About";
import AppContainer from "../Components/AppContainer";
import FormList from "../Components/FormList";
import Home from "../Components/Home";
import UserForm from "../Components/UserForm";
import Preview from "../Components/Preview";
import Login from "../Components/Login";
import { User } from "../types/userTypes";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/forms": () => <FormList />,
  "/forms/:id": ({ id }: { id: string }) => <UserForm formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <Preview formId={Number(id)} />,
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
