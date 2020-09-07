import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HomePage } from './pages/home/home-page'
import { ShowroomPage } from './pages/showroom/showroom-page'

export const AppRouter = ({ children }) => {
	return (
		<Router>
			<>
				<Switch>
					<Route path="/about">
						<HomePage />
					</Route>
					<Route path="/showroom">
						<ShowroomPage />
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
