import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import createStyledElement from '../src/index'

const { Div, Section, H1 } = createStyledElement

const MyComponent = props => <div {...props}>My component</div>
const MyStyledComponent = createStyledElement(MyComponent)({
  backgroundColor: 'orange',
})

function Column({ size, ...props }) {
  const staticStyles = {
    display: 'flex',
    flexDirection: 'column',
  }
  const dynamicStyles = {
    flex: `0 0 ${size / 12 * 100}`,
  }
  return createStyledElement('div', props)(staticStyles, dynamicStyles)
}
const StyledColumn = createStyledElement(Column)({
  backgroundColor: '#b4da55',
})

class App extends Component {
  render() {
    return (
      <Div>
        <Section css={{ padding: 32 }}>
          <H1 css={{ color: `rgba(0, 0, 0, 0.75)` }}>
            Title
          </H1>
        </Section>
        <Div css={{ backgroundColor: 'rebeccapurple', color: '#fff' }}>
          We have styled divs!
        </Div>
        <MyStyledComponent />
        <StyledColumn
          size={4}
          css={{ display: 'block', flex: '0 0 auto' }}
          children={'Column'}
        />
      </Div>
    )
  }
}

render(<App />, document.getElementById('app'))
