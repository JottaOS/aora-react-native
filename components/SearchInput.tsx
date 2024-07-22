import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FormFieldProps, SearchInputProps } from "./interfaces";
import images from "@/constants/icons";

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChangeText,
  placeholder,
}) => {
  return (
    <View className="flex-row w-full h-16 px-4  border bg-black-100 border-black-200 rounded-2xl focus:border-secondary-100 space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity className="justify-center">
        <Image
          source={images.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
