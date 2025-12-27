import { IoCallOutline, IoChatboxOutline, IoFlashOutline } from "react-icons/io5"
import type { TOnly } from "../types"

const HowItWorks = ({ t }: TOnly) => {
  return (
    <div className="w-full h-full px-14 py-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl mb-8">{t("howItWorks.title")}</h1>
      <div className="flex flex-row w-full gap-4">
        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-orange-100/50 rounded-2xl">
          <IoChatboxOutline className="w-8 h-8 text-orange-700" />
        </div>
        <div className="flex flex-col text-start justify-center">
          <p className="">{t("howItWorks.step1.title")}</p>
          <p className="text-gray-500 text-sm">{t("howItWorks.step1.desc")}</p>
        </div>
      </div>
      <div className="flex flex-row w-full gap-4">
        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gray-100/50 rounded-2xl">
          <IoCallOutline className="w-8 h-8 text-gray-700" />
        </div>
        <div className="flex flex-col text-start justify-center">
          <p className="">{t("howItWorks.step2.title")}</p>
          <p className="text-gray-500 text-sm">{t("howItWorks.step2.desc")}</p>
        </div>
      </div>
      <div className="flex flex-row w-full gap-4">
        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-yellow-100/50 rounded-2xl">
          <IoFlashOutline className="w-8 h-8 text-yellow-700" />
        </div>
        <div className="flex flex-col text-start justify-center">
          <p className="">{t("howItWorks.step3.title")}</p>
          <p className="text-gray-500 text-sm">{t("howItWorks.step3.desc")}</p>
        </div>
      </div>
    </div>
  )
}
export default HowItWorks
