// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { user_list } from './source'

/** tsdoc 示例 */
export default function Doc() {
    return (
        <div className={s.Doc}>
            {user_list.map((user) => (
                <>
                    <div>{user.name}</div>
                    <div>{user.coin}</div>
                    <div>{user.mobel ?? '没有手机'}</div>
                </>
            ))}
        </div>
    )
}
