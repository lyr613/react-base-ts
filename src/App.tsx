import React from 'react'
import { Route, HashRouter, useHistory, Switch } from 'react-router-dom'
import Home from './arena/home'
import CanvasDraw from './arena/canvas'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/canvas" component={CanvasDraw} />
                    <Route component={Empty} />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App

function Empty() {
    const p = useHistory()
    p.push('home')
    return null
}
