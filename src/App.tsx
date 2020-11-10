import React, { useState, useEffect } from 'react'
import Some from 'arena/ttt'
import { timer } from 'rxjs'

function App() {
    const [a, next_a] = useState(0)
    useEffect(() => {
        timer(0, 1000).subscribe(next_a)
    }, [])
    return (
        <div className="App">
            <Some />
            {a}
        </div>
    )
}

export default App
