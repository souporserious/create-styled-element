## Create Styled Element 🖌

[![npm version](https://badge.fury.io/js/create-styled-element.svg)](https://badge.fury.io/js/create-styled-element)
[![Dependency Status](https://david-dm.org/souporserious/create-styled-element.svg)](https://david-dm.org/souporserious/create-styled-element)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Simple wrapper around [glamor](https://github.com/threepointone/glamor) to create styled elements in React.

## Install

`yarn add create-styled-element`

`npm install create-styled-element --save`

## Example Usage

```js
import createStyledElement from 'create-styled-element'

const Column = ({ size, ...props }) => createStyledElement('div', props)({
  display: 'flex',
  flexDirection: 'column',
  flex: `0 0 ${size / 12 * 100}`
})

const App = () => (
  <Column size={6} css={{ backgroundColor: '#b4da55' }}/>
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
