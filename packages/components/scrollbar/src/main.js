import { addResizeListener, removeResizeListener } from '../../../libs/resize-event'
import { toObject } from './util'
import Bar from './bar'

export default {
  name: 'AuScrollbar',
  components: { Bar },
  props: {
    normal: {  // 是否采用原生滚动（即只是隐藏掉了原生滚动条，但并没有使用自定义的滚动条）
      type: Boolean,
      default: false
    },
    always: { // 是否是一直显示，不是悬停显示
      type: Boolean,
      default: false
    },
    wrapStyle: {}, // 内联方式 自定义wrap容器的样式
    wrapClass: {}, // 类名方式 自定义wrap容器的样式
    viewClass: {}, // 内联方式 自定义view容器的样式
    viewStyle: {}, // 类名方式 自定义view容器的样式
    barStyle: {}, // bar的样式
    barWrapStyle: {}, // bar容器样式
    noResize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: { // view容器用那种标签渲染，默认为div
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    }
  },
  computed: {
    wrap () {
      return this.$refs.wrap
    }
  },
  methods: {
    handleScroll () {
      const wrap = this.wrap
      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight)
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth)
    },
    update () {
      let heightPercentage, widthPercentage
      const wrap = this.wrap
      if (!wrap) return

      // 计算thumb的百分比
      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight)
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth)
      // 当容器高度小于100时不需要滚动条
      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : ''
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : ''
    }
  },
  mounted () {
    if (this.normal) return
    this.$nextTick(this.update)
    !this.noResize && addResizeListener(this.$refs.resize, this.update)
  },
  beforeDestroy () {
    if (this.normal) return
    !this.noResize && removeResizeListener(this.$refs.resize, this.update)
  },
  render (h) {
    let gutter = 17
    let style = this.wrapStyle
    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`

      // 设置margin隐藏原有滚动条
      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle)
        style.marginRight = style.marginBottom = gutterWith
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }

    // 创建slots视图
    const view = h(this.tag, {
      class: ['au-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default)

    // 创建容器
    const wrap = h(this.tag, {
      class: [this.wrapClass, 'au-scrollbar__wrap', gutter ? '' : 'au-scrollbar__wrap--hidden-default'],
      style: style,
      ref: 'wrap',
      on: {
        scroll: this.handleScroll
      }
    }, [view])

    let nodes
    if (!this.normal) {
      nodes = [wrap]
      if (this.sizeWidth) {
        nodes.push(
          h('bar', {
            class: [{ 'always': this.always }],
            props: {
              move: this.moveX,
              size: this.sizeWidth,
              barStyle: this.barStyle,
              barWrapStyle: this.barWrapStyle
            }
          })
        )
      }

      if (this.sizeHeight) {
        nodes.push(
          h('bar', {
            class: [{ 'always': this.always }],
            props: {
              vertical: true,
              move: this.moveY,
              size: this.sizeHeight,
              barStyle: this.barStyle,
              barWrapStyle: this.barWrapStyle
            }
          })
        )
      }
    } else {
      nodes = [
        h(this.tag, {
          class: [this.wrapClass, 'au-scrollbar__wrap'],
          style: style,
          ref: 'wrap'
        }, [view])
      ]
    }
    return h('div', { class: 'au-scrollbar' }, nodes)
  }
}