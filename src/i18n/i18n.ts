import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import HttpApi from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(HttpApi) // 번역 파일 비동기 로딩
  .use(LanguageDetector) // 브라우저 언어 감지 및 로컬스토리지 저장
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // 기본 언어
    debug: import.meta.env.DEV, // 개발 모드에서 로그 확인

    interpolation: {
      escapeValue: false,
    },

    backend: {
      // 번역 파일 경로 설정
      loadPath: "/locales/{{lng}}/translation.json",
    },

    detection: {
      order: ["queryString", "cookie", "localStorage"],
      caches: ["localStorage"], // 사용자가 선택한 언어를 로컬스토리지에 저장
    },
  })

export default i18n
