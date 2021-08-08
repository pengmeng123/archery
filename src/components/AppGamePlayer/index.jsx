import styles from "./index.module.less";
import _ from "lodash";
import { mapState, mapGetters } from "vuex";
import { localStorage } from "@/utils/storage";
import { TC_ARCHERY_USER_INFO } from "@/config/api";
import txEmptyImg from "@/assets/images/guide/tx-empty.png";

export default {
  name: "AppGamePlayer",
  computed: {
    ...mapState(["gameInfo", "resultAwardNumberStatus"]),
    ...mapGetters(["gameResult"]),
    members() {
      const playerList = _.get(this.gameInfo, "currentGame.playerList") || [];
      const user = localStorage.get(TC_ARCHERY_USER_INFO) || {};
      return [0, 1, 2, 3]
        .map((f, index) => {
          if (_.get(playerList, `${[index]}.uuid`)) {
            const v = _.get(playerList, `${[index]}`);
            return {
              icon: v.icon,
              name: v.nick,
              uuid: v.uuid,
              className: `player${index + 1}`,
              extraName: `player-${v.uuid}`,
            };
          } else {
            return {
              icon: txEmptyImg,
              name: "虚位以待",
              className: `player${index + 1}`,
            };
          }
        })
        .concat(
          _.get(user, "nick")
            ? [
                {
                  icon: _.get(user, "icon"),
                  name: _.get(user, "nick"),
                  uuid: _.get(this.gameInfo, "currentGame.uuid"),
                  marjor: true,
                  className: "selfPlayer",
                },
              ]
            : []
        );
    },
    winGolds() {
      const playerList = _.get(this.gameResult, "playerList") || [];
      const mybet = _.get(this.gameResult, "mybet") || [];

      const arr = playerList.map((v) => {
        return {
          name: v.nick,
          uuid: v.uuid,
          golds: _.get(v, "bet", []).reduce((sum, r) => {
            return sum + r.account;
          }, 0),
        };
      });
      const myWinGolds = mybet.reduce((sum, r) => {
        return sum + r.account;
      }, 0);
      const uuid = _.get(this.gameInfo, "currentGame.uuid");
      if (myWinGolds > 0) {
        arr.push({
          uuid,
          golds: myWinGolds,
        });
      }
      return _.keyBy(arr, "uuid");
    },
  },
  methods: {
    renderList() {
      const { members } = this;
      return members.map((v) => {
        const golds = _.get(this.winGolds, `${v.uuid}.golds`) || 0;
        return (
          <li
            class={{
              [styles.marjor]: v.marjor,
              [v.className]: !!v.className,
              [v.extraName]: !!v.extraName,
              [styles[v.className]]: !!v.className,
            }}
          >
            <div class={styles.tx}>
              <div
                vShow={this.resultAwardNumberStatus && !!golds}
                class={{
                  [styles.resultAwardText]: true,
                  [styles.fadeOutUp]: true,
                }}
              >
                +{golds}
              </div>
              <img src={v.icon} class={styles.txImg} />
              {v.marjor ? (
                <img
                  src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tx-bg.png"
                  class={styles.txBg}
                />
              ) : null}
            </div>
            <div class={styles.name}>{v.name}</div>
          </li>
        );
      });
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <ul class={styles.group}>{this.renderList()}</ul>
      </div>
    );
  },
};
