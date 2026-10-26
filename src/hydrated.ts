import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** False while rendering on the server and during hydration, true once the page is live in a browser. */
export const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false)
