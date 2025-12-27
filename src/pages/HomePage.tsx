import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import WhatCanHelp from "../components/WhatCanHelp"
import GetStarted from "../components/GetStarted"
import type { TAndI18n } from "../types"

const HomePage = ({ t, i18n }: TAndI18n) => {
  return (
    <div className="w-full min-h-screen">
      <Hero t={t} i18n={i18n} />
      <HowItWorks t={t} />
      <WhatCanHelp t={t} />
      <GetStarted t={t} />
    </div>
  )
}

export default HomePage
