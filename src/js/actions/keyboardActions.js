
export function keypressed(keyCode) {
  switch(keyCode){
    case 8:   // BACKSPACE
    	return {type: 'RETRACT'};
    case 68:  // d
      return {type: 'DESELECT'};
    case 90:  // z
    case 89:  // y
    	return {type: "TOGGLE_TOOL", payload: "dropNodes"}
    case 83:  // s
    	return {type: "TOGGLE_TOOL", payload: "selectPathMode"}
    case 88: // x
      return {type: "TOGGLE_TOOL", payload: "snap"}
  	default:
  		console.log("key pressed: " + keyCode);
  		break;
  }
  return {
    type: 'IGNORE_EVENT'
  };
}