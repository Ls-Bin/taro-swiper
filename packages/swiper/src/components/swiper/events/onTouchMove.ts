import {TouchesType} from "../types";

export default function onTouchMove(event, touch: TouchesType) {
  const touches = event?.touches[0]
  const pageX = touches?.pageX || 0
  const offsetX = touch.touchStartX - pageX
  touch.currentX = Math.floor( (touch.startX - offsetX))
  touch.offsetX = offsetX
}
