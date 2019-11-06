// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'

/** 示例组件 */
export default function Example() {
    /** 示例数组 */
    const arr = Array.from(
        {
            length: 12,
        },
        (_, i) => {
            return `第${i + 1}个`
        },
    )
    // 被选择的下标
    const [did_select, set_did_select] = useState(-1)
    useEffect(() => {
        // 相当于 vue mounted + watch
        // ajax...
    }, [])

    return (
        <div className={s.Example}>
            {arr.map((str, i) =>
                i % 2 === 0 ? (
                    <div
                        className={s.line + ' ' + (did_select === i ? s.sel : '')}
                        onClick={() => {
                            set_did_select(i)
                        }}
                    >
                        <Comp s={str} />
                    </div>
                ) : null,
            )}
        </div>
    )
}
interface pp {
    s: string
}
/**
 * 示例组件
 * @param p.s 传入显示字符串
 */
function Comp(p: pp) {
    const str = p.s + '...'
    return <div className={s.Comp}>{str}</div>
}
