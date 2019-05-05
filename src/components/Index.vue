<template>
  <div>
    <!-- 开始按钮 -->
    <div class='startPage'>
      <h1>欢迎来到贪吃蛇游戏～</h1>
      <router-link to="/game">
        <div class="btn">
          开始游戏
        </div>
      </router-link>
    </div>
     <!-- 游戏页面 -->
    <div class='wrapper'>

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  color: #fff;
  display: inline-block;
  background: #409eff;
  cursor: pointer;
  border: 1px solid #409eff;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
