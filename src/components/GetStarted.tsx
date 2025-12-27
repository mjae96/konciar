import type { TOnly } from "../types"
import RequestConciergeButton from "./RequestConciergeButton"

const GetStarted = ({ t }: TOnly) => {
  return (
    <div className="w-full h-full px-14 py-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl mb-4">{t("footer.title")}</h1>
      <RequestConciergeButton t={t} />
    </div>
  )
}

export default GetStarted
