import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

//data
// import { AllDataLoader } from "./functions/LoadAllData";

//pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails, { eventDetailsLoader } from "./pages/EventDetails";
import Form from "./pages/Form";
import UserCheckComponent, { userLoader } from "./components/UserCheckFrom";

//layout
import RootLayout from "./layouts/RootLayout";
import EventListLayout, { eventsLoader } from "./layouts/EventListLayout";
import FormLayout from "./layouts/FormLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="events/form" element={<FormLayout />}>
        <Route index element={<Form />} loader={userLoader} />
      </Route>

      <Route path="events" element={<EventListLayout />}>
        <Route index element={<Events />} loader={eventsLoader} />
        <Route
          path="user"
          element={<UserCheckComponent />}
          loader={userLoader}
        />

        <Route
          path=":id"
          element={<EventDetails />}
          loader={eventDetailsLoader}
        />
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
