## Create Styled Element 🖌

[![npm version](https://badge.fury.io/js/create-styled-element.svg)](https://badge.fury.io/js/create-styled-element)
[![Dependency Status](https://david-dm.org/souporserious/create-styled-element.svg)](https://david-dm.org/souporserious/create-styled-element)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Simple wrapper around [glamor](https://github.com/threepointone/glamor) to create styled elements in React.

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
  return createStyledElement('div', props)(staticStyles, dynamicStyles)
}

const App = () => (
  <Column size={6} css={{ backgroundColor: '#b4da55' }}/>
)
```

## Usage

### `createStyledElement(component[, props, children])(...css)`

This works _almost_ exactly like React's [create element](https://facebook.github.io/react/docs/react-api.html#createelement), except it returns a function that allows you to pass default css styles and interact with props. It will also merge a `css` prop in so you can override styles later on if you need to.

The initial CSS chunks passed to the function created by `createStyledElement` are written left to right as their own `glamor` classnames. The `css` prop will then be written as its own `glamor` classname last.

By using different "chunks" of CSS you can reduce how much CSS is generated. You can see in the example above we will only ever create one class name for the static styles, whereas the dynamic styles can change over time and result in additional rules.

### `built-in styled elements`

stolen from [glamorous](https://github.com/paypal/glamorous#built-in-glamorouscomponents) 🙏

Naming things is hard. Pre-created styled elements are exposed on the `createStyledElement` function for each DOM node type.

```js
import createStyledElement from 'create-styled-element'
const { Section, H1 } = createStyledElement

const App = () => (
  <Section css={{ padding: 32 }}>
    <H1 css={{ color: `rgba(0, 0, 0, 0.75)`}}>
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
