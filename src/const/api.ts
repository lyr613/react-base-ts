/** @returns host  */
function get_host(): string {
	const urls = [
		'172.16.200.50:8087',
		'172.16.200.50:8087',
		'172.16.200.50:8087',
		'172.16.200.50:8087',
		'172.16.200.50:8087',
	]

	const node = process.env.NODE_ENV
	if (node === 'development') {
		return urls[0]
	}
	const w = (window as any).SOFT
	if (sessionStorage.host) {
		return sessionStorage.host
	}
	if (w.host !== 'SERVER_HOST') {
		return w.host
	}
	return urls[0]
}
const Host = get_host()
export const BaseUrl = `http://${Host}/api/`
export const BaseWsUrl = `ws://${Host}/websocket/`
export const BaseFileUrl = BaseUrl + 'common/download?filePath='

// 设置前端项目存放位置
function get_front() {
	const node = process.env.NODE_ENV
	if (node === 'development') {
		return ''
	}
	return 'project'
}
/** 前端的baseurl */
export const BaseFrontPath = get_front()
