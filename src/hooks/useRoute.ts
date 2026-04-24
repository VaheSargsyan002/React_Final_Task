import { useEffect, useMemo, useState } from 'react'

export type Route = {
  path: string
  params: URLSearchParams
}

const readRoute = (): Route => ({
  path: window.location.pathname,
  params: new URLSearchParams(window.location.search),
})

export const useRoute = () => {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onPopState = () => setRoute(readRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useMemo(
    () => (to: string) => {
      window.history.pushState({}, '', to)
      setRoute(readRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [],
  )

  return { route, navigate }
}
