import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import createStyledElement from '../src/index'
import styledElements from '../src/styled-elements'

const { Div } = styledElements

const MyComponent = props => <div {...props}>My component</div>
const MyStyledComponent = props =>
  createStyledElement(MyComponent, props)({
    backgroundColor: 'orange',
  })

class App extends Component {
  render() {
    return (
      <Div>
        <Div css={{ backgroundColor: 'rebeccapurple', color: '#fff' }}>
          We have styled divs!
        </Div>
        <MyStyledComponent />
      </Div>
    )
  }
}

render(<App />, document.getElementById('app'))
