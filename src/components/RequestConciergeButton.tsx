import type { TOnly } from "../types"
import { useNavigate } from "react-router-dom"

const RequestConciergeButton = ({ t }: TOnly) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/choose-request")
  }
  return (
    <button type="button" className="w-full text-lg rounded-2xl mt-4 px-6 py-3 bg-[#1d2838] text-white" onClick={handleClick} aria-label="Request Concierge Service">
      {t("hero.cta")}
    </button>
  )
}

export default RequestConciergeButton
