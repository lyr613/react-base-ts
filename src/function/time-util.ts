/** 根据月份, 得到天数
 * @param n 1-12
 */
export function get_day_of_month(n: number) {
    function get_be_run() {
        // 闰年
        const y = new Date().getFullYear()
        if (y % 100 === 0) {
            return y % 400 === 0
        } else {
            return y % 4 === 0
        }
    }
    const ds = [
        0,
        31,
        get_be_run() ? 29 : 28,
        31,
        30,
        31,
        30,
        //
        31,
        31,
        30,
        31,
        30,
        31,
    ]
    const hs = ds[n]
    return hs
}
