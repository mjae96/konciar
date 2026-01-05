import type { TAndI18n } from "../types"
import RequestConciergeButton from "./RequestConciergeButton"

const Hero = ({ t, i18n }: TAndI18n) => {
  const languages = [
    { code: "en", label: "English", lang: "en-US" },
    { code: "zh", label: "中文", lang: "zh-Hans" },
    { code: "ja", label: "日本語", lang: "ja" },
  ]

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  return (
    <header className="w-full h-full px-8 py-15 flex flex-col items-center bg-[#fffdf5]">
      <figure className="w-1/5 mb-10">
        <img src="/logo.png" alt="Concier Logo image" />
      </figure>
      <nav className="mb-5 text-sm" aria-label="Language selection">
        <ul className="flex gap-4 list-none">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => toggleLanguage(lang.code)}
                className={`px-4 py-2 transition-all ${
                  i18n.language === lang.code ? "underline underline-offset-8 decoration-black decoration-2 text-black font-bold" : "text-gray-500 hover:text-gray-700"
                }`}
                lang={lang.lang}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex flex-col gap-4" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-2xl font-bold text-center">
          {t("hero.title")}
        </h1>
        <h2 className="mt-2 text-gray-600 whitespace-pre-wrap text-center">{t("hero.subtitle")}</h2>
        <RequestConciergeButton t={t} />
      </section>
    </header>
  )
}

export default Hero
