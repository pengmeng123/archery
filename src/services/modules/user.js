import { WXGAME_EXECUTE } from "@/config/api";
import http from "@/utils/http";
import _ from "lodash";
import { currentUser } from "@/config/user";
const testParams = {
  ts: 1624159609635,
  platId: 501,
  callerid: "train.mo.frontend",
  actCode: "27dcf2fdbe3668bb2b44930d20b9ed0d",
  refId: "1675627881",
  rid: "1675627881",
  action: "gameInfo",
  pid: 501,
  ...currentUser,
};

export const getExcute = (data) =>
  http
    .post(WXGAME_EXECUTE, { ...testParams, ...data })
    .then((r) => _.get(r, "data"));

export const gamePlay = (data) => {
  return http
    .post(WXGAME_EXECUTE, { ...testParams, action: "play", ...data })
    .then((r) => _.get(r, "data"));
};
export const gameMainInfo = (data) => {
  return http
    .post(WXGAME_EXECUTE, { ...testParams, action: "mainInfo", ...data })
    .then((r) => _.get(r, "data"));
};
export const gameSign = (data) => {
  return http
    .post(WXGAME_EXECUTE, { ...testParams, action: "sign", ...data })
    .then((r) => _.get(r, "data"));
};
export const gameExchange = (data) => {
  return http
    .post(WXGAME_EXECUTE, { ...testParams, action: "mainMallInfo", ...data })
    .then((r) => _.get(r, "data"));
};

export const goldExchange = (data) => {
  return http
    .post(WXGAME_EXECUTE, { ...testParams, action: "goldExchange", ...data })
    .then((r) => _.get(r, "data"));
};

export const acquireTaskOrExchange = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...testParams,
      action: "acquireTaskOrExchange",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};
