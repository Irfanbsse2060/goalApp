// libs
import React from "react"
import PropTypes from 'prop-types'
import { Provider } from "react-redux"
import { Route, Switch, Redirect } from "react-router-dom"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import { DragDropContextProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

// src
import styles from "./App.scss"
import './styles/css/bootstrap.scss'

// custom
import './styles/css/layout.scss'
import './styles/css/theme.scss'
import './styles/css/ui.scss'
import './styles/css/app.scss'
import MUITheme from "../config/theme"
import {
  Header,
  Startup,
    PageLogin,
    PageLogout,
    PageRegister,
    PageForgotPassword,
    PageResetPassword,
    PageAdminDashboard,
    PageDashboard,
  Page404,
  PageErrorView,
  PublicRoute,
  PrivateRoute
} from "./components"

export default class App extends React.Component {
  static propTypes = {
    userAgent: PropTypes.string,
    store: PropTypes.object,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  constructor(props) {
    super(props)
  }
  getChildContext() {
    const { userAgent } = this.props
    const theme = userAgent ? Object.assign({ userAgent }, MUITheme) : MUITheme

    return {
      muiTheme: getMuiTheme(theme)
    }
  }
  render() {
    const { store, Router, routerProps } = this.props

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Router {...routerProps}>
            <div className={styles.root}>
               <Header/>
              <div className={styles.layout}>
                <div className={styles.primaryColumn}>

                  <div className={`container-fluid`}>
                    <Switch>
                     {/* <PublicRoute path="/" component={Startup} />*/}
                      <PublicRoute path="/startup" component={Startup} />
                      <PublicRoute path="/login" component={PageLogin} />
                      <PublicRoute path="/activateAccount/:usertoken" component={PageLogin} />
                      <PublicRoute path="/register" component={PageRegister} />
                      <PublicRoute path="/forgotPassword" component={PageForgotPassword} />
                      <PublicRoute path="/resetPassword/:usertoken" component={PageResetPassword} />
                      <PublicRoute path="/resend/activation/:id" component={PageLogin} />
                      <Route path="/logout" component={PageLogout} />
                      <PrivateRoute
                          exact
                          path="/"
                          render={() => <Redirect to="/dashboard" />}
                      />
                      <PrivateRoute
                          exact
                          path="/dashboard"
                          component={PageAdminDashboard}
                      />
                      <PrivateRoute
                          exact
                          path="/userDashboard"
                          component={PageDashboard}
                      />


                      <Route exact path="/errors" component={PageErrorView} />
                      <Route component={Page404} />
                    </Switch>
                  </div>

                </div>
              </div>
            </div>
          </Router>
        </Provider>
      </DragDropContextProvider>
    )
  }
}
