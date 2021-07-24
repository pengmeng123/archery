import { WXGAME_EXECUTE } from "@/config/api";
import http from "@/utils/http";
import _ from "lodash";
import { localStorage } from "@/utils/storage";
import { TC_ARCHERY_USER_INFO } from "@/config/api";

const testParams = {
  ts: 1624159609635,
  platId: 501,
  callerid: "train.mo.frontend",
  actCode: "27dcf2fdbe3668bb2b44930d20b9ed0d",
  refId: "1675627881",
  rid: "1675627881",
  action: "gameInfo",
  pid: 501,
};

export const getExcute = (data) =>
  http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      ...data,
    })
    .then((r) => _.get(r, "data"));

export const gamePlay = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      action: "play",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};
export const gameMainInfo = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      action: "mainInfo",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};
export const gameSign = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      action: "sign",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};
export const gameExchange = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      action: "mainMallInfo",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};

export const goldExchange = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      action: "goldExchange",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};

export const acquireTaskOrExchange = (data) => {
  return http
    .post(WXGAME_EXECUTE, {
      ...{ ...testParams, ...(localStorage.get(TC_ARCHERY_USER_INFO) || {}) },
      action: "acquireTaskOrExchange",
      ...data,
    })
    .then((r) => _.get(r, "data"));
};
