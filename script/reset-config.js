const path = require('path')
const fs = require('fs')
const { GetOldTextArr, WriteNewTextArr } = require('./util')

// 适用react@16.8.6

/** webpack识别@ 引用 */
function handWebpack() {
    const src = path.resolve('./', 'node_modules', 'react-scripts', 'config', 'webpack.config.js')
    const arr = GetOldTextArr(src)
    const need = arr.every((v) => !v.match(/'@'/))
    if (need) {
        const i = arr.findIndex((v) => v.match('alias:'))
        arr.splice(i + 1, 0, `'@': path.resolve('./', 'src'),`)
    }
    WriteNewTextArr(src, arr)
    console.log('webpack替换完成')
}
/** tsconfig @ 引用 */
function handTsconfig() {
    const p = path.resolve('./', 'node_modules', 'react-scripts', 'scripts', 'utils', 'verifyTypeScriptSetup.js')
    // console.log(p)
    const old = fs.readFileSync(p).toString()
    const arr = old.split(/\n/)
    function baseurl() {
        const i = arr.findIndex((v) => v.match('baseUrl'))
        const i2 = arr.slice(i, -1).findIndex((v) => v.match('}')) + i
        const ifind = arr.slice(i, i2).findIndex((v) => v.match('undefined')) + i
        if (ifind - i > 0) {
            arr.splice(ifind, 1, `value: 'src',`)
        }
    }
    function paths() {
        const i = arr.findIndex((v) => v.match('paths:'))
        if (i > 0) {
            arr.splice(i, 1, `paths: { value: {'@/*': ['./*']}, reason: '绝对引用添加好了' },`)
        }
    }
    baseurl()
    paths()
    const re = arr.join('\n')
    fs.writeFileSync(p, re)
    console.log('tsconfig替换完成')
}

/** 让jest识别@ */
function handJest() {
    const p = path.resolve('./', 'node_modules', 'react-scripts', 'scripts', 'utils', 'createJestConfig.js')
    const old = fs.readFileSync(p).toString()
    const arr = old.split(/\n/)
    const need = arr.every((v) => !v.match('@/(.*)'))
    if (need) {
        const i = arr.findIndex((v) => v.match('moduleNameMapper'))
        arr.splice(i + 1, 0, `'^@/(.*)$': '<rootDir>/src/$1',`)
    }
    const re = arr.join('\n')
    fs.writeFileSync(p, re)
    console.log('jest替换完成')
}

/** tslint  */
function handTslint() {
    const src = path.resolve('./', 'node_modules', 'eslint-config-react-app', 'index.js')
    const arr = GetOldTextArr(src)
    noUse()
    WriteNewTextArr(src, arr)
    console.log('tslint替换完成')
    // 关闭检查未使用变量
    function noUse() {
        const i = arr.findIndex((v) => v.match('@typescript-eslint/no-unused-vars'))
        if (arr[i].match('//')) {
            return
        }
        if (i > 0) {
            const i2 = i + arr.slice(i).findIndex((v) => v.match(']')) + 1
            arr.slice(i, i2).forEach((v, j) => {
                arr[i + j] = '// ' + v
            })
        }
    }
}
handWebpack()
handTsconfig()
handJest()
handTslint()
