import type { TAndI18n } from "../types"
import RequestConciergeButton from "./RequestConciergeButton"

const Hero = ({ t, i18n }: TAndI18n) => {
  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className="w-full h-full px-14 py-15 flex flex-col items-center bg-[#fffdf5]">
      <div className="w-1/5 mb-10">
        <img src="/public/logo.png" alt="Logo" />
      </div>
      <div className="flex gap-2 mb-5 text-sm">
        <button onClick={() => toggleLanguage("en")} className={`px-4 py-2 ${i18n.language === "en" ? "underline underline-offset-4 text-black font-bold" : "text-gray-500"}`}>
          English
        </button>
        <button onClick={() => toggleLanguage("zh")} className={`px-4 py-2 ${i18n.language === "zh" ? "underline underline-offset-4 text-black font-bold" : "text-gray-500"}`}>
          中文
        </button>
        <button onClick={() => toggleLanguage("ja")} className={`px-4 py-2 ${i18n.language === "ja" ? "underline underline-offset-4 text-black font-bold" : "text-gray-500"}`}>
          日本語
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold text-center">{t("hero.title")}</div>
        <div className="mt-2 text-gray-600 whitespace-pre-wrap text-center">{t("hero.subtitle")}</div>
        <RequestConciergeButton t={t} />
      </div>
    </div>
  )
}

export default Hero
