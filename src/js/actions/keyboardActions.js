
export function registerKeyboardHandler(document, component){

        const targetIsTextarea = function(event){
            switch (event.target.tagName.toLowerCase()){
                case "input":
                case "textarea":
                case "select":
                    return true;
            }
            return false;            
        }
        const cancelEvent = function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.returnValue = false;
            return false;
        }

        document.addEventListener("keyup", function(event){
            if (targetIsTextarea(event))
                return true;

            component.props.dispatch(keypressed(event.keyCode, event));
            return cancelEvent(event);
        }, false);

        document.addEventListener("keydown", function(event){
            if (targetIsTextarea(event))
                return true;
            if (!component.props.last)
                return true;
            switch (event.keyCode){
                case 38: // up
                case 40: // down
                case 37: // left
                case 39: // right
                    break;
                default:
                    return;
            }
            component.props.dispatch(keypressed(event.keyCode, event));
            return cancelEvent(event);
        }, false);  
}

export function keypressed(keyCode, event) {

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
    case 38: // up
    case 40: // down
    case 37: // left
    case 39: // right
      return moveWaypoint(keyCode, event.shiftKey);
  	default:
  		console.log("key pressed: " + keyCode);
  		break;
  }
  return {
    type: 'IGNORE_EVENT'
  };
}

function moveWaypoint(keyCode, shiftKey){

  var moveBy = 5;
  if (shiftKey)
    moveBy = 1;
  if (keyCode === 38 || keyCode === 37)
    moveBy = moveBy * -1;

  var move = {x: 0, y: 0};

  switch(keyCode){
    case 38:
    case 40:
      move.y = moveBy;
      break;
    default:
      move.x = moveBy;
      break;
  }

  return {type: "MOVE", payload: move};
}