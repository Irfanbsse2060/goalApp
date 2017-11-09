// libs
import React from "react"
import { connect } from "react-redux"
import Spinner from 'react-spinner-material';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';

import './PageLoading.scss';

export default class PageLoading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (<div className="page-login">
              <div className="main-body">
                <DocumentTitle title="Goals App"/>
                <QueueAnim type="bottom" className="ui-animate">
                <div key="1">
                <div className="text-center center-canvas">
                  <Spinner size={120}
                    spinnerColor={"#333"}
                    spinnerWidth={2}
                    show={true} />
                </div>
              </div>
              </QueueAnim>
            </div>
            </div>)
  }
}
