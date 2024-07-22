import { View, Text, Image } from "react-native";
import React from "react";
import { EmptyStateProps } from "./interfaces";
import images from "@/constants/images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" />
      <Text className="text-xl font-pbold text-white mb-1">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton title="Create video" handlePress={() => router.push("create")} containerStyles="w-full my-5"/>
    </View>
  );
};

export default EmptyState;