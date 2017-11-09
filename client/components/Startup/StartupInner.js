// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./StartupInner.scss"
import { Link } from "react-router-dom";

const StartupInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Starter-kit of Emumba projects" />
      <h2>Welcome to the Starter-kit of Emumba projects.</h2>
    </div>
  )
}

export default StartupInner
