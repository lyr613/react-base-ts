import React, { useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Rt } from 'router-'
import Temp from 'arena-/Temp/a'
import EmptyRouter from 'component-/empty-router'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routebox />
            </HashRouter>
        </div>
    )
}

function Routebox() {
    const rt = useHistory()
    useEffect(() => {
        const ob = Rt.pusher$.subscribe((next) => {
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
            <Route path="/" component={Temp} />
            <Route component={EmptyRouter('/')} />
            {/* <Route path="/load" component={FirstLoad} /> */}
        </Switch>
    )
}

export default App
