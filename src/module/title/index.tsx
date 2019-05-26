import React, {useState, useEffect} from 'react'
import s from './s.module.scss'

export function Title() {
	const r = (Math.random() * 255) | 0
	const g = (Math.random() * 255) | 0
	const b = (Math.random() * 255) | 0
	return (
		<section className={s.B} style={{height: '100vh', backgroundColor: `rgb(${r},${g},${b})`}}>
			{}
		</section>
	)
}
