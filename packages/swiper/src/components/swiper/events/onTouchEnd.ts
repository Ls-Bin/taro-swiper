import {TouchesType} from "../types";

export default function onTouchEnd(touch: TouchesType, swiperProps) {
  const offsetX = touch.offsetX
  // 判断触摸多大范围 触发上下页滚动
  if (Math.abs(offsetX / swiperProps.wrapWidth) > 1 / 5) {
    if (offsetX >= 0) {
      // next
      swiperProps.slideTo(swiperProps.currentIndex + 1, true)
    } else {
      // prev
      swiperProps.slideTo(swiperProps.currentIndex - 1, true)
    }

  } else {
    swiperProps.slideTo(swiperProps.currentIndex, true)
  }
}
