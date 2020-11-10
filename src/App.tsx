import React, { useState, useEffect } from 'react'
import Some from 'arena/ttt'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { router_pusher$ } from 'routers/pusher'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <RT />
            </HashRouter>
        </div>
    )
}

function RT() {
    const rt = useHistory()
    useEffect(() => {
        const ob = router_pusher$.subscribe((next) => {
            const cur = rt.location.pathname
            if (next !== cur) {
                rt.push(next)
            }
        })
        return () => {
            ob.unsubscribe()
        }
    }, [rt])
    return (
        <Switch>
            <Route component={Some}></Route>
        </Switch>
    )
}

export default App
