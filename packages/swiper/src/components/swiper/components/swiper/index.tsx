import Taro, {} from "@tarojs/taro";
import {View,} from "@tarojs/components";
import "./index.less";
import {useEffect, useState} from "react";
import {useTouch} from "../../hooks/useTouch";
import {useSlide} from "../../hooks/useSlide";
import {useTranslate} from "../../hooks/useTranslate";
import {useAutoplay} from "../../hooks/useAutoplay";

export type SwiperOptions = {
  //是否循环
  loop?: boolean
  // 自动执行
  autoplay: boolean & { delay?: number }

}

type SwiperProps = {
  children: [any]
  options: SwiperOptions
}


export function Swiper(props: SwiperProps) {
  const {options} = props

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const [wrapWidth, setWrapWidth] = useState(0);

  const {translateStyle, setTranslate} = useTranslate()

  const {slideTo, slideToLoop} = useSlide({
    currentIndex, setCurrentIndex,
    wrapWidth, setCurrentX, slides: props.children, loop: options.loop, setTranslate
  })
  const {onTouchEnd, onTouchMove, onTouchStart} = useTouch({
    slides: props.children,
    currentIndex,
    wrapWidth,
    currentX,
    setCurrentX,
    slideTo,
    setTranslate
  })

  const {startPlay,stopPlay} = useAutoplay({options, currentIndex, slideTo, slideToLoop})

  useEffect(() => {
    if (!wrapWidth) {
      const query = Taro.createSelectorQuery()
      query.select('.swiper')
        .boundingClientRect()
        .exec(res => {
          setWrapWidth(() => res[0]?.width || 0)
        })
    }
  });

  return (
    <View className='swiper'>
      currentIndex={currentIndex}
      <View onClick={() => slideTo(currentIndex - 1)}>上一个</View>
      <View onClick={() => slideTo(currentIndex + 1)}>下一个</View>
      <View className='swiper-wrapper' style={{...translateStyle, width: wrapWidth + 'px'}} onTouchStart={(e) => {
        onTouchStart(e);
        stopPlay()
      }} onTouchEnd={() => {
        onTouchEnd();
        startPlay()
      }}
            onTouchMove={onTouchMove}>
        {options.loop ? ([props.children[props.children.length - 1], ...props.children, props.children[0]]).map((d, i) => ({
          ...d,
          key: i
        })) : props.children}
      </View>
    </View>
  );

}


