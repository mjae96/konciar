import { useState, useEffect } from "react"
import { Drawer } from "vaul"
import { MdSearch } from "react-icons/md"
import type { AddressItem, AddressSearchDrawerProps } from "../types"
import { useTranslation } from "react-i18next"

const AddressSearchDrawer = ({ isOpen, setIsOpen, onSelect, title }: AddressSearchDrawerProps) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState<AddressItem[]>([])

  useEffect(() => {
    if (isOpen) {
      setKeyword("")
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const google = (window as any).google
    // 최신 방식인 Place와 SearchByText 기능이 있는지 확인
    if (!keyword.trim() || !google?.maps?.places?.Place) {
      setResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        // 최신 SearchByText 요청 파라미터 설정
        const request = {
          textQuery: keyword,
          fields: ["displayName", "formattedAddress", "location"],
          locationBias: { radius: 10000, center: { lat: 37.5665, lng: 126.978 } },
        }

        // 검색 실행 (Promise 방식)
        const { places } = await google.maps.places.Place.searchByText(request)

        if (places && places.length > 0) {
          const items = places.map((place: any) => ({
            address: place.displayName?.text || place.displayName || "Unknown Place",
            roadAddress: place.formattedAddress,
          }))
          setResults(items)
        } else {
          setResults([])
        }
      } catch (error) {
        console.error("Places API (New) Error:", error)
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [keyword])

  const handleManualInput = () => {
    const manualAddress = keyword.trim()
    if (!manualAddress) {
      alert(t("addressSearch.enterKeyword")) // 혹은 적절한 메시지
      return
    }

    // AddressItem 형식에 맞춰 데이터 생성
    const newItem: AddressItem = {
      address: manualAddress,
      roadAddress: "직접 입력",
    }

    onSelect(newItem)
    setIsOpen(false)
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 outline-none z-50 h-[90%] flex flex-col overflow-hidden">
          {/* 상단 핸들 바 */}
          <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-gray-300 mb-6" />

          {/* 제목 및 검색창 영역 */}
          <div className="shrink-0">
            <Drawer.Title className="text-xl font-bold mb-6">{t(`addressSearch.${title}`)}</Drawer.Title>

            <section className="relative mb-6">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t("addressSearch.placeholder")}
                className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 transition-all"
              />
            </section>
          </div>

          {/* 결과 리스트 영역 */}
          <section className="flex-1 overflow-y-auto pb-6">
            {results.length > 0 ? (
              <ul className="flex flex-col">
                {results.map((item, index) => (
                  <li
                    key={index}
                    className="p-4 border-b border-gray-100 active:bg-gray-50 cursor-pointer transition-colors rounded-lg"
                    onClick={() => {
                      onSelect(item)
                      setIsOpen(false)
                    }}
                  >
                    <div className="font-semibold text-gray-800 mb-1">{item.address}</div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 border border-blue-200 text-blue-500 rounded font-medium shrink-0">{t("addressSearch.addressLabel") || "주소"}</span>
                        <span className="text-sm text-gray-500 truncate">{item.roadAddress}</span>
                      </div>
                    </div>
                  </li>
                ))}
                <li className="p-4 mt-2 text-center active:bg-gray-50" onClick={handleManualInput}>
                  <p className="text-blue-500 font-medium text-sm">
                    "{keyword}" {t("addressSearch.manually")}
                  </p>
                </li>
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                <p className="text-sm text-center">{keyword ? t("addressSearch.noResults") : t("addressSearch.enterKeyword")}</p>
                {keyword && (
                  <button className="p-4 mt-4 text-center active:bg-gray-50" onClick={handleManualInput}>
                    <p className="text-blue-500 font-medium text-sm">
                      "{keyword}" {t("addressSearch.manually")}
                    </p>
                  </button>
                )}
              </div>
            )}
          </section>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default AddressSearchDrawer
