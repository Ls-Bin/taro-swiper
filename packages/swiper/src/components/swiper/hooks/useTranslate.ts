import { useState} from 'react';

export type Translate = {
  translateStyle: {},
  setTranslateStyle,
  setTranslate: (translatePx, isTransition) => void
}


export function useTranslate() {
  const [translateStyle, setTranslateStyle] = useState({});

  /**
   * 设置位移距离
   * @param translatePx - 位移值 px
   * @param isTransition - 是否开启过渡动画
   */
  function setTranslate(translatePx, isTransition) {
    const styles = {
      transform: 'translate3d(' + (translatePx) + 'px, 0px, 0px)',
      transitionDuration: !isTransition ? '0ms' : '300ms'
    }
    setTranslateStyle(styles)
  }

  return {
    translateStyle,
    setTranslateStyle,
    setTranslate
  };
}
