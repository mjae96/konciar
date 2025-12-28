import { useState } from "react"
import Header from "../components/Header"
import type { TOnly } from "../types"
import { IoRestaurantOutline, IoBagHandleOutline, IoInformationOutline, IoMedicalOutline } from "react-icons/io5"
import { TbTruckDelivery } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const REQUEST_OPTIONS = [
  {
    key: "reservation",
    icon: <IoRestaurantOutline />,
    styles: {
      activeBorder: "border-orange-400",
      activeBg: "bg-orange-50",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  },
  {
    key: "takeout",
    icon: <IoBagHandleOutline />,
    styles: {
      activeBorder: "border-amber-400",
      activeBg: "bg-amber-50",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  },
  {
    key: "delivery",
    icon: <TbTruckDelivery />,
    styles: {
      activeBorder: "border-blue-400",
      activeBg: "bg-blue-50",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
  },
  {
    key: "info",
    icon: <IoInformationOutline />,
    styles: {
      activeBorder: "border-purple-400",
      activeBg: "bg-purple-50",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  },
  {
    key: "hospital",
    icon: <IoMedicalOutline />,
    styles: {
      activeBorder: "border-green-400",
      activeBg: "bg-green-50",
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
  },
]

const ChooseRequestPage = ({ t }: TOnly) => {
  const [selected, setSelected] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleNext = () => {
    if (selected) {
      sessionStorage.setItem("requestType", selected)
      navigate("/request-details")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title={t("requestType.requestTitle")} />

      {/* 상단 안내 배너 */}
      <div className="w-full h-24 p-6 flex flex-col justify-center items-start bg-[#fefbe9] gap-1">
        <p className="font-medium text-gray-800">{t("requestType.requestSubTitle")}</p>
        <p className="text-sm text-gray-500">{t("requestType.selectOption")}</p>
      </div>

      {/* 요청 항목 리스트 */}
      <div className="flex flex-col gap-3 p-4">
        {REQUEST_OPTIONS.map((item) => {
          const isSelected = selected === item.key

          return (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              className={`
                flex items-center w-full p-4 rounded-2xl border-2 transition-all duration-200
                ${isSelected ? `${item.styles.activeBorder} ${item.styles.activeBg} shadow-sm` : "border-gray-100 bg-white hover:border-gray-200"}
              `}
            >
              {/* 왼쪽 아이콘 박스 */}
              <div
                className={`
                w-12 h-12 shrink-0 flex items-center justify-center rounded-xl mr-4
                ${item.styles.iconBg} ${item.styles.iconColor}
              `}
              >
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* 중앙 텍스트 정보 */}
              <div className="flex flex-col text-left flex-1">
                <p className="font-semibold text-gray-800">{t(`requestType.items.${item.key}.title`)}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t(`requestType.items.${item.key}.desc`)}</p>
              </div>

              {/* 오른쪽 라디오 버튼 이미지 */}
              <div
                className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${isSelected ? `border-gray-800 bg-gray-800` : "border-gray-300"}
              `}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* 하단 버튼 (선택 시 활성화) */}
      <div className="mt-auto p-4">
        <button disabled={!selected} className={`w-full py-4 rounded-xl font-bold transition-colors ${selected ? "bg-slate-900 text-white" : "bg-gray-200 text-gray-400"}`} onClick={handleNext}>
          {selected ? "Next" : "Select an option"}
        </button>
      </div>
    </div>
  )
}

export default ChooseRequestPage
