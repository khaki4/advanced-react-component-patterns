import React from 'react'
import { Switch } from './switch'

class Toggle extends React.Component {
  static On = ({on, children}) => (on ? children : null)
  static Off = ({on, children}) => (on ? null : children)
  static Button = ({on, toggle, ...props}) => (
    <Switch on={on} onClick={toggle} {...props} />
  )
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )

  render() {
    return React.Children.map(this.props.children, childElement => (
      React.cloneElement(childElement, {
        on: this.state.on,
        toggle: this.toggle,
      })
    ))
  }
}
const onToggle = (...args) => console.log('onToggle', ...args)
const Usage = () => {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The butoon is on</Toggle.On>
      <Toggle.Off>The butoon is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}

export { Toggle, Usage as default }
