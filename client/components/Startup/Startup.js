// libs
import React from "react"
import { connect } from "react-redux"
import StartupInner from "./StartupInner"

export default class Startup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <StartupInner {...this.props} />
  }
}
