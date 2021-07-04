export default {
  name: "App",
  mounted() {
    document.getElementById("appLoading").style.display = "none";
  },
  render() {
    return (
      <div id="app" style="height:100%">
        <router-view />
      </div>
    );
  },
};
