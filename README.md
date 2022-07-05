# solid-custom-navigation

[![npm](https://img.shields.io/badge/npm-solid--custom--navigation-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/solid-custom-navigation)
[![npm version](https://img.shields.io/npm/v/solid-custom-navigation.svg?style=flat-square)](https://www.npmjs.com/package/solid-custom-navigation)
[![npm downloads](https://img.shields.io/npm/dm/solid-custom-navigation.svg?style=flat-square)](https://www.npmjs.com/package/solid-custom-navigation)
[![sponsors](https://img.shields.io/github/sponsors/diragb)](https://github.com/sponsors/diragb)

***Get, Set, Go!***

Custom navigations for Solid, written in Typescript. Implement custom page transition logic and ✨ ***animations*** ✨.

**Note**: This package relies on [`solid-app-router`](https://www.npmjs.com/package/solid-app-router).

# Usage

## Installation

```bash
npm install solid-custom-navigation --save
yarn add solid-custom-navigation ## or in yarn
```

## Example
```tsx
import { Component } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import { useNavigation } from 'solid-custom-navigation'


// And then in your component..
const Page: Component = () => {
  const { get, set, go } = useCustomNavigation(useNavigate(), options)

  return (
    <div style={{ animation: get() }}></div>
  )
}
```

## Reference
### get
`() => string`

Get the current animation string.

### set
`Setter<'UNMOUNTED' | 'DEFAULT' | 'MOUNTED'>`

Set the current component transition state.

### go
`async (to: string, opts?: Partial<NavigateOptions<unknown>> | undefined)`

Navigate to a route. Pretty much an alias for [`navigate`](https://github.com/solidjs/solid-app-router#usenavigate)'s props.

### getState
`Accessor<'UNMOUNTED' | 'DEFAULT' | 'MOUNTED'>`

Get the current component transition state.


# API

## options
`UseNavigateOptions` - **OPTIONAL**

Options for navigation.

### onMount
`() => void` - **OPTIONAL**

This function runs **onMount**.

### onTransition
`() => void` - **OPTIONAL**

This function *during* a transition.

### onCleanup
`() => void` - **OPTIONAL**

This function runs **onCleanup**.

### transitionDelay
`number` - **OPTIONAL**

The number of milliseconds to wait before navigating away (and calling **onCleanup**).


### customAnimations
`{ [ 'UNMOUNTED' | 'DEFAULT' | 'MOUNTED' ]: string }` - **OPTIONAL**

Add custom animation strings.

Here's an example using [`keyframes`](https://github.com/solidjs/solid-styled-components#keyframes) from [`solid-styled-components`](https://www.npmjs.com/package/solid-styled-components) to create a custom animation.

```ts
const customUnmountAnimation = keyframes``
const customMountAnimation = keyframes``

// And then later on..
useCustomNavigation(useNavigate(), {
  UNMOUNTED: `${ customUnmountAnimation } 0.5s ease`,
  MOUNTED: `${ customMountAnimation } 0.5s ease`
})
```

# License
MIT
