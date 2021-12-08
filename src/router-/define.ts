export type router1_vo = 'default'

interface rt<t> {
    en: t
    cn: string
}

export function _router1(): { [k in router1_vo]: rt<k> } {
    return {
        default: {
            en: 'default',
            cn: '默认',
        },
    }
}

// 书架2级
export type router2_shelf_vo = 'show' | 'edit'
export function _router2_shelf(): { [k in router2_shelf_vo]: rt<k> } {
    return {
        show: {
            en: 'show',
            cn: '查看',
        },
        edit: {
            en: 'edit',
            cn: '编辑',
        },
    }
}
