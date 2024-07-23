import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { FormFieldProps, SearchInputProps } from "./interfaces";
import images from "@/constants/icons";
import { router, usePathname } from "expo-router";

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  const onPress = () => {
    if (!query)
      return Alert.alert("Missing query", "Please input something to search");

    if (pathname.startsWith("/search")) router.setParams({ query });
    else router.push(`/search/${query}`);
  };

  return (
    <View className="flex-row w-full h-16 px-4  border bg-black-100 border-black-200 rounded-2xl focus:border-secondary-100 space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={setQuery}
      />
      <TouchableOpacity className="justify-center" onPress={onPress}>
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
