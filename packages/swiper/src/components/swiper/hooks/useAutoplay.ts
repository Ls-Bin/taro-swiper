import {useEffect, useState} from 'react';
import {SwiperOptions} from "../components/swiper";
import {SlideReturnData} from "./useSlide";

type AutoplayProps = {
  options: SwiperOptions
  currentIndex: number
} & Pick<SlideReturnData, 'slideTo' | 'slideToLoop'>

export function useAutoplay(props: AutoplayProps) {
  const {options, slideTo, slideToLoop, currentIndex} = props
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    stopPlay()
    startPlay()
    return () => {
      stopPlay()
    }
  }, [currentIndex])


  function startPlay() {
    if (!options.autoplay) return
    setTimer(setInterval(() => {
        if (options.loop) {
          slideToLoop(currentIndex + 1, true)
        } else {
          slideTo(currentIndex + 1, true)
        }
      }, options?.autoplay?.delay || 3000)
    )
  }

  function stopPlay() {
    timer && clearInterval(timer)
  }

  return {
    startPlay,
    stopPlay
  }
}
