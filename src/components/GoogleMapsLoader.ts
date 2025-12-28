export const loadGoogleMaps = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  // 중복 로드 방지
  if (document.querySelector(`script[src*="maps.googleapis.com"]`)) return

  const script = document.createElement("script")
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}
