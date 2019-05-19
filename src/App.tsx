import React from 'react'
import logo from './logo.svg'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Home from './module/home/index'

const App: React.FC = () => {
	return (
		<HashRouter basename="">
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</HashRouter>
	)
}

export default App
