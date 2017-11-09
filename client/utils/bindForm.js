/* @flow */

// libs
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

// src
import { ENTITY_STATUS_DATA_AVAILABLE } from './utils'

/**
 * A higher order function that injects some additional params to a form component
 * @param {Object} param0 
 */

export default (options:{onSubmit:Function}) => (WrappedComponent:Object):Object => {
  const { onSubmit } = options
  const getDefaultState = () => ({
    error: false,
    errorMessage: ''
  })

  return class BoundForm extends React.Component {

    handleSubmit: Function
    
    state = getDefaultState()

    constructor(props) {
      super(props)

      const { handleSubmit } = props
      this.handleSubmit = handleSubmit(this.wrapSubmit( onSubmit ))
    }
    componentDidMount() {
        const hasEntity = _.has(this.props, 'entity')
        
        if ( hasEntity ) {
            const entity = _.get(this.props, 'entity')
            const status = _.get(this.props, 'entity.__status__')

            this.handleChangeEntityStatus(entity, status)
        }
    }
    componentWillReceiveProps(nextProps) {
        const hasEntity = _.has(this.props, 'entity')
        const status = _.get(this.props, 'entity.__status__')
        const nextStatus = _.get(nextProps, 'entity.__status__')

        // debugger

        if ( hasEntity && status !== nextStatus ) {
            this.handleChangeEntityStatus(nextProps.entity, nextStatus)
        }
    }
    /**
     * Will only be called when two conditions are met:
     * 1. Form is being used for updating an entity
     * 2. __status__ of that entity _.has changed
     * 
     */
    handleChangeEntityStatus = (entity, status) => {    
        if ( status === ENTITY_STATUS_DATA_AVAILABLE ) {
            const { initialize } = this.props
            initialize(entity)
        }
    }
    wrapSubmit = ( submit ) => {
      return (...args) => {
        this.setState(getDefaultState())

        return submit(...args)
          .then(action => {
            if ( !action ) {
              /*
              console && console.error && console.error(
                'nothing returned in then'
              )
              */
            }
            const {error, payload} = action

            if (error) {
              this.setState({
                error: true,
                errorMessage: payload.message
              })

              throw new Error(`An error occurred while submitting the form: ${payload.message}`)
            } else {
              // console.log('action is : ' + JSON.stringify(action))
              this.setState({
                error: false,
                errorMessage: payload.message
              })
            }

            return action
          })
      }
    }
    renderSubmitButton = ({label, labelWhenSubmitting}) => {
      const { submitting } = this.props

      return (
      	<FlatButton
					className="submitBtn"
					type="submit"
          label={submitting ? labelWhenSubmitting : label}
          onClick={this.handleSubmit}
          disabled={submitting}
					primary/>       
      )
    }
		renderRaisedSubmitButton = ({label, labelWhenSubmitting}) => {
      const { submitting } = this.props

      return (
				<RaisedButton
					type="submit"
          label={submitting ? labelWhenSubmitting : label}
          onClick={this.handleSubmit}
          disabled={submitting}
					primary/>
      )
    }
    renderMessage = (msg) => {
      // console.log('msg : ' + msg)
      const { error, errorMessage } = this.state

      if (error) {
        return <div style={{color: '#EF5350', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: errorMessage}}></div>
      } else if (!error && errorMessage !== '') {
        return <div style={{color: '#4F8A10', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: errorMessage}}></div>
      } else if (msg) {
        return <div style={{color: '#4F8A10', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: msg}}></div>
      } else {
        return <span></span>
      }
      
      // return error ? <div style={{color: '#EF5350', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: errorMessage}}></div> : !error && errorMessage !== '' ? <div style={{color: '#4F8A10', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: errorMessage}}></div> : <span></span>
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onSubmit={this.handleSubmit}
					renderRaisedSubmitButton={this.renderRaisedSubmitButton}
          renderSubmitButton={this.renderSubmitButton}
          renderMessage={this.renderMessage}/>
      )
    }
  }
}

