import { useNavigate } from "react-router-dom"
import { MdCheckCircleOutline, MdOutlineRateReview, MdClose } from "react-icons/md"
import { useState, useEffect } from "react"
import type { TOnly } from "../types"

const SuccessPage = ({ t }: TOnly) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const hasParticipated = localStorage.getItem("hasParticipatedReview")
    if (hasParticipated !== "true") {
      const timer = setTimeout(() => setShowModal(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    localStorage.setItem("hasParticipatedReview", "true")
    setShowModal(false)
  }

  const handleReviewClick = () => {
    const googleFormUrl = "" // 연결 필요
    window.open(googleFormUrl, "_blank")
    localStorage.setItem("hasParticipatedReview", "true")
    setShowModal(false)
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-white text-center">
      {/* 메인 성공 콘텐츠 */}
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <MdCheckCircleOutline className="text-green-500 text-8xl" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{t("requestDetails.success.title")}</h1>
          <p className="text-gray-500 leading-relaxed">{t("requestDetails.success.description")}</p>
        </div>
        <button onClick={() => navigate("/")} className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-all">
          {t("requestDetails.success.button")}
        </button>
      </div>

      {/* 후기 유도 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            {/* 닫기 버튼 */}
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <MdClose size={24} />
            </button>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <MdOutlineRateReview className="text-orange-500 text-3xl" />
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-gray-900">{t("requestDetails.review.title") || "Share Your Feedback!"}</h2>
                <p className="text-sm text-gray-600 leading-relaxed px-2">
                  {t("requestDetails.review.description") ||
                    "We are testing this service to prepare for our startup launch. We’d be truly grateful for your feedback—both criticism and positive responses are incredibly valuable to us."}
                </p>
              </div>

              <div className="flex flex-col w-full gap-2 mt-2">
                <button onClick={handleReviewClick} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors shadow-orange-200 shadow-lg">
                  {t("requestDetails.review.button") || "Take a 1-min Survey"}
                </button>
                <button onClick={closeModal} className="w-full py-3 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors">
                  {t("requestDetails.review.close") || "Maybe later"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuccessPage
