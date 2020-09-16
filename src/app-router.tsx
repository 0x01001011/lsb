import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HomePage } from './pages/home/home-page'
import { ShowroomPage } from './pages/showroom/showroom-page'
import { LoginPage } from './pages/login/login-page'
import { SingleTradingPage } from './pages/trading/single-trading-page'
import { PairTradingPage } from './pages/trading/pair-trading-page'

export const AppRouter = () => {
	return (
		<Router>
			<>
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/showroom">
						<ShowroomPage />
					</Route>
					<Route path="/trading/:paidToken/:receivedToken">
						<PairTradingPage />
					</Route>
					<Route path="/trading/:tokenSymbol">
						<SingleTradingPage />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</>
		</Router>
	)
}
