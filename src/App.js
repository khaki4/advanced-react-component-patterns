import React from 'react'
import { Switch } from './switch'

const ToggleContext = React.createContext();

function ToggleConsumer(props) {
  return (
    <ToggleContext.Consumer {...props}>
      {context => {
        if (!context) {
          throw new Error(
            `Toggle compound components cannot be rendered outside the Toggle component`,
          )
        }
        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )
}

class Toggle extends React.Component {
  static On = ({children}) => (
    <ToggleConsumer>{contextValue => (contextValue.on ? children : null)}</ToggleConsumer>
  )
  static Off = ({children}) => (
    <ToggleConsumer>{contextValue => (contextValue.on ? null : children)}</ToggleConsumer>
  )
  static Button = (props) => (
    <ToggleConsumer>{contextValue => (
      <Switch
        on={contextValue.on}
        onClick={contextValue.toggle}
        {...props}
      />
    )}
    </ToggleConsumer>
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
