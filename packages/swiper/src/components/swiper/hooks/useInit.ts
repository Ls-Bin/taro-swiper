import { SwiperProps } from '../components/swiper/index';
import { useEffect, useState } from 'react';
import { generateTranslateX } from '../utils/translate';
import Taro, { } from "@tarojs/taro";

export function useInit(props: SwiperProps&{setTranslate:any}) {
    const { options } = props

    const [isInit, setIsInit] = useState(false)
    const [wrapWidth, setWrapWidth] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    let initIndex = 0
    let x = 0
    if(!isInit){
        if(wrapWidth){
            if (options.loop) {
                initIndex=1
                x = generateTranslateX(initIndex, wrapWidth)
                setCurrentIndex(initIndex)
                setCurrentX(x)
                props.setTranslate(x,false)
                setIsInit(true)
                console.log(initIndex);
                
            }else{
                setIsInit(true)
            }
        }
    }


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

    return {
        currentIndex, setCurrentIndex,
        currentX, setCurrentX,
        wrapWidth, setWrapWidth,
        isInit
    }
}