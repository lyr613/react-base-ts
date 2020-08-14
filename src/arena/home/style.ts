import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    /** 一项 */
    one: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: '24px',
    },
    one: {
        cursor: '',
    },
})
