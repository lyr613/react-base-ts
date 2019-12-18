const path = require('path')
const fs = require('fs')

// 适用react@16.12

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

handJest()
