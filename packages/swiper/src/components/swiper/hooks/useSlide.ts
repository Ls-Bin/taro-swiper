import {useEffect, useState} from 'react';
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

  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    if (!isInit && props.wrapWidth) {
      if (props.loop) {
        if (props.currentIndex === 0) {
          slideTo(1, false)
        } else {
          slideTo(props.currentIndex, false)
        }

        setIsInit(true)
      } else {
        setIsInit(true)
      }
    }
  },)


  function slideTo(index, isTransition = true) {

    props.setCurrentIndex(index)
    const translateNum = -props.wrapWidth * index
    props.setCurrentX(translateNum)
    props.setTranslate(translateNum, isTransition,)
    // console.log('slideTo=', index, translateNum, props)
    //
  }

  function slideToLoop(index, isTransition = true) {

    if (index > props.slides.length) {
      slideTo(0, false)
      setTimeout(() => {
        slideTo(1, true)
      }, 0)
      return
    }

    props.setCurrentIndex(index)
    const translateNum = -props.wrapWidth * index
    props.setCurrentX(translateNum)
    props.setTranslate(translateNum, isTransition,)
  }

  return {
    slideTo,
    slideToLoop,
  } as SlideReturnData;
}
