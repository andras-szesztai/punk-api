import { useEffect, useRef } from 'react'

function useEventListener(
  eventName: 'keydown',
  handler: (e: any) => void,
  element = window
) {
  const savedHandler = useRef<any>(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event: any) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export default useEventListener
