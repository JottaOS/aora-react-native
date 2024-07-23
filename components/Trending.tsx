import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { useState } from "react";
import {
  TrendingProps,
  Video as VideoType,
  ViewableItemsChangedCallback,
} from "./interfaces";
import * as Animatable from "react-native-animatable";
import icons from "@/constants/icons";
import { zoomIn, zoomOut } from "@/constants/animations";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: VideoType;
}) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Animatable.View
      className="mx-2"
      // @ts-ignore
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={300}
    >
      {play ? (
        <Video
          /* TODO: Fix this error
            None of the available extractors (c, d, b, g, k, b, a0, d, h0, e, h, b, e, f, b, a) could read the strea
          */
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-xl mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            // @ts-ignore
            const { didJustFinish, error } = status;

            if (didJustFinish) {
              setPlay(false);
            }

            if (error) {
              console.error(error);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-xl my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string>(posts[1]?.$id);

  const viewableItemsChanged: ViewableItemsChangedCallback = (info) => {
    const { viewableItems } = info;
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 130, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
