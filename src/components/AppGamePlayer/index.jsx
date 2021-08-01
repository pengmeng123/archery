import styles from "./index.module.less";
import _ from "lodash";
import { mapState } from "vuex";
import { localStorage } from "@/utils/storage";
import { TC_ARCHERY_USER_INFO } from "@/config/api";
export default {
  name: "AppGamePlayer",
  computed: {
    ...mapState(["gameInfo"]),
    members() {
      const playerList = _.get(this.gameInfo, "currentGame.playerList") || [];
      const user = localStorage.get(TC_ARCHERY_USER_INFO) || {};
      return playerList
        .map((v, index) => {
          return {
            icon: v.icon,
            name: v.nick,
            className: `player${index + 1}`,
            extraName: `player-${v.uuid}`,
          };
        })
        .concat(
          _.get(user, "nick")
            ? [
                {
                  icon: _.get(user, "icon"),
                  name: _.get(user, "nick"),
                  marjor: true,
                  className: "selfPlayer",
                },
              ]
            : []
        );
    },
  },
  render() {
    const { members } = this;
    return (
      <div class={styles.container}>
        <ul class={styles.group}>
          {members.map((v) => (
            <li
              class={{
                [styles.marjor]: v.marjor,
                [v.className]: !!v.className,
                [v.extraName]: !!v.extraName,
                [styles[v.className]]: !!v.className,
              }}
            >
              <div class={styles.tx}>
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
          ))}
        </ul>
      </div>
    );
  },
};
