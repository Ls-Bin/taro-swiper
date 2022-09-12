import {Dispatch, SetStateAction, useState} from 'react';
import events from '../events'
import {TouchesType} from "../types";
import {Translate} from "./useTranslate";

type TouchProps = {
  currentIndex: number;
  wrapWidth: number;
  currentX: number;
  setCurrentX: Dispatch<SetStateAction<number>>;
  slideTo: (index,isTransition:boolean) => void
  slides: [any]
} & Pick<Translate, 'setTranslate'>

export function useTouch(props: TouchProps) {

  const [isTouch, setIsTouch] = useState(false);
  const [allowMove, setAllowMove] = useState(false);
  const [touches, setTouches] = useState<TouchesType>({
    touchStartX: 0,
    currentX: 0,
    startX: 0,
    offsetX: 0,
  });

  const onTouchStart = (event) => {
    setIsTouch(true)
    events.onTouchStart(event, touches, props)
    setTouches(touches)
    setAllowMove(true)
  }

  const onTouchEnd = () => {
    events.onTouchEnd( touches, props)
    setAllowMove(false)
    setIsTouch(false)
  }

  const onTouchMove = (event) => {
    if (allowMove) {
      events.onTouchMove(event, touches, )
      props.setCurrentX(touches.currentX)
      props.setTranslate(touches.currentX, false)
      setTouches(touches)
    }

  }


  return {
    onTouchMove,
    onTouchStart,
    onTouchEnd,
    isTouch
  };
}
