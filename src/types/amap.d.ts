type int = number
type float = number

declare global {
    interface Window {
        AMap: AMapSpace.Root
    }
}
export declare namespace AMapSpace {
    /** 顶层的amap对象 */
    class Root {
        /** 构建地图实例 */
        Map: new (dom_id: string, opt?: MapOptions) => Map
        /** 构建经纬坐标 */
        LngLat: new (lng: number, lat: number) => LngLat
        /**
         * 构建矩形范围
         * @param lt 左上角经纬
         * @param rb 右下角经纬
         */
        Bounds: new (lt: LngLat, rb: LngLat) => any
        /**
         * 构建图片图层
         */
        ImageLayer: new (opt: any) => any
        /** 标记 */
        Marker: any
        /** 多边形覆盖物 */
        Polygon: new (opt: PolygonOptions) => Polygon
        /** pixel对象 */
        Pixel: new (px: number, py: number) => any
        /** 构造新的3d图层 */
        Object3DLayer: new () => Object3Dlayer
        Object3D: any
        ControlBar: new (obj: any) => void
        Text: new (obj: any) => any
        /**
         * 信息弹窗
         */
        InfoWindow: new (opt: InfoWindowOption) => InfoWindow
    }
    /** 3d图层 */
    class Object3Dlayer {
        objects: Mesh[]
        add: (mesh: Mesh) => void
    }

    /** 地图实例 */
    class Map {
        on: (event: string, f: Function) => void
        /** 销毁 */
        destroy: () => void
        /** 设置图层 */
        setLayers: (layers: any[]) => void
        /** 添加 */
        add: (layers: any[]) => void
        /** 转化经纬坐标为dom容器坐标 */
        lngLatToContainer: (lnglat: LngLat) => { x: number; y: number }
        /** 清除覆盖物 */
        clearMap: () => void
        /** 从pixel获得LngLat */
        containerToLngLat: (pixel: any) => LngLat
        /** 移除覆盖物 */
        remove: (marker: any) => void
        addControl: (v: any) => void
        getObject3DByContainerPos: (px: any, map3dLayer: any[], b: boolean) => { object: Mesh }
        getCenter: () => any
        setCenter: (posi: LngLat) => void
        /** 获取地图顺时针旋转角度 */
        getRotation: () => any
    }

    /** 地图创建配置 */
    class MapOptions {
        /** 是否支持可以扩展最大缩放级别,和zooms属性配合使用 最大20*/
        expandZoomRange?: boolean
        /** 缩放 3-18 */
        zoom?: float
        /** 缩放范围 3-18 */
        zooms?: [int, int]
        /** 中心点坐标 */
        center?: [float, float]
        /** 是否3d */
        viewMode?: '2D' | '3D'
        /** 主题 amap://styles/... */
        mapStyle?: string
        /** 位置变化时平滑过渡 */
        animateEnable?: boolean
        /** 俯仰角度，默认0，[0,83]，2D地图下无效  */
        pitch?: int
        /** 地图是否可旋转，3D视图默认为true，2D视图默认false */
        rotateEnable?: boolean
        /** 地图是否可通过鼠标拖拽平移，默认为true。此属性可被setStatus/getStatus 方法控制 */
        dragEnable?: boolean
        /** 地图是否可缩放，默认值为true。此属性可被setStatus/getStatus 方法控制 */
        zoomEnable?: boolean
        /** 地图是否可通过双击鼠标放大地图，默认为true。此属性可被setStatus/getStatus 方法控制 */
        doubleClickZoom?: boolean
        /** 地图是否可通过鼠标滚轮缩放浏览，默认为true。此属性可被setStatus/getStatus 方法控制 */
        scrollWheel?: boolean
        /** 是否允许设置俯仰角度，3D视图下为true，2D视图下无效。 */
        pitchEnable?: boolean
        /** 设置地图的预加载模式，开启预加载的地图会在适当时刻提前加载周边和上一级的地图数据，优化使用体验。该参数默认值true。  */
        preloadMode?: boolean
        /** 设置地图显示3D楼块效果 */
        showBuildingBlock?: boolean
        /** 地图是否可通过键盘控制,默认为true */
        keyboardEnable?: boolean
        /** 显示标签 */
        showLabel?: boolean
        /** 最大倾角 */
        maxPitch?: number
        /** 最大倾角 */
        minPitch?: number
        /** 旋转角度 */
        rotation?: number
    }

    /** 经纬坐标 */
    class LngLat {
        /** 获取经度 */
        getLng: () => number
        /** 获取纬度 */
        getLat: () => number
    }

    /** 标记创建配置 */
    class MarkerOptions {
        /** 位置 */
        position?: LngLat
        /** 图标 */
        icon?: string
        /** html模版字符串 */
        content?: string
        /** 位置 */
        anchor?: string
        /** 偏移 */
        offset?: any
        /** 地图 */
        map?: Map
        /** 动画 */
        animation?: 'AMAP_ANIMATION_BOUNCE'
    }

    /** 多边形覆盖物 */
    class PolygonOptions {
        map?: Map
        path?: LngLat[]
        /** 线条颜色，使用16进制颜色代码赋值。默认值为#006600 */
        strokeColor?: string
        /** 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9 */
        strokeOpacity?: number
        /** 轮廓线宽度 */
        strokeWeight?: number
        /** 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00 */
        fillColor?: string
        /** 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9 */
        fillOpacity?: number
    }

    class Polygon {
        on: (event: string, handler: Function) => void
    }

    class Mesh {
        /** 格式 B13_qiang */
        name: string
        /** 这里只用第一个textures[0] */
        textures: string[]
        /** 更新贴图的时候, 需要设置为true */
        needUpdate: boolean
        /** 描述mesh的几何信息的对象，只读，修改其属性来描述mesh的几何信息 */
        geometry: any
        /** 更新贴图 */
        reDraw: () => void
    }
    class InfoWindowOption {
        height?: number
        /** content dom字符串 */
        content: string
        /** true直接用content, 不会包一层div */
        isCustom?: boolean
        /** 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体 */
        closeWhenClickMap?: boolean
        /**	信息窗体关闭时，是否将其Dom元素从页面中移除，默认为false */
        retainWhenClose?: boolean
    }
    class InfoWindow {
        open: (map: Map, lnglat: [number, number]) => void
        close: () => vodi
    }
}

type Event = (e: string, func: Function) => vodi
