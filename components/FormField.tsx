import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FormFieldProps } from "./interfaces";
import images from "@/constants/icons";

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row w-full h-16 px-4 border bg-black-100 border-black-200 rounded-2xl focus:border-secondary-100">
        <TextInput
          className="flex-1 text-base text-white font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="justify-center">
            <Image source={showPassword ? images.eyeHide : images.eye} resizeMode="contain" className="w-10 h-8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
