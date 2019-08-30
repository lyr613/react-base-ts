import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { act } from 'react-dom/test-utils'

it('renders without crashing', () => {
	const div = document.createElement('div')
	act(() => {
		ReactDOM.render(<App />, div)
	})
	const label = div.querySelector('p')!
	expect(label).toBe(null)
	// expect(label.textContent).toBe('2333')

	ReactDOM.unmountComponentAtNode(div)
})
