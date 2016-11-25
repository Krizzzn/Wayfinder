import axios from "axios";

export function postDataToApi(nodes, edges) {
  return function(dispatch) {
    axios.post("http://mockbin.org/bin/4a57b2a3-5c64-4c0f-a9ef-b9f187d22918", {nodes: nodes, edges: edges})
      .then((response) => {
        dispatch({type: "SAVE_DATA_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "SAVE_DATA_REJECTED", payload: err})
      })
  }
}