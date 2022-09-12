import {View, } from "@tarojs/components";
import "./index.less";
import {useEffect,useCallback} from "react";

export function SwiperItem(props) {
  useEffect(() => {
    console.log(this)
  });

  const itemRef = useCallback(node => {
    if (node !== null) {
      // setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return (
    <View className='swiper-item' ref={itemRef}>
      {props.children}
    </View>
  );

}


