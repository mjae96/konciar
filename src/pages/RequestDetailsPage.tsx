import { useEffect, useState, type ChangeEvent } from "react"
import Autocomplete from "react-google-autocomplete"
import Header from "../components/Header"
import { MdOutlineMail, MdOutlineLocationOn, MdOutlineStorefront, MdOutlineHome, MdCalendarToday } from "react-icons/md"
import type { TOnly } from "../types"
import { loadGoogleMaps } from "../components/GoogleMapsLoader"

const RequestDetailsPage = ({ t }: TOnly) => {
  const [form, setForm] = useState({
    email: "",
    storeName: "",
    storeAddress: "",
    deliveryAddress: "",
    deliveryDetailAddress: "",
    requestedDate: "",
    otherSpecifics: "",
    description: "",
    commonQuestions: {
      reservation: false,
      takeout: false,
      delivery: false,
      parking: false,
      pets: false,
    },
  })

  useEffect(() => {
    loadGoogleMaps()
  }, [])

  // input과 textarea 모두 대응 가능한 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (key: keyof typeof form.commonQuestions) => {
    setForm((prev) => ({
      ...prev,
      commonQuestions: {
        ...prev.commonQuestions,
        [key]: !prev.commonQuestions[key],
      },
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title={t("requestDetails.title")} />

      <div className="p-6 flex flex-col gap-8">
        {/* Email Section */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MdOutlineMail className="text-orange-500 text-lg" />
            {t("requestDetails.email.label")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder={t("requestDetails.email.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-orange-300 shadow-sm"
          />
        </div>

        <div className="border-b border-gray-200"></div>

        {/* Store Name Section */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MdOutlineStorefront className="text-green-500 text-lg" />
            {t("requestDetails.store.label")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="storeName"
            value={form.storeName}
            onChange={handleInputChange}
            placeholder={t("requestDetails.store.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-green-300 shadow-sm"
          />
        </div>

        {/* Store Location Section */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MdOutlineLocationOn className="text-gray-400 text-lg" />
            {t("requestDetails.location.label")}
          </label>
          <Autocomplete
            onPlaceSelected={(place) => {
              setForm((prev) => ({ ...prev, storeAddress: place.formatted_address || "" }))
            }}
            options={{
              types: ["geocode", "establishment"],
              componentRestrictions: { country: "kr" },
            }}
            placeholder={t("requestDetails.location.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-all shadow-sm"
          />
        </div>

        <div className="border-b border-gray-200"></div>

        {/* Delivery Address Section */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MdOutlineHome className="text-indigo-500 text-lg" />
            {t("requestDetails.delivery.label")}
          </label>
          <Autocomplete
            onPlaceSelected={(place) => {
              setForm((prev) => ({ ...prev, deliveryAddress: place.formatted_address || "" }))
            }}
            options={{
              types: ["geocode", "establishment"],
              componentRestrictions: { country: "kr" },
            }}
            placeholder={t("requestDetails.delivery.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MdOutlineHome className="text-gray-500 text-lg" />
            {t("requestDetails.delivery.detailLabel")}
          </label>
          <input
            type="text"
            name="deliveryDetailAddress"
            value={form.deliveryDetailAddress}
            onChange={handleInputChange}
            placeholder={t("requestDetails.delivery.detailPlaceholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 shadow-sm"
          />
        </div>

        <div className="border-b border-gray-200"></div>

        {/* Date & Time Section */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MdCalendarToday className="text-blue-500 text-lg" />
            {t("requestDetails.dateTime.label")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="requestedDate"
            value={form.requestedDate}
            onChange={handleInputChange}
            placeholder={t("requestDetails.dateTime.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 shadow-sm"
          />
        </div>

        <div className="border-b border-gray-200"></div>

        {/* Common Questions Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-gray-700">{t("requestDetails.commonQuestions.title")}</h3>
          <div className="flex flex-col gap-3">
            {[
              { id: "reservation", label: t("requestDetails.commonQuestions.reservation") },
              { id: "takeout", label: t("requestDetails.commonQuestions.takeout") },
              { id: "delivery", label: t("requestDetails.commonQuestions.delivery") },
              { id: "parking", label: t("requestDetails.commonQuestions.parking") },
              { id: "pets", label: t("requestDetails.commonQuestions.pets") },
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50 cursor-pointer hover:bg-white hover:border-indigo-200 transition-all shadow-sm">
                <input
                  type="checkbox"
                  checked={form.commonQuestions[item.id as keyof typeof form.commonQuestions]}
                  onChange={() => handleCheckboxChange(item.id as keyof typeof form.commonQuestions)}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Other Specifics Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">{t("requestDetails.otherSpecifics.label")}</label>
          <input
            type="text"
            name="otherSpecifics"
            value={form.otherSpecifics}
            onChange={handleInputChange}
            placeholder={t("requestDetails.otherSpecifics.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 shadow-sm transition-all"
          />
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">{t("requestDetails.description.label")}</label>
          <textarea
            name="description"
            rows={6}
            value={form.description}
            onChange={handleInputChange}
            placeholder={t("requestDetails.description.placeholder")}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white shadow-sm transition-all resize-none text-sm leading-relaxed"
          />
          <p className="text-[11px] text-gray-400 mt-1 italic">{t("requestDetails.description.example")}</p>
        </div>
      </div>

      <div className="border-b border-gray-200"></div>

      {/* Footer Section */}
      <div className="mt-auto p-6 justify-center items-center flex flex-col gap-2">
        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all">{t("requestDetails.footer.button")}</button>
        <p className="text-sm text-gray-500">{t("requestDetails.footer.notice")}</p>
      </div>
    </div>
  )
}

export default RequestDetailsPage
