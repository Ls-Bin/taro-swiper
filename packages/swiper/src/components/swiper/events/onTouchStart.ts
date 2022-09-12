import {TouchesType} from "../types";

export default function onTouchStart(event, touch: TouchesType, swiperProps) {
  const touches = event?.touches[0]
  const pageX = touches?.pageX
  touch.touchStartX = pageX
  touch.startX = swiperProps.currentX

  // 最后第一页跳到第2页
  if (swiperProps.currentIndex === swiperProps.slides.length+1) {
    swiperProps.slideTo(1, false)
    const translateNum = -swiperProps.wrapWidth * 1
    touch.startX=translateNum
    touch.currentX=translateNum
    touch.offsetX=0
  }

  // 相反第一页，跳到最后二页
  if (swiperProps.currentIndex === 0) {
    swiperProps.slideTo(swiperProps.slides.length, false)
    const translateNum = -swiperProps.wrapWidth * swiperProps.slides.length
    touch.startX=translateNum
    touch.currentX=translateNum
    touch.offsetX=0
  }
  console.log('onTouchStart', touch, swiperProps)
}
