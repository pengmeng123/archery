import goldImg from "@/assets/images/gold.png";
const $ = window.$;

const BetsMixin = {
  mounted() {
    const that = this;
    this.$nextTick(() => {
      // 5s请求接口获取玩家投注，播放动画
      setInterval(() => {
        that.onStartFly($(".player1"), $("#btnTTVictory"));
        that.onStartFly($(".player2"), $("#btnCCVictory"));
        that.onStartFly($(".player4"), $("#btnCCVictory"));
      }, 5000);

      // 同同获胜
      $("#btnTTVictory").click(function () {
        that.onStartFly($(".selfPlayer"), $("#btnTTVictory"));
      });
      // 平局
      // 程程获胜
      $("#btnCCVictory").click(function () {
        that.onStartFly($(".selfPlayer"), $("#btnCCVictory"));
      });
    });
  },
  methods: {
    onStartFly(startTarget, endTarget) {
      var flyer = $(
        `<img src=${goldImg} style="width:30px;height:30px;" />`
      ).clone(); //动态创建抛物体对象并克隆
      flyer.load(() => {
        flyer.fly({
          start: {
            left: startTarget.offset().left + startTarget.outerWidth() / 2 - 10, //开始位置（必填）#fly元素会被设置成position: fixed
            top: startTarget.offset().top, //开始位置（必填）
          },
          end: {
            left: endTarget.offset().left + endTarget.outerWidth() / 2, //结束位置（必填）
            top: endTarget.offset().top + endTarget.outerHeight() / 2, //结束位置（必填）
            width: 10, //结束时高度
            height: 10, //结束时高度
          },
          speed: 2, //越大越快，默认1.2
          onEnd: function () {
            $(flyer).remove();
          },
        });
      });
    },
  },
};
export default BetsMixin;
