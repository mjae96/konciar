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
    <section className="w-full h-full px-8 py-10 flex flex-col items-center gap-4" aria-labelledby="services-title">
      <h2 id="services-title" className="text-2xl mb-8">{t("services.title")}</h2>
      <ul className="grid grid-cols-2 gap-4 w-full list-none">
        {SERVICE_ITEMS.map((item) => (
          <li key={item.id} className="flex items-center gap-3 h-16 p-4 border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors bg-white">
            <span className="text-xl text-gray-600" aria-hidden="true">
              {item.icon}
            </span>
            <p className="text-sm font-medium text-gray-800 text-left">{t(`services.items.${item.id}`)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WhatCanHelp
