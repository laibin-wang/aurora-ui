<template>
  <header class="main-header">
    <div class="header-container" flex="main:justify">
      <div class="left" style="width: 480px;" flex="main:justify cross:center">
        <div class="logo"></div>
      </div>
       <div class="link">
        <router-link :to="{name: 'guide'}" class="active">指南</router-link>
        <a href="#" class="github" target="_blank">GitHub</a>
       </div>
    </div>
  </header>
</template>
<script>
import navConf from '../nav.config.json'
export default {
  name: 'main-header',
  data () {
    return {
      components: [],
      current: ''
    }
  },
  created () {
    this.getComponentsOptions()
  },
  watch: {
    $route: {
      handler () {
        setTimeout(() => {
          this.current = ''
        }, 300)
      },
      immediate: true
    }
  },
  methods: {
    getComponentsOptions () {
      let routes = []
      Object.keys(navConf).forEach((header) => {
        routes = routes.concat(navConf[header])
      })

      let addComponent = (router) => {
        router.forEach((route) => {
          if (route.items) {
            addComponent(route.items)
            routes = routes.concat(route.items)
          } else {
            // 如果是组件路由
            if (['guide'].indexOf(route.name) === -1) {
              this.components.push({
                value: route.path,
                label: route.desc
              })
            }
          }
        })
      }
      addComponent(routes)
    }
  }
}
</script>
<style lang="less" scoped>
.main-header {
  background-color: #fff;
  box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
  opacity: 0.98;
  position: relative !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transition: all .3s;
  z-index: 100;
  .header-container {
    width: 100%;
    margin: 0 auto;
    height: 80px;
    .logo {
      color: #409EFF;
      text-transform: uppercase;
      font-weight: bold;
      font-family: helvetica;
      text-align: center;
      font-size: 40px;
      margin-left: 30px;
      width: 80px;
      height: 80px;
      background: url("../assets/aurora-ui.png") no-repeat 0 0;
      background-size: 80px 80px;
    }
    .left{
      float: left;
    }
    .link {
      padding: 0 20px;
      line-height: 80px;
      a {
        text-decoration: none;
        color: #1989fa;
        display: inline-block;
        line-height: 1.5;
        padding: 0 22px;
        font-size: 15px;
        &.github {
          color: #636363;
        }
      }
    }
  }
}
</style>
