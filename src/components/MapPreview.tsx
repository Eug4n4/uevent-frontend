type MapPreviewProps = {
  query: string
  zoom?: number
  height?: number
}

export function MapPreview({ query, zoom = 14, height = 180 }: MapPreviewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const encodedQuery = encodeURIComponent(query)

  if (!apiKey) {
    return (
      <div className="map-placeholder" style={{ minHeight: `${height}px` }}>
        <p>Map preview</p>
        <span>Provide VITE_GOOGLE_MAPS_API_KEY to render Google Maps.</span>
      </div>
    )
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedQuery}&zoom=${zoom}&size=640x360&scale=2&maptype=roadmap&markers=color:0x0ea5e9%7C${encodedQuery}&key=${apiKey}`

  return (
    <div className="map-placeholder" style={{ minHeight: `${height}px` }}>
      <img src={mapUrl} alt={`Map preview for ${query}`} loading="lazy" />
    </div>
  )
}
