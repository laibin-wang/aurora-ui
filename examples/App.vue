<template>
  <div id="app" flex="dir:top box:first">
    <main-header></main-header>
    <div class="main-cnt" flex>
      <side-nav class="nav" flex-box="0"></side-nav>
      <div class="page-container" flex-box="1">
        <au-scrollbar style="height:100%;" ref="componentScrollBar">
          <router-view></router-view>
          <main-footer></main-footer>
        </au-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      showBackToTop: false,
      componentScrollBar: null
    }
  },
  watch: {
    '$route.path' () {
      // 触发伪滚动条更新
      this.componentScrollBox.scrollTop = 0
      debugger
      this.$nextTick(() => {
        this.componentScrollBar.update()
        if (this.$route.meta.desc) {
          this.$util.title(this.$route.meta.desc + ' - [aurora-ui]')
        }
      })
    }
  },
  mounted () {
    this.componentScrollBar = this.$refs.componentScrollBar
    this.componentScrollBox = this.componentScrollBar.$el.querySelector('.au-scrollbar__wrap')
  }
}
</script>
<style lang="less">
#app {
  font-size: 12px;
  width: 100%;
  height: 100%;
}
.main-cnt {
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, .5);
  .page-container {
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    .bin-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
