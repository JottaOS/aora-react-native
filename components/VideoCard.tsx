import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VideoCardProps } from "./interfaces";
import icons from "@/constants/icons";
import { ResizeMode, Video } from "expo-av";

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const {
    title,
    thumbnail,
    video: videoUrl,
    creator: { username, avatar },
  } = video;

  const [play, setPlay] = useState<boolean>(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="text-row gap-3 items-start">
        <View className="justify-center items-center flex-row">
          <View className="w-[46px] h-[46px] rounded-lg border justify-center items-center">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
          <View className="pt-2">
            <Image
              source={icons.menu}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </View>
        </View>
        {play ? (
          <Video
            /* TODO: Fix this error
            None of the available extractors (c, d, b, g, k, b, a0, d, h0, e, h, b, e, f, b, a) could read the stream
          */
            source={{ uri: videoUrl }}
            className="w-[90vw] h-72 rounded-xl mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
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
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-[90vw] h-60 rounded-xl mt-3 relative justify-center items-center"
          >
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              className="w-full h-full rounded-xl mt-3"
            />
            <Image
              source={icons.play}
              className="absolute w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
