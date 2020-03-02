/** 用户 */
interface user {
    id: string
    /** 用户名 */
    name: string
    age?: int
    father?: user
    mother?: user
    children: user[]
    /** 手机号 */
    mobel?: int
    /** 硬币数 */
    coin: int
    level: 1 | 2 | 3 | 4 | 5 | 6
    /** 性别 0女 1男 2保密 */
    gender: 0 | 1 | 2
}

/** 用户列表 */
export const user_list: user[] = [
    {
        id: 'qwer',
        name: '秋无衣',
        children: [],
        coin: 2,
        level: 5,
        gender: 1,
    },
]
