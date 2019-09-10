type pipe_function = (_: Date) => Date
type subscribe_function = (_: Date) => any

/** 管道时间对象 */
class PipeTime {
	_ = new Date()
	/**
	 * 管道
	 * @param funcs 任意多的函数, 其参数是原生时间对象来自上游, 返回一个原生时间对象提供给下游
	 * @returns 返回新的PipeTime对象
	 */
	pipe(...funcs: pipe_function[]) {
		let re = new Date(this._.toString())
		for (let i = 0; i < funcs.length; i++) {
			const func = funcs[i]
			re = func(re)
		}
		return TimeOf(re)
	}
	/**
	 * 订阅
	 * @param func 订阅函数, 其参数是原生时间对象, 返回需要的值
	 * @returns 返回func的返回值
	 */
	subscribe(func: subscribe_function) {
		return func(this._)
	}
}

/** 返回封装时间对象 */
export function TimeOf(some?: any) {
	const t = new PipeTime()
	if (some === undefined || some === null || typeof some === 'boolean') {
		return t
	}
	if (typeof some === 'number' || typeof some === 'string') {
		t._ = new Date(some)
		return t
	}
	if (typeof some === 'object') {
		t._ = new Date(some)
		return t
	}
	return t
}
