import type { i18n, TFunction } from "i18next"

export interface TAndI18n {
  t: TFunction
  i18n: i18n
}

export interface TOnly {
  t: TFunction
}

export interface BookingData {
  date: Date | null
  guests: number
}

export interface BookingPickerDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onConfirm: (data: BookingData) => void
  initialData: {
    guests: number
  }
}

export interface AddressItem {
  address: string
  roadAddress: string
}

export interface AddressSearchDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onSelect: (item: AddressItem) => void
  title: string
}
