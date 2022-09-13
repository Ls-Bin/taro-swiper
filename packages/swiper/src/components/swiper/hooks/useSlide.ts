import {useEffect, useState} from 'react';
import { generateTranslateX } from '../utils/translate';
import {Translate} from "./useTranslate";

export type SlideProps = {
  currentIndex: number;
  setCurrentIndex: any;
  wrapWidth: number;
  setCurrentX: number;
  slides: [any],
  loop?: boolean,
} & Pick<Translate, 'setTranslate'>

export type SlideReturnData = {
  slideTo: (number, boolean?) => void
  slideToLoop: (number, boolean?) => void
}

export function useSlide(props: { wrapWidth: number; slides: [any]; loop: boolean | undefined; setCurrentIndex: (value: (((prevState: number) => number) | number)) => void; currentIndex: number; setTranslate: (translatePx, isTransition) => void; setCurrentX: (value: (((prevState: number) => number) | number)) => void }) {

  function slideTo(index, isTransition = true) {
    props.setCurrentIndex(index)
    const translateNum = generateTranslateX(index,props.wrapWidth)
    props.setCurrentX(translateNum)
    props.setTranslate(translateNum, isTransition,)
  }

  function slideToLoop(index, isTransition = true) {

    // 下一页操作
    if (index > props.slides.length&&props.currentIndex===props.slides.length) {
      slideToLoop(0, false)
      setTimeout(() => {
        slideToLoop(1, true)
      }, 20)
      return
    }

    // 上一页操作
    if (index === 0&&props.currentIndex===1) {
      slideToLoop(props.slides.length+1, false)
      setTimeout(() => {
        slideToLoop(props.slides.length, true)
      }, 20)
      return
    }

    props.setCurrentIndex(index)
    const translateNum =  generateTranslateX(index,props.wrapWidth)
    props.setCurrentX(translateNum)
    props.setTranslate(translateNum, isTransition,)
  }

  return {
    slideTo,
    slideToLoop,
  } as SlideReturnData;
}
