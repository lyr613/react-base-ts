import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'

/** CompExample */
export default function CompExample() {
    return <div className={css(s.root)}>some component</div>
}
