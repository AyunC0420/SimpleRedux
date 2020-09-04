function createStore(state, stateChanger) {
  //数据仓库管理中心
  const getState = (state) => state; //数据获取
  const listeners = [];
  const subScribe = (listener) => listeners.push(listener);
  const dispatch = (action) => {
    stateChanger(action, state); //数据修改
    listeners.forEach((listener) => listener());
  };

  return { getState, dispatch,subScribe };
}

function renderApp(appState) {
  debugger;
  renderTitle(appState.title);
  renderContent(appState.content);
}

function renderTitle(title) {
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;
}

function renderContent(content) {
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = content.text;
  contentDOM.style.color = content.color;
}
let appState = {
  title: {
    text: "React.js 小书",
    color: "red",
  },
  content: {
    text: "React.js 小书内容",
    color: "blue",
  },
};
function stateChanger(action, state) {
  //具体修改内容
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      state.title.text = action.text;
      break;
    case "UPDATE_CONTENT_COLOR":
      state.title.color = action.color;
    default:
      break;
  }
}
const store = createStore(appState, stateChanger); //数据仓库构建
store.subScribe(()=>renderApp(store.getState()))
renderApp(store.getState()); // 首次渲染页面
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "《React.js 小书》" }); // 修改标题文本
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "blue" }); // 修改标题颜色
renderApp(store.getState());
