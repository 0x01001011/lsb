import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HomePage } from './pages/home/home-page'

export const AppRouter = ({ children }) => {
	return (
		<Router>
			<>
				<Switch>
					<Route path="/about">
						<HomePage />
					</Route>
					<Route path="/users">
						<HomePage />
					</Route>
					<Route exact path="/">
						<HomePage />
					</Route>
				</Switch>
				<>{children}</>
			</>
		</Router>
	)
}
