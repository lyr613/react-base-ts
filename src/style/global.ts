import { StyleSheet } from 'aphrodite'

interface global_style {
    /** 弹性盒子 */
    flex: object
    /** flex && alignItems: 'center'  */
    flhc: object
    /** flex && justifyContent: 'center'  */
    flwc: object
    /** flex && justifyContent: 'space-between'  */
    flsb: object
}

export const global_style: global_style = StyleSheet.create<global_style>({
    flex: {
        display: 'flex',
    },
    flhc: {
        display: 'flex',
        alignItems: 'center',
    },
    flwc: {
        display: 'flex',
        justifyContent: 'center',
    },
    flsb: {
        display: 'flex',
        justifyContent: 'space-between',
    },
})

//
type sty_val = number | string
export const style_creater = {
    /** margin */
    mar(top: sty_val, right: sty_val = 0, bottom: sty_val = 0, left: sty_val = 0) {
        top = _default_px(top)
        right = _default_px(right)
        bottom = _default_px(bottom)
        left = _default_px(left)
        const arr = [top, right, bottom, left]
        const key = 'mar' + arr.join('')
        const m = StyleSheet.create({
            [key]: {
                margin: arr.join(' '),
            },
        })
        return m[key]
    },
    /** font-size */
    fts(size: sty_val) {
        size = _default_px(size)
        const key = 'fts' + size
        const m = StyleSheet.create({
            [key]: {
                fontSize: size,
            },
        })
        return m[key]
    },
}

function _default_px(n: number | string) {
    if (typeof n === 'number') {
        n = n + 'px'
    }
    return n
}

//
export enum Colors {
    red = '#ff7799',
}
