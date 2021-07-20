(function (S) {
  S.prototype.zjTrim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
  S.prototype.zjFill = function (args) {
    var s = this;
    if (args != null) {
      var r,
        type = Object.prototype.toString.call(args),
        arr =
          type == "[object Array]" || type == "[object Object]"
            ? args
            : arguments;
      for (var i in arr) {
        r = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(r, arr[i]);
      }
    }
    return s;
  };
  S.prototype.zjReplace = function (oldStr, newStr) {
    var s = this,
      i = 0;
    while ((i = s.indexOf(oldStr, i)) > -1) {
      s = s.substring(0, i) + newStr + s.substring(i + oldStr.length);
      i += newStr.length;
    }
    return s;
  };
})(String);

var helper = {
  /**
   * @description 获取当前URL参数
   * @param {string?} name 参数名称，为null时 则以json的格式返回所有的参数信息
   * @return {string} string/json
   */
  getUrlArg: function (name) {
    return this.getArgByUrl(location.href, name);
  },

  /**
   * @description 获取指定URL参数
   * @param {string?} url 为null时 则默认获取当前的URL
   * @param {string?} name 参数名称，为null时 则以json的格式返回所有的参数信息
   * @return {string} string/json
   */
  getArgByUrl: function (url, name) {
    var str = url.substring(url.indexOf("?") + 1),
      args = {};
    var i = str.indexOf("#");
    if (i > -1) str = str.substring(0, i);
    if (str) {
      var arr = str.split("&");
      for (let i in arr) {
        if (typeof arr[i] == "string") {
          var t = arr[i].split("="),
            v = t.length > 1 ? t[1] : "";
          v = v.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          args[t[0]] = v;
        }
      }
    }
    if (name != null) return args[name];
    return args;
  },
  /**
   * @description 获取当前可分享的URL，如果目标渠道是微信的话，会改变 host 为 wx.17u.cn
   * @param {string?} searchArg 需要携带的URL参数，可以是string/key[]/{key:val}
   * @return {string} url
   */
  getShareUrl: function (searchArg) {
    var protocol = location.protocol,
      host = "wx.17u.cn",
      url = protocol + "//" + host + location.pathname;
    url += location.search;

    if (searchArg) {
      if (typeof searchArg == "object") {
        var temp = searchArg;
        searchArg = "";
        if (Array.isArray(temp)) {
          var args = this.getUrlArg();
          for (var i in temp) {
            var key = temp[i],
              val = args[key];
            if (val != null)
              searchArg += "&" + key + "=" + encodeURIComponent(val);
          }
        } else {
          // eslint-disable-next-line no-redeclare
          for (var key in temp) {
            // eslint-disable-next-line no-redeclare
            var val = temp[key];
            if (val != null)
              searchArg += "&" + key + "=" + encodeURIComponent(val);
          }
        }
      }
      if (searchArg[0] == "?" || searchArg[0] == "&")
        searchArg = searchArg.substring(1);
      if (searchArg) url += (url.indexOf("?") > -1 ? "&" : "?") + searchArg;
    }
    url = this.getViewportUrl(url);
    return url;
  },

  /**
   * @description 为url添加wv_viewport参数，目前主要适用于app渠道的UI兼容问题
   * @param {string} url
   * @return {string} url
   */
  getViewportUrl: function (url) {
    var vp = "wv_viewport";
    if (url.indexOf(vp) > -1) return url;
    return url + (url.indexOf("?") > -1 ? "&" : "?") + vp;
  },
  /**
   * @description 获取带用户授权/登录的连接
   * @param {string?} url 为null时 则默认获取当前的URL
   * @param {boolean?} getUserInfo 是否获取用户信息，目前只对微信有用（获取头像和昵称）
   * @return {string}
   */
  getAuthUrl: function (url, getUserInfo) {
    if (!url) url = location.href;
    var authUrl;
    url = "https://wx.17u.cn/flight/{0}.html?url={1}".zjFill(
      getUserInfo ? "getwxuserinfo" : "getopenid",
      encodeURIComponent(url)
    );
    authUrl =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri={0}&response_type=code&scope={1}&state=123#wechat_redirect";
    authUrl = authUrl.zjFill(
      encodeURIComponent(url),
      getUserInfo ? "snsapi_userinfo" : "snsapi_base"
    );
    return authUrl;
  },

  /**
   * @description 获取当前带授权的URL
   * @param {string?} searchArg 需要携带的URL参数，可以是string/key[]/{key:val}
   * @param {boolean?} getUserInfo 是否获取用户信息，目前只对微信有用（获取头像和昵称）
   * @return {string}
   */
  getLocalAuthUrl: function (searchArg, getUserInfo) {
    var url = this.getShareUrl(searchArg);
    return this.getAuthUrl(url, getUserInfo);
  },
};

// const authUrl = helper.getLocalAuthUrl(
//   ['refid', "originUnionId", "originIcon", "isInvite", "sharekey"],
//   true
// )
// location.replace(authUrl)

module.exports = helper;
