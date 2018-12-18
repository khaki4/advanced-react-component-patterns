import React from 'react'
import { Switch } from './switch'

class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      },
    )
  render() {
    return <Switch on={this.state.on} onClick={this.toggle} />
  }
}
const onToggle = (...args) => console.log('onToggle', ...args)
const Usage = () => {
  return <Toggle onToggle={onToggle}/>
}

Usage.title = 'Build Toggle'

export { Toggle, Usage as default }
