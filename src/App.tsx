import { Route, Routes } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import ChooseRequestPage from "./pages/ChooseRequestPage"
import { useTranslation } from "react-i18next"
import RequestDetailsPage from "./pages/RequestDetailsPage"

function App() {
  const { t, i18n } = useTranslation()
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage t={t} i18n={i18n} />} />
        <Route path="/choose-request" element={<ChooseRequestPage t={t} />} />
        <Route path="/request-details" element={<RequestDetailsPage t={t} />} />
      </Routes>
    </div>
  )
}

export default App
