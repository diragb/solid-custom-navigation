// Packages:
import { keyframes } from 'solid-styled-components'


// Exports:
export const fadeIn = (y?: number) => keyframes`
  from {
    filter: opacity(0);
    transform: translateY(${ y ?? 1 }rem);
  }
`

export const fadeOut = (y?: number) => keyframes`
  to {
    filter: opacity(0);
    transform: translateY(${ y ?? 1 }rem);
  }
`
