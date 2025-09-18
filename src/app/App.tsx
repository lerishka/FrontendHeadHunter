import {
  Route,
  Navigate,
  createRoutesFromElements,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import VacanciesPage from "../pages/VacanciesPage/VacanciesPage";
import UserPage from "../pages/UserPage/UserPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import VacancyPage from "../pages/VacancyPage/VacancyPage";
import { vacancyLoader } from "../loaders/vacancyLoader";
import { vacanciesLoader } from "../loaders/vacanciesLoader";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/vacancies/moscow" replace />} />
      <Route
        path="vacancies/moscow"
        element={<VacanciesPage />}
        loader={vacanciesLoader}
        errorElement={<NotFoundPage />}
      />
      <Route
        path="vacancies/petersburg"
        element={<VacanciesPage />}
        loader={vacanciesLoader}
        errorElement={<NotFoundPage />}
      />
      <Route
        path="vacancies/:id"
        element={<VacancyPage />}
        loader={vacancyLoader}
        errorElement={<NotFoundPage />}
      />
      <Route path="user" element={<UserPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  {
    basename: "/FrontendHeadHunter",
  }
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
