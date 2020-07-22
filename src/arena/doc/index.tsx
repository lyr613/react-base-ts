// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { user_list } from './source'
import { rxajax, mkurl } from '@/util/request'

/** tsdoc 示例 */
export default function Doc() {
    useEffect(() => {
        rxajax(mkurl('services/smartpark-community/api/shopsControl/getIndustries'), 'get').subscribe((re) => {
            console.log(re)
        })
    }, [])
    return <div className={s.Doc}></div>
}
