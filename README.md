## Create Styled Element 🖌

[![npm version](https://badge.fury.io/js/create-styled-element.svg)](https://badge.fury.io/js/create-styled-element)
[![Dependency Status](https://david-dm.org/souporserious/create-styled-element.svg)](https://david-dm.org/souporserious/create-styled-element)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Thin wrapper around [Glamor](https://github.com/threepointone/glamor) to create styled elements in React. Please refer to the [Glamor Docs](https://github.com/threepointone/glamor#docs) for any advance styling needs like animations, keyframes, etc.

The goal of this library is to be as small as possible. If you need features like theming and prop styles, I suggest using [Glamorous](https://github.com/paypal/glamorous). Many thanks to their work and inspiring me to write this library.

## Install

`yarn add create-styled-element`

`npm install create-styled-element --save`

## Example

```js
import createStyledElement from 'create-styled-element'

function Column({ size, ...props }) {
  const staticStyles = {
    display: 'flex',
    flexDirection: 'column'
  }
  const dynamicStyles = {
    flex: `0 0 ${size / 12 * 100}`
  }
  // we use multiple chunks here to help reduce duplicate styles
  // since the "size" prop can produce multiple styles
  return createStyledElement('div', props)(
    staticStyles,
    dynamicStyles
  )
}

const App = () => (
  <Column size={6} css={{ backgroundColor: '#b4da55' }}/>
)
```

## Usage

### `createStyledElement(component[, props, children])(...css)`

This works _almost_ exactly like React's [create element](https://facebook.github.io/react/docs/react-api.html#createelement), except it returns a function that allows you to pass default css styles and interact with props. It will also merge a `css` prop in so you can override styles later on if you need to.

The initial CSS chunks passed to the function created by `createStyledElement` are written left to right as their own `glamor` classnames. If a `css` prop is passed it will be written as its own `glamor` rule and added last.

By using different "chunks" of CSS you can reduce how much CSS is generated. You can see in the example above we will only ever create one class name for the static styles, whereas the dynamic styles can change over time and result in additional rules.

#### `css` PropTypes.oneOf([PropTypes.object, PropTypes.array])

Pass any styling overrides to your component.

#### `innerRef` PropTypes.func

Get access to the internal `ref`.

#### `forwardRef` PropTypes.bool

Forward the `innerRef` prop, rather than passing it as a `ref`. Note you only need this when composing another styled element and need access to the root `ref`.

### `built-in styled elements`

stolen from [glamorous](https://github.com/paypal/glamorous#built-in-glamorouscomponents) 🙏

Naming things is hard. Pre-created styled elements are exposed on the `createStyledElement` function, and as imports for each DOM node type.

```js
// tags with the same name as built-in JavaScript objects are importable with a Tag suffix
// and tag names that contain dashes are transformed to CamelCase
import { Section, H1, MapTag } from 'create-styled-element'

const App = () => (
  <Section css={{ padding: 32 }}>
    <H1 css={{ color: `rgba(0, 0, 0, 0.75)`}}>
      Styled Heading!
    </H1>
  </Section>
)
```

## Running Locally

clone repo

`git clone git@github.com:souporserious/create-styled-element.git`

move into folder

`cd ~/create-styled-element`

install dependencies

`yarn`

run dev mode

`yarn dev`

open your browser and visit: `http://localhost:8080/`
