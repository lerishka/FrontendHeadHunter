import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import VacanciesPage from "../pages/VacanciesPage/VacanciesPage";
import IdVacancyPage from "../pages/VacancyPage/VacancyPage";
import UserPage from "../pages/UserPage/UserPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/vacancies" element={<MainLayout />}>
          <Route index element={<VacanciesPage />} />
          {/* <Route path="vacancies" element={<VacanciesPage />} /> */}
          <Route path=":id" element={<IdVacancyPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
