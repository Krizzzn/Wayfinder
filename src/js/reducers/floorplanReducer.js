export default function reducer(state={
    floorplan: "floor1.svg",
    floors: [
      {name: "First Floor", file: "floor1.svg"},
      {name: "Second Floor", file: "floor2.svg"}
    ],
  }, action) {

    switch (action.type) {
      case "CHANGE_FLOORPLAN": {
        return {...state, floorplan: action.payload};
      }
    }

    return state;
}
