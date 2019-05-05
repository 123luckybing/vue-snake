<template>
  <div class='score'>
    <div class="content">
      <div class="header">游戏结束</div>
      <div class="end">最终得分：{{ score }}</div>
      <div class="btn-wrapper">
        <div class="btn">
          <router-link to="/">确定</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['score']
}
</script>

<style scoped>
.score {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
}

.content {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
  margin-top: 60px;
}

.header {
  position: relative;
  padding: 15px 15px 10px;
}

.end {
  position: relative;
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}

.btn-wrapper {
  position: relative;
  height: 40px;
}

.btn {
  color: #fff;
  display: inline-block;
  background: #409eff;
  cursor: pointer;
  border: 1px solid #409eff;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  right: 30px;
  position: absolute;
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
