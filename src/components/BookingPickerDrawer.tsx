import { useMemo, useState } from "react"
import { Drawer } from "vaul"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ko, enUS, zhCN, ja } from "date-fns/locale"
import { useTranslation } from "react-i18next"
import { MdCalendarToday, MdPeople, MdOutlineWatchLater } from "react-icons/md"
import type { BookingPickerDrawerProps } from "../types"
import "../styles/BookingPickerDrawer.css"
import { setHours, setMinutes } from "date-fns"
import { FaPlus, FaMinus } from "react-icons/fa6"

const BookingPickerDrawer = ({ isOpen, setIsOpen, onConfirm, initialData }: BookingPickerDrawerProps) => {
  const { t, i18n } = useTranslation()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [guestCount, setGuestCount] = useState(initialData.guests || 1)

  // 현재 언어 설정에 맞는 캘린더 로캘 설정
  const getLocale = () => {
    switch (i18n.language) {
      case "ko":
        return ko
      case "zh":
        return zhCN
      case "ja":
        return ja
      default:
        return enUS
    }
  }

  // 시간 및 AM/PM 리스트 생성
  const hourOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const h = i + 1
      return h < 10 ? `0${h}` : `${h}`
    })
  }, [])

  // 2. 분(00~55) 옵션 생성 (5분 단위 예시, 필요시 30분 단위로 수정 가능)
  const minuteOptions = useMemo(() => {
    return ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
  }, [])

  const currentHour12 = useMemo(() => {
    const h = selectedDate.getHours()
    const h12 = h % 12 || 12
    return h12 < 10 ? `0${h12}` : `${h12}`
  }, [selectedDate])

  const currentMinute = useMemo(() => {
    const m = selectedDate.getMinutes()
    // 현재 분과 가장 가까운 옵션으로 매칭 (예: 5분 단위)
    const rounded = Math.floor(m / 5) * 5
    return rounded < 10 ? `0${rounded}` : `${rounded}`
  }, [selectedDate])

  const currentAmPm = selectedDate.getHours() >= 12 ? "PM" : "AM"

  // 시간 변경 핸들러
  const handleTimeChange = (hour12: string, minute: string, ampm: string) => {
    let hour24 = parseInt(hour12)
    if (ampm === "PM" && hour24 < 12) hour24 += 12
    if (ampm === "AM" && hour24 === 12) hour24 = 0

    const newDate = setHours(setMinutes(selectedDate, parseInt(minute)), hour24)
    setSelectedDate(newDate)
  }

  const handleConfirm = () => {
    onConfirm({
      date: selectedDate,
      guests: guestCount,
    })
    setIsOpen(false)
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 outline-none z-50 h-[90%] flex flex-col scroll-none">
          {/* 상단 핸들 바 */}
          <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-gray-300 mb-6" />

          <div className="overflow-y-auto pb-6 scrollbar-hide">
            <Drawer.Title className="text-xl font-bold mb-6 flex items-center gap-2">{t("reservation.title")}</Drawer.Title>

            {/* 날짜 및 시간 선택 */}
            <section className="mb-8">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
                <MdCalendarToday /> {t("reservation.date")}
              </label>
              <div className="flex w-full bg-gray-50 rounded-2xl p-2">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    if (date) setSelectedDate(date)
                  }}
                  inline
                  locale={getLocale()}
                  minDate={new Date()}
                />
              </div>
            </section>

            {/* 커스텀 시간 Select Box 섹션 */}
            <section className="mb-8">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
                <MdOutlineWatchLater /> {t("reservation.time")}
              </label>
              <div className="flex gap-2">
                {/* 1. 시(Hour) */}
                <select
                  value={currentHour12}
                  onChange={(e) => handleTimeChange(e.target.value, currentMinute, currentAmPm)}
                  className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 text-center"
                >
                  {hourOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>

                {/* 2. 분(Minute) */}
                <select
                  value={currentMinute}
                  onChange={(e) => handleTimeChange(currentHour12, e.target.value, currentAmPm)}
                  className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 text-center"
                >
                  {minuteOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* 3. 오전/오후(AM/PM) */}
                <select
                  value={currentAmPm}
                  onChange={(e) => handleTimeChange(currentHour12, currentMinute, e.target.value)}
                  className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 text-center"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </section>

            {/* 인원 수 선택 */}
            <section className="mb-8">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
                <MdPeople /> {t("reservation.people")}
              </label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
                <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 text-sm">
                  <FaMinus />
                </button>
                <span className="text-md">
                  {guestCount}
                  {t("reservation.numbers")}
                </span>
                <button onClick={() => setGuestCount(guestCount + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 text-sm">
                  <FaPlus />
                </button>
              </div>
            </section>
            {/* 확인 버튼 */}
            <div className="pt-4 mt-auto">
              <button onClick={handleConfirm} className="w-full py-4 bg-[#1d2838] text-white rounded-xl font-bold text-md shadow-lg active:scale-95 transition-transform">
                {t("reservation.select")}
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default BookingPickerDrawer
