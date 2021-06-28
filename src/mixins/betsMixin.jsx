import goldImg from "@/assets/images/gold.png";
import { mapState } from "vuex";
const $ = window.$;

const BetsMixin = {
  data() {
    return {
      betsTimer: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 5s请求接口获取玩家投注，播放动画
      // this.betsTimer = setInterval(() => {
      //   this.onStartFly($(".player1"), $("#btnTTVictory"));
      //   this.onStartFly($(".player2"), $("#btnCCVictory"));
      //   this.onStartFly($(".player4"), $("#btnCCVictory"));
      // }, 4000);

      // 同同获胜
      $("#btnTTVictory").click(() => {
        this.onStartFly($(".selfPlayer"), $("#btnTTVictory"));
      });
      // 平局
      // 程程获胜
      $("#btnCCVictory").click(() => {
        this.onStartFly($(".selfPlayer"), $("#btnCCVictory"));
      });
    });
  },
  computed: {
    ...mapState(["startMatch", "count"]),
  },
  watch: {
    count() {
      // if (newVal < 4) {
      //   clearInterval(this.betsTimer);
      // }
      clearInterval(this.betsTimer);
    },
  },
  methods: {
    onStartFly(startTarget, endTarget) {
      if (this.count < 4) {
        console.log("禁止游戏投注时间");
        return;
      }
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
