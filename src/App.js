import React from 'react'
import { Switch } from './switch'

const ToggleContext = React.createContext();

class Toggle extends React.Component {
  static On = ({children}) => (
    <ToggleContext.Consumer>{contextValue => (contextValue.on ? children : null)}</ToggleContext.Consumer>
  )
  static Off = ({children}) => (
    <ToggleContext.Consumer>{contextValue => (contextValue.on ? null : children)}</ToggleContext.Consumer>
  )
  static Button = (props) => (
    <ToggleContext.Consumer>{contextValue => (
      <Switch
        on={contextValue.on}
        onClick={contextValue.toggle}
        {...props}
      />
    )}
    </ToggleContext.Consumer>
  )
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )

  render() {
    return (
      <ToggleContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle,
        }}
      >{this.props.children}</ToggleContext.Provider>
    )
  }
}
const onToggle = (...args) => console.log('onToggle', ...args)
const Usage = () => {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The butoon is on</Toggle.On>
      <Toggle.Off>The butoon is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}

export { Toggle, Usage as default }
