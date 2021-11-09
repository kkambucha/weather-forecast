import { useState, useEffect } from 'react'

export const isGeolocationAvailable = (): boolean => {
  return Boolean('geolocation' in navigator)
}

type GeolocationStatus = 'allowed' | 'blocked'

export interface Geolocation {
  latitude: number | undefined
  longitude: number | undefined
}

export const useGeolocation = (): [Geolocation, string] => {
  const [status, setStatus] = useState<GeolocationStatus>('blocked')
  const [position, setPosition] = useState<Geolocation>({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    if (isGeolocationAvailable()) {
      const geolocation = navigator.geolocation
      const watchId = geolocation.watchPosition(
        ({ coords: { latitude, longitude } }: GeolocationPosition) => {
          setPosition({
            latitude,
            longitude,
          })
          setStatus('allowed')
        },
        (error: GeolocationPositionError) => {
          if (error.code === error.PERMISSION_DENIED) {
            setStatus('blocked')
          }
        }
      )

      return () => {
        geolocation.clearWatch(watchId)
      }
    }
  }, [])

  return [position, status]
}
