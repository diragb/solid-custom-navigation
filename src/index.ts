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
  customAnimations: { [ key in STATE ]: string }
}

export enum STATE {
  UNMOUNTED = -1,
  DEFAULT = 0,
  MOUNTED = 1
}


// Constants:
export const stateToAnimation = {
  [ STATE.UNMOUNTED ]: `${ fadeOut(1) } 0.5s ease`,
  [ STATE.DEFAULT ]: 'none',
  [ STATE.MOUNTED ]: `${ fadeIn(1) } 0.5s ease`
}


// Functions:
export const sleep = async (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

const useNavigation = (navigate: Navigator, options?: UseNavigateOptions) => {
  const [ navigationState, setNavigationState ] = createSignal<STATE>(STATE.DEFAULT)

  _onMount(() => {
    setNavigationState(STATE.MOUNTED)
    if (options?.onMount) options?.onMount()
  })

  _onCleanup(options?.onCleanup ?? (() => {}))

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
