import { on, off } from '../../../libs/dom'
import { renderThumbStyle, BAR_MAP } from './util'

/* istanbul ignore next */
export default {
  name: 'bar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    barStyle: {},
    barWrapStyle: {}
  },
  computed: {
    bar () {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
    },
    wrap () {
      return this.$parent.wrap
    }
  },
  methods: {
    clickThumbHandler (e) {
      // 防止右键点击事件
      if (e.ctrlKey || e.button === 2) {
        return
      }
      this.startDrag(e) // 开始拖拽事件
      this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]))
    },
    clickTrackHandler (e) { // 点击跳转至句柄
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client])
      const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2) // 获取滚动的一半距离
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset]) // 计算需要跳转的位置百分比
      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100) // 设置父级的滚动top
    },
    startDrag (e) {
      e.stopImmediatePropagation()
      this.cursorDown = true
      on(document, 'mousemove', this.mouseMoveDocumentHandler)
      on(document, 'mouseup', this.mouseUpDocumentHandler)
      document.onselectstart = () => false
    },
    mouseMoveDocumentHandler (e) { // 鼠标拖拽模拟
      if (this.cursorDown === false) return
      const prevPage = this[this.bar.axis]
      if (!prevPage) return
      const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1)
      const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage)
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset])

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
    },
    mouseUpDocumentHandler (e) { // 鼠标抬起事件
      this.cursorDown = false
      this[this.bar.axis] = 0
      off(document, 'mousemove', this.mouseMoveDocumentHandler) // 移除拖拽事件
      document.onselectstart = null
    }
  },
  render (h) {
    const { size, move, bar } = this
    let barStyle = Object.assign({}, renderThumbStyle({ size, move, bar }), this.barStyle)
    return h('div', {
      class: ['au-scrollbar__bar', 'is-' + bar.key],
      on: {
        mousedown: this.clickTrackHandler
      },
      style: this.barWrapStyle
    }, [
      h('div', {
        ref: 'thumb',
        class: ['au-scrollbar__thumb'],
        on: {
          mousedown: this.clickThumbHandler
        },
        style: barStyle
      })
    ])
  },
  destroyed () {
    off(document, 'mouseup', this.mouseUpDocumentHandler)
  }
}