
// libs
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import IdleTimer from 'react-idle-timer'
// import Idle from 'away'

// src
import { logout } from '../actions'

export default options => WrappedComponent => {
	return @connect() class LogoutWhenIdle extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				timeout: 10*60*1000,
				remaining: null,
				isIdle: false,
				lastActive: null,
				elapsed: null
			}
		}

		isIdleOrNot = () => {
			const { remaining, timeout, isIdle } = this.state
			
			if (remaining < timeout) {
				this.setState({ isIdle: true });
			} else if (remaining >= timeout) {
				this.setState({ isIdle: false });
			}
		}
		
		componentDidMount = () => {
			if(this.refs.idleTimer) {
				this.setState({
					remaining: this.refs.idleTimer.getRemainingTime(),
					lastActive: this.refs.idleTimer.getLastActiveTime(),
					elapsed: this.refs.idleTimer.getElapsedTime()
				});
				
				setInterval(this.updateState, 1000);
			}
		}
		
		componentWillUnmount = () => {
			this._pause()
			this._reset()
		}
		
		updateState = () => {
			if(this.refs.idleTimer) {
				this.setState({
					remaining: this.refs.idleTimer.getRemainingTime(),
					lastActive: this.refs.idleTimer.getLastActiveTime(),
					elapsed: this.refs.idleTimer.getElapsedTime()
				});
			}
		}
		
		
		render = () => {
			return(
				<IdleTimer
				ref="idleTimer"
				activeAction={this._onActive}
				idleAction={this._onIdle}
				timeout={this.state.timeout}
				startOnLoad={true}
				format="MM-DD-YYYY HH:MM:ss">
					<WrappedComponent 
						{...this.props}
						{...this.state}
					/>
				</IdleTimer>
			)
		}
		
		_onActive = () => {
			this.setState({ isIdle: false });
			console.log('---> User is active.')
		}
		
		_onIdle = () => {
			console.log('---> User is inactive/idle.')
			const { dispatch } = this.props
			dispatch(logout())
			.then(() => dispatch(push('/login')))
			
		}
		
		_changeTimeout = () => {
			this.setState({
				timeout: this.refs.timeoutInput.state.value()
			});
		}
		
		_reset = () => {
			this.refs.idleTimer.reset();
		}
		
		_pause = () => {
			this.refs.idleTimer.pause();
		}
		
		_resume = () => {
			this.refs.idleTimer.resume();
		}
	}
}