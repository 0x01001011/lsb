import React from "react"

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"

import { HomePage } from "./pages/home/home-page"

export const AppRouter = ({children}) => {
  return (
    <Router>
      <div>
        <div>{children}</div>
        <Switch>
          <Route path="/about">
            <HomePage />
          </Route>
          <Route path="/users">
            <HomePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
