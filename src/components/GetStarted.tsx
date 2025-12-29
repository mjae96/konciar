import type { TOnly } from "../types"
import RequestConciergeButton from "./RequestConciergeButton"

const GetStarted = ({ t }: TOnly) => {
  return (
    <footer className="w-full h-full px-8 py-10 flex flex-col items-center gap-4">
      <h2 className="text-2xl mb-4">{t("footer.title")}</h2>
      <RequestConciergeButton t={t} />
    </footer>
  )
}

export default GetStarted
