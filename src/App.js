import React from 'react'
import { Switch } from './switch'

class Toggle extends React.Component {
  state = { on: false }
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    return this.props.children({
      on: this.state.on,
      toggle: this.toggle
    });
  }
}

function Usage({
                 onToggle = (...args) => console.log('onToggle', ...args),
               }) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}

export { Toggle, Usage as default }
