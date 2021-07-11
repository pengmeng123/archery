import { WXGAME_EXECUTE } from "@/config/api";
import http from "@/utils/http";
import _ from "lodash";

const testParams = {
  ts: 1624159609635,
  platId: 501,
  callerid: "train.mo.frontend",
  actCode: "27dcf2fdbe3668bb2b44930d20b9ed0d",
  refId: "1675627881",
  rid: "1675627881",
  nickName: "%E4%BF%A1%E5%BF%B5%E3%80%8215145387569",
  icon: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKcthg7CBtDdID2MQOjdnlgLaInSrW9gLykhia5WahlGDJB3TLFficTHRycX5EopfyhzMMxTuY3G1pg/132",
  action: "gameInfo",
  idenid: "oOCyauG-UILHMYW-yW313lCaI0LQ",
  pid: 501,
};

export const getExcute = (data) =>
  http
    .post(WXGAME_EXECUTE, { ...testParams, ...data })
    .then((r) => _.get(r, "data"));

export const gamePlay = (data) => {
  console.log("data--", data);
  return http
    .post(WXGAME_EXECUTE, { ...testParams, action: "play", ...data })
    .then((r) => _.get(r, "data"));
};
