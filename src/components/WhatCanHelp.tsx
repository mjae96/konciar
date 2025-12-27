import type { TOnly } from "../types"
import { IoRestaurantOutline, IoBagHandleOutline, IoCubeOutline, IoMedicalOutline, IoPawOutline, IoHappyOutline, IoPeopleOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5"

const SERVICE_ITEMS = [
  { id: "restaurant", icon: <IoRestaurantOutline /> },
  { id: "takeout", icon: <IoBagHandleOutline /> },
  { id: "delivery", icon: <IoCubeOutline /> },
  { id: "hospital", icon: <IoMedicalOutline /> },
  { id: "pet", icon: <IoPawOutline /> },
  { id: "child", icon: <IoHappyOutline /> },
  { id: "group", icon: <IoPeopleOutline /> },
  { id: "free", icon: <IoChatbubbleEllipsesOutline /> },
]
const WhatCanHelp = ({ t }: TOnly) => {
  return (
    <div className="w-full h-full px-14 py-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl mb-8">{t("services.title")}</h1>
      <div className="grid grid-cols-2 gap-4 w-full">
        {SERVICE_ITEMS.map((item) => (
          <button key={item.id} className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors bg-white">
            {/* 아이콘 영역 */}
            <span className="text-xl text-gray-600">{item.icon}</span>

            {/* 텍스트 영역: t(item.key)로 반복 처리 */}
            <span className="text-sm font-medium text-gray-800 text-left">{t(`services.items.${item.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default WhatCanHelp
