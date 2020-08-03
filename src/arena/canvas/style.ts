import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    canvas: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
    },
    canvas: {
        backgroundColor: 'rgba(255,0,0,0.1)',
    },
})
