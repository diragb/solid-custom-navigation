// Packages:
import {
  createSignal,
  onMount as _onMount,
  onCleanup as _onCleanup
} from 'solid-js'
import { NavigateOptions, Navigator } from 'solid-app-router'
import { fadeIn, fadeOut } from './animations'


// Typescript:
export interface UseNavigateOptions {
  onMount?: () => void
  onTransition?: () => void
  onCleanup?: () => void
  transitionDelay?: number,
  customAnimations?: { [ key in STATE ]: string }
}

export enum STATE {
  UNMOUNTED = 'UNMOUNTED',
  DEFAULT = 'DEFAULT',
  MOUNTED = 'MOUNTED'
}


// Constants:
export const defaultStateToAnimation = (transitionDelay?: number) => ({
  [ STATE.UNMOUNTED ]: `${ fadeOut(1) } ${ transitionDelay ?? 500 }ms ease`,
  [ STATE.DEFAULT ]: 'none',
  [ STATE.MOUNTED ]: `${ fadeIn(1) } ${ transitionDelay ?? 500 }ms ease`
})


// Functions:
export const sleep = async (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

const useNavigation = (navigate: Navigator, options?: UseNavigateOptions) => {
  // Constants:
  const stateToAnimation = {
    ...defaultStateToAnimation(options?.transitionDelay),
    ...options?.customAnimations
  }

  // Signals:
  const [ navigationState, setNavigationState ] = createSignal<STATE>(STATE.DEFAULT)

  // Effects:
  _onMount(() => {
    setNavigationState(STATE.MOUNTED)
    if (options?.onMount) options?.onMount()
  })

  _onCleanup(() => {
    if (navigationState() !== STATE.UNMOUNTED) setNavigationState(STATE.UNMOUNTED)
    if (options?.onCleanup) options?.onCleanup()
  })

  // Return:
  return {
    get: () => stateToAnimation[ navigationState() ],
    set: setNavigationState,
    go: async (to: string, opts?: Partial<NavigateOptions<unknown>> | undefined) => {
      setNavigationState(STATE.UNMOUNTED)
      if (options?.onTransition) options?.onTransition()
      await sleep(options?.transitionDelay ?? 500)
      navigate(to, opts)
    },
    getState: navigationState
  }
}


// Exports:
export default useNavigation
