/** 用户 */
interface user {
    id: string
    age: int
    father?: user
    mother?: user
    children: user[]
    mobel?: int
    /** 硬币数 */
    coin: int
    level: 1 | 2 | 3 | 4 | 5 | 6
    /** 性别 0女 1男 2保密 */
    gender: 0 | 1 | 2
}

export const user_list = [{}]
