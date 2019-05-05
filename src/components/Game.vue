<template>
  <div>
     <!-- 游戏页面 -->
    <div class='wrapper'>
        <div class="score">得分: {{ score }}</div>
        <div class="state" @click="stateChange">{{ state }}</div>
        <div class='game-box'>
          <div class="food" :style="{top: `${foodTop}`, left: `${foodLeft}`}"></div>
          <div class='snake'>
            <div
              v-for="(item, index) in snakeArr"
              :key="index"
              :class=" index == 0 ? 'head' : 'body' "
              :style="{top: item.y * 10 + 'px', left: item.x * 10 + 'px' }"
            ></div>
          </div>
        </div>
    </div>
    <Score :style="{display: `${isShow}`}" :score='score'/>
  </div>
</template>

<script>
import Score from './Score'
// 食物位置横纵坐标数组 content h600 w400
let leftDotMax = 600 / 10 - 1
let topDotMax = 400 / 10 - 1
let leftDotArr = [] // 横坐标数组
let topDotArr = [] // 纵坐标数组
for (let i = 0; i <= leftDotMax; i++) {
  leftDotArr.push(i)
}
for (let j = 0; j <= topDotMax; j++) {
  topDotArr.push(j)
}
export default {
  components: {
    Score
  },
  data () {
    return {
      state: '||',
      score: 0,
      isShow: 'none',
      foodLeft: '',
      foodTop: '',
      leftDot: '',
      topDot: '',
      direction: 'right',
      // 运动的定时器
      timer: setInterval(() => {
        this.move()
      }, 500),
      // 定义蛇数组 数组中每个对象第一个代表是什么，第二个表示x位置，第三个表示y位置
      snakeArr: [
        {
          name: 'head',
          x: 3,
          y: 1
        }, {
          name: 'body',
          x: 2,
          y: 1
        }, {
          name: 'body',
          x: 1,
          y: 1
        }
      ]
    }
  },
  methods: {
    // 食物位置函数
    foodPos () {
      // 食物形成坐标点
      let leftDot = leftDotArr[parseInt(Math.random() * 60)]
      let topDot = topDotArr[parseInt(Math.random() * 40)]
      this.leftDot = leftDot
      this.topDot = topDot
      // 计算食物位置
      this.foodLeft = leftDot * 10 + 'px'
      this.foodTop = topDot * 10 + 'px'
    },
    moving () {
      this.timer
    },
    // 蛇移动函数
    move () {
      // 移动思路: 蛇每一个小球的位置都等于其前一个小球的坐标
      for (let i = this.snakeArr.length - 1; i > 0; i--) {
        // 向右 x轴+1，y不变
        this.snakeArr[i].x = this.snakeArr[i - 1].x
        this.snakeArr[i].y = this.snakeArr[i - 1].y
      }
      switch (this.direction) {
        // 向右运动，蛇头 x+1
        case 'right':
          this.snakeArr[0].x += 1
          break
        // 向左运动 蛇头x-1
        case 'left':
          this.snakeArr[0].x -= 1
          break
        // 向上运动 蛇头y-1
        case 'up':
          this.snakeArr[0].y -= 1
          break
        // 向下运动 蛇头y+1
        case 'down':
          this.snakeArr[0].y += 1
          break
        default:
          break
      }
      // 吃到了食物 蛇头的坐标 === 食物的坐标
      let getFood = (this.snakeArr[0].x === this.leftDot) && (this.snakeArr[0].y === this.topDot)
      if (getFood) {
        this.snakeArr.push({
          name: 'body',
          x: this.snakeArr[this.snakeArr.length - 1].x,
          y: this.snakeArr[this.snakeArr.length - 1].y
        })
        this.score += 1
        this.foodPos()
      }
      // 蛇撞墙游戏 game over
      let over = (this.snakeArr[0].x < 0) || (this.snakeArr[0].y < 0) || (this.snakeArr[0].x > 59) || (this.snakeArr[0].y > 39)
      if (over) {
        this.isShow = 'block' // 弹出得分弹框
        clearInterval(this.timer)
      }
    },
    // 改变游戏状态
    stateChange () {
      if (this.state === '||') {
        this.state = '>'
        clearInterval(this.timer)
      } else {
        this.state = '||'
        // this.moving()
      }
    }
  },
  mounted () {
    this.foodPos()
    this.moving()
  },
  created () {
    // 监听键盘事件
    var that = this
    document.onkeydown = function (e) {
      let evn = e || event
      let key = evn.keyCode || evn.which || evn.charCode
      // 清除之前的定时器
      clearInterval(this.timer)
      if (key === 38) {
        if (that.direction === 'up' || that.direction === 'down') {
          return
        }
        that.direction = 'up'
      }
      if (key === 37) {
        if (that.direction === 'left' || that.direction === 'right') {
          return
        }
        that.direction = 'left'
      }
      if (key === 40) {
        if (that.direction === 'up' || that.direction === 'down') {
          return
        }
        that.direction = 'down'
      }
      if (key === 39) {
        if (that.direction === 'right' || that.direction === 'left') {
          return
        }
        that.direction = 'right'
      }
      // 重新移动
      that.moving()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  border: 1px dotted #ccc;
  position: relative;
}

.score {
  font-weight: 500;
  margin-top: 10px;
}

.state {
  position: absolute;
  top: 10px;
  left: 20px;
  color: #fff;
  display: inline-block;
  background: #409eff;
  cursor: pointer;
  border: 1px solid #409eff;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
  text-align: center;
  line-height: 50px;
  width: 50px;
  height: 50px;
  font-size: 14px;
  border-radius: 50%;
}

.game-box {
  position: absolute;
  width: 600px;
  height: 400px;
  left: 50%;
  top: 50%;
  border: 1px dotted #ccc;
  transform: translate(-50%, -50%)
}

.food {
  width: 10px;
  height: 10px;
  background: #000;
  position: absolute;
}

.head {
  width: 10px;
  height: 10px;
  background: red;
  position: absolute;
  border-radius: 50%;
}

.body {
  width: 10px;
  height: 10px;
  background: green;
  position: absolute;
  border-radius: 50%;
}

.snake {
  position: relative;
}
</style>
