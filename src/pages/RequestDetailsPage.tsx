import { useEffect, useState, type ChangeEvent } from "react"
import Header from "../components/Header"
import { MdOutlineMail, MdOutlineStorefront, MdOutlineHome, MdCalendarToday } from "react-icons/md"
import type { AddressItem, TOnly } from "../types"
import { loadGoogleMaps } from "../components/GoogleMapsLoader"
import emailjs from "@emailjs/browser"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { format } from "date-fns"
import BookingPickerDrawer from "../components/BookingPickerDrawer"
import AddressSearchDrawer from "../components/AddressSearchDrawer"

const RequestDetailsPage = ({ t }: TOnly) => {
  const [requestType, setRequestType] = useState<string>("")
  const [form, setForm] = useState({
    email: "",
    storeName: "",
    storeAddress: "",
    deliveryAddress: "",
    deliveryDetailAddress: "",
    requestedDate: "",
    guests: 1,
    alternativeTime: "",
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
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isCalendarDrawerOpen, setIsCalendarDrawerOpen] = useState<boolean>(false)
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState<boolean>(false)
  const [activeAddressType, setActiveAddressType] = useState<"store" | "delivery">("store")
  const navigate = useNavigate()

  const handleAddressSelect = (selectedItem: AddressItem) => {
    setForm((prev) => {
      if (activeAddressType === "store") {
        return {
          ...prev,
          storeName: selectedItem.address,
          storeAddress: selectedItem.roadAddress,
        }
      } else {
        return {
          ...prev,
          deliveryAddress: selectedItem.roadAddress + " " + (selectedItem.address || ""),
        }
      }
    })
  }

  useEffect(() => {
    setRequestType(sessionStorage.getItem("requestType") || "")
    loadGoogleMaps()
  }, [])

  // 이메일 유효성 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isEmailInvalid = form.email.length > 0 && !emailRegex.test(form.email)

  const isFormValid = () => {
    const isCommonValid = form.email.trim() !== "" && emailRegex.test(form.email) && form.storeName.trim() !== ""

    if (!isCommonValid) return false

    // 타입 별 유효성 검사
    if (requestType === "reservation") {
      return form.requestedDate.trim() !== ""
    }

    if (requestType === "delivery") {
      return form.deliveryAddress.trim() !== ""
    }

    return true
  }

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

  const handleBookingConfirm = (data: { date: Date | null; guests: number }) => {
    if (data.date) {
      setForm((prev) => ({
        ...prev,
        requestedDate: format(data.date as Date, "yyyy.MM.dd HH:mm"),
        guests: data.guests,
      }))
    }
  }

  const handleSubmit = async () => {
    if (!isFormValid() || isSending) return
    setIsSending(true)
    const loadingToast = toast.loading(t("requestDetails.sending") || "Sending request...")

    // 1. 체크박스에서 true인 항목만 콤마로 연결, 없으면 None
    const selectedQuestions = Object.entries(form.commonQuestions)
      .filter(([_, value]) => value === true)
      .map(([key]) => key)
      .join(", ")

    // 2. 전송할 데이터 가공 (빈 값은 "None" 처리)
    const templateParams = {
      request_type: requestType || "General Inquiry",
      user_email: form.email,
      store_name: form.storeName,
      store_address: form.storeAddress || "None",
      delivery_info: requestType === "delivery" ? `${form.deliveryAddress} ${form.deliveryDetailAddress}`.trim() || "None" : "N/A",
      requested_date: form.requestedDate || "None",
      guests: requestType === "reservation" ? form.guests.toString() : "None",
      alternative_time: form.alternativeTime || "None",
      check_list: selectedQuestions || "None",
      other_questions: form.otherSpecifics || "None",
      message: form.description || "None",
    }

    try {
      const result = await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

      if (result.status === 200) {
        toast.dismiss(loadingToast) // 로딩 토스트 제거
        sessionStorage.removeItem("requestType") // 데이터 정리
        navigate("/success")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      toast.dismiss(loadingToast)
      toast.error(t("requestDetails.errorMessage") || "Failed to send request. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title={t(`requestDetails.requestType.${requestType}`)} />

      <main className="flex-1">
        <form
          className="p-6 flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          {/* Email Section */}
          <section className="flex flex-col gap-2">
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
            {isEmailInvalid && <p className="text-xs text-red-500 ml-1 mt-1 font-medium">{t("requestDetails.email.error")}</p>}
          </section>

          <hr className="border-b border-gray-200" />

          {/* Store Name Section */}
          <section className="flex flex-col gap-2">
            <label htmlFor="storeLocationByGoogleMap" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MdOutlineStorefront className="text-green-500 text-lg" />
              {t("requestDetails.store.label")} <span className="text-red-500">*</span>
            </label>
            <input
              id="storeLocationByGoogleMap"
              type="text"
              readOnly
              // 선택된 주소를 표시하되, 아직 선택 안 됐다면 플레이스홀더 표시
              value={form.storeName || ""}
              onClick={() => {
                setActiveAddressType("store")
                setIsAddressDrawerOpen(true)
              }}
              placeholder={t("requestDetails.location.placeholder")}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-green-300 transition-all shadow-sm cursor-pointer"
            />
          </section>

          <hr className="border-b border-gray-200" />

          {/* Delivery Address Section */}
          {requestType === "delivery" && (
            <section className="flex flex-col gap-6" aria-labelledby="delivery-address-header">
              <h2 id="delivery-address-header" className="sr-only">
                Delivery Information
              </h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="deliveryAddressByGoogleMap" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MdOutlineHome className="text-indigo-500 text-lg" />
                  {t("requestDetails.delivery.label")} <span className="text-red-500">*</span>
                </label>
                <input
                  id="deliveryAddressByGoogleMap"
                  type="text"
                  readOnly
                  value={form.deliveryAddress}
                  onClick={() => {
                    setActiveAddressType("delivery")
                    setIsAddressDrawerOpen(true)
                  }}
                  placeholder={t("requestDetails.delivery.placeholder")}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-all shadow-sm cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="deliveryDetailAddress" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MdOutlineHome className="text-gray-500 text-lg" />
                  {t("requestDetails.delivery.detailLabel")}
                </label>
                <input
                  type="text"
                  id="deliveryDetailAddress"
                  name="deliveryDetailAddress"
                  value={form.deliveryDetailAddress}
                  onChange={handleInputChange}
                  placeholder={t("requestDetails.delivery.detailPlaceholder")}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 shadow-sm"
                />
              </div>

              <hr className="border-b border-gray-200" />
            </section>
          )}

          {/* Date & Time Section */}
          {(requestType === "reservation" || requestType === "hospital") && (
            <section className="flex flex-col gap-8" aria-labelledby="date-time-header">
              <h2 className="sr-only">Reservation Information</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="requestedDate" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MdCalendarToday className="text-blue-500 text-lg" />
                  {t("requestDetails.dateTime.label")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="requestedDate"
                  name="requestedDate"
                  value={form.requestedDate ? `${form.requestedDate} ${form.guests}${t("reservation.numbers") || "ppl"}` : ""}
                  readOnly
                  onClick={() => setIsCalendarDrawerOpen(true)}
                  placeholder={t("requestDetails.dateTime.placeholder")}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="alternativeTime" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MdCalendarToday className="text-blue-300 text-lg" />
                  {t("requestDetails.alternativeTime.label") || "alternativeTime Time & Days"}
                </label>
                <input
                  type="text"
                  id="alternativeTime"
                  name="alternativeTime"
                  value={form.alternativeTime}
                  onChange={handleInputChange}
                  placeholder={t("requestDetails.alternativeTime.placeholder") || "e.g. Weekdays after 6 PM, or Weekends"}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 shadow-sm"
                />
              </div>

              <hr className="border-b border-gray-200" />
            </section>
          )}

          {/* Common Questions Section */}
          <fieldset className="flex flex-col gap-4">
            <legend className="text-sm font-medium text-gray-700 mb-3">{t("requestDetails.commonQuestions.title")}</legend>
            <ul className="flex flex-col gap-3 list-none">
              {[
                { id: "reservation", label: t("requestDetails.commonQuestions.reservation") },
                { id: "takeout", label: t("requestDetails.commonQuestions.takeout") },
                { id: "delivery", label: t("requestDetails.commonQuestions.delivery") },
                { id: "parking", label: t("requestDetails.commonQuestions.parking") },
                { id: "pets", label: t("requestDetails.commonQuestions.pets") },
              ]
                .filter((item) => {
                  // 각 타입별로 보여줄 ID 정의
                  const visibleFields: Record<string, string[]> = {
                    hospital: ["parking"],
                    reservation: ["reservation", "parking", "pets"],
                    delivery: ["takeout", "delivery"],
                  }

                  // 현재 requestType에 해당하는 설정 가져오기 (없으면 전체 노출)
                  const allowedIds = visibleFields[requestType]

                  // 설정이 있으면 포함 여부 확인, 설정이 없으면(기본값) 모든 항목 노출
                  return allowedIds ? allowedIds.includes(item.id) : true
                })
                .map((item) => (
                  <li key={item.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 shadow-sm">
                    <label htmlFor={item.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        id={item.id}
                        type="checkbox"
                        checked={form.commonQuestions[item.id as keyof typeof form.commonQuestions]}
                        onChange={() => handleCheckboxChange(item.id as keyof typeof form.commonQuestions)}
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                    </label>
                  </li>
                ))}
            </ul>
          </fieldset>

          {/* Other Specifics Section */}
          <section className="flex flex-col gap-2">
            <label htmlFor="specificQuestion" className="text-sm font-medium text-gray-700">
              {t("requestDetails.otherSpecifics.label")}
            </label>
            <input
              id="specificQuestion"
              type="text"
              name="otherSpecifics"
              value={form.otherSpecifics}
              onChange={handleInputChange}
              placeholder={t("requestDetails.otherSpecifics.placeholder")}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 shadow-sm transition-all"
            />
          </section>

          {/* Description Section */}
          <section className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              {t("requestDetails.description.label")}
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={form.description}
              onChange={handleInputChange}
              placeholder={t("requestDetails.description.placeholder")}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white shadow-sm transition-all resize-none text-sm leading-relaxed"
            />
            <p className="text-[11px] text-gray-400 mt-1 italic">{t("requestDetails.description.example")}</p>
          </section>

          <div className="border-b border-gray-200"></div>

          {/* Footer Section */}
          <footer className="mt-auto py-6 justify-center items-center flex flex-col gap-2">
            <button
              type="submit"
              disabled={!isFormValid() || isSending}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all 
            ${isFormValid() ? "bg-slate-900 text-white active:scale-[0.98] cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}`}
            >
              {t("requestDetails.footer.button")}
            </button>
            <p className="text-sm text-gray-500">{t("requestDetails.footer.notice")}</p>
          </footer>
        </form>
      </main>
      <BookingPickerDrawer isOpen={isCalendarDrawerOpen} setIsOpen={setIsCalendarDrawerOpen} onConfirm={handleBookingConfirm} initialData={{ guests: form.guests }} />
      <AddressSearchDrawer isOpen={isAddressDrawerOpen} setIsOpen={setIsAddressDrawerOpen} onSelect={handleAddressSelect} title={activeAddressType === "store" ? "searchPlace" : "searchDelivery"} />
    </div>
  )
}

export default RequestDetailsPage
