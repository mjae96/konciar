import { IoCallOutline, IoChatboxOutline, IoFlashOutline } from "react-icons/io5"
import type { TOnly } from "../types"

const HowItWorks = ({ t }: TOnly) => {
  return (
    <section className="w-full h-full px-8 py-10 flex flex-col items-center gap-4" aria-labelledby="how-it-works-title">
      <h2 id="how-it-works-title" className="text-2xl mb-8">
        {t("howItWorks.title")}
      </h2>
      <ul className="list-none flex flex-col gap-6 w-full">
        <li className="flex flex-row w-full gap-4">
          <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-orange-100/50 rounded-2xl" aria-hidden="true">
            <IoChatboxOutline className="w-8 h-8 text-orange-700" />
          </div>
          <article className="flex flex-col text-start justify-center">
            <h3 className="">{t("howItWorks.step1.title")}</h3>
            <p className="text-gray-500 text-sm">{t("howItWorks.step1.desc")}</p>
          </article>
        </li>
        <li className="flex flex-row w-full gap-4">
          <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gray-100/50 rounded-2xl" aria-hidden="true">
            <IoCallOutline className="w-8 h-8 text-gray-700" />
          </div>
          <article className="flex flex-col text-start justify-center">
            <h3 className="">{t("howItWorks.step2.title")}</h3>
            <p className="text-gray-500 text-sm">{t("howItWorks.step2.desc")}</p>
          </article>
        </li>
        <li className="flex flex-row w-full gap-4">
          <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-yellow-100/50 rounded-2xl" aria-hidden="true">
            <IoFlashOutline className="w-8 h-8 text-yellow-700" />
          </div>
          <article className="flex flex-col text-start justify-center">
            <h3 className="">{t("howItWorks.step3.title")}</h3>
            <p className="text-gray-500 text-sm">{t("howItWorks.step3.desc")}</p>
          </article>
        </li>
      </ul>
    </section>
  )
}
export default HowItWorks
