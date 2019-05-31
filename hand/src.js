const path = require('path')
const fs = require('fs')

// 适用react@16.8.6

/** webpack识别@ 引用 */
function handWebpack() {
	const webpackPath = path.resolve('./', 'node_modules', 'react-scripts', 'config', 'webpack.config.js')
	console.log(webpackPath)
	const webpackFs = fs.readFileSync(webpackPath).toString()
	const withAt = webpackFs.replace(
		/alias.*[\s\w:.'-@()/]*}/,
		`
        alias: {
            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            'react-native': 'react-native-web',
            '@': path.resolve('./', 'src')
        } `,
	)
	const nolint = withAt.replace('include: paths.appSrc', 'include: []')
	fs.writeFileSync(webpackPath, nolint)
	console.log('webpack替换完成')
}
/** tsconfig @ 引用 */
function handTsconfig() {
	const p = path.resolve('./', 'node_modules', 'react-scripts', 'scripts', 'utils', 'verifyTypeScriptSetup.js')
	console.log(p)
	const old = fs.readFileSync(p).toString()
	const match = old.match(/paths:.*/)[0]
	const nw = match.replace('undefined', `{'@/*': ['./*']}`)
	const inset = old.replace(match, nw)
	fs.writeFileSync(p, inset)
	console.log('tsconfig替换完成')
}

/** 让jest识别@ */
function handJest() {
	const p = path.resolve('./', 'node_modules', 'react-scripts', 'scripts', 'utils', 'createJestConfig.js')
	const old = fs.readFileSync(p).toString()
	const arr = old.split(/\n/)
	const need = arr.every(v => !v.match('@/(.*)'))
	if (!need) {
		return
	}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].match('moduleNameMapper')) {
			arr.splice(i + 1, 0, `'^@/(.*)$': '<rootDir>/src/$1',`)
			break
		}
	}
	const re = arr.join('\n')
	fs.writeFileSync(p, re)
}
handWebpack()
handTsconfig()
handJest()
