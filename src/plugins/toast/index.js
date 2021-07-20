import vue from "vue";

// 这里就是我们刚刚创建的那个静态组件
import toastComponent from "./toast.vue";
let timer1 = null;
let timer2 = null;
// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toastComponent);

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
export const showToast = (text, duration = 1500) => {
  if (document.getElementsByClassName("custom-toast-wrap").length) {
    return;
  }
  const toastDom = new ToastConstructor({
    el: document.createElement("div"),
    data() {
      return {
        text: text,
        showWrap: true, // 是否显示组件
        showContent: true, // 作用:在隐藏组件之前,显示隐藏动画
      };
    },
  });
  document.body.appendChild(toastDom.$el);
  timer1 && clearTimeout(timer1);
  timer2 && clearTimeout(timer2);
  // 提前 250ms 执行淡出动画(因为我们再css里面设置的隐藏动画持续是250ms)
  timer1 = setTimeout(() => {
    toastDom.showContent = false;
  }, duration - 1250);
  // 过了 duration 时间后隐藏整个组件
  timer2 = setTimeout(() => {
    toastDom.showWrap = false;
  }, duration);
};

// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast;
}

export default registryToast;
