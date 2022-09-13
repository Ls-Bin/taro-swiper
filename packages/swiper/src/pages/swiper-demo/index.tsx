import React, {useCallback, useState} from "react";
import {View, Text, Button, Image} from "@tarojs/components";
import {useEnv, useNavigationBar,} from "taro-hooks";
// import {Swiper, SwiperItem} from "../../../../../dist";
// import '../../../../../rollup.build.css'
import {Swiper, SwiperItem} from "../../components/swiper";

import './index.less'

const Index = () => {
  const env = useEnv();
  const [_, {setTitle}] = useNavigationBar({title: "Taro Hooks"});
  const [imgs] = useState([
    'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe1.jpg',
    'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg',
    'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg',
    'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe4.jpg',
    'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe5.jpg',
  ])
  return (
    <View className="wrapper">
      <Swiper options={{loop: true, autoplay: true}}>
        {imgs.map((d, i) => (<SwiperItem key={i}>
          <View>
            <Image src={d} style={{width:'100%'}}/>
          </View>
        </SwiperItem>))}
      </Swiper>
    </View>
  )
    ;
};

export default Index;
