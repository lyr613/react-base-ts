import React from 'react'
import Doc from './arena/doc'
import { Route, HashRouter } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Route path="/" component={Doc} />
            </HashRouter>
        </div>
    )
}

export default App
