import MyComponent from "./component";

export default class testPlugin {
  start() {
  }
  stop() {}

  processGuildsBar (e) {
				let [children, index] = BdApi.React.findParent(e.returnvalue, {name: "UnreadDMs"});
				if (index > -1) children.splice(index + 1, 0, BdApi.React.createElement(MyComponent, {}));
	}

  getSettingsPanel() {
    return MyComponent;
  }
}