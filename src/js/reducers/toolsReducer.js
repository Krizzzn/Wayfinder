export default function reducer(state={
    snap: true,
    dropNodes: true,
    selectPathMode: false,
  }, action) {

    switch (action.type) {
      case "TOGGLE_TOOL":{
        const newState = {
          ...state
        }
        newState[action.payload] = !newState[action.payload];
        return newState;
      }
  }

    return state;
}
