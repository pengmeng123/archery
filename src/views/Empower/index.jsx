import helper from "@/utils/helper";
export default {
  name: "Empower",
  mounted() {
    // const newUrl = decodeURIComponent(
    //   "https://wx.17u.cn/hcpzt/20210512sendCouponRCtest/index?imgurl=https://thirdwx.qlogo.cn/mmopen/vi_32/EccamU2gEQEnPd6DqVnC9kRwPIwiaFxR8vRvia5aKy7NBasfZjQLBoxlAhnjMZ5BA2Xc3hJ3KpuSroUCD9cWWBsg/132&nickname=%e7%81%ab%e8%bd%a6%e7%a5%a8%e8%bf%90%e8%90%a5%e5%ae%89%e5%8d%93%e6%9c%ba&openid=oOCyauM-dRXoiu1jxJyQJibK5yxY&token=47_I-kGxjTfKz7eg_Bsk6xZNTM2r9QM-tL78yIP7LqKi1qhiwlJVG-25760ZG6VeTskIg3XRjMuc_7gZ7pMlQlY3A&unionid=ohmdTt59JqKGJTy4tSpzunpeZwD"
    // );
    // // const r1 = this.getRequest(newUrl);
    // console.log("ss--", helper.getArgByUrl(newUrl, "imgurl"));
    let nick = helper.getUrlArg("nickname") || "同程用户";
    const headimg =
      helper.getUrlArg("imgurl") ||
      "https://file.40017.cn/huochepiao/activity/20200521supplies/img/defaultImg-fs8.png";
    const openid = helper.getUrlArg("openid") || helper.getUrlArg("code");
    if (openid) {
      console.log("nick---", nick);
      console.log("headering--", headimg);
      console.log("openid--", openid);
    } else {
      // 如果拿到url参与
      const authUrl = helper.getLocalAuthUrl([], true);
      console.log(decodeURIComponent(authUrl));
      location.replace(authUrl);
    }
  },
  render() {
    return <div>ssff---------------s</div>;
  },
};
