import { ImagePickerAsset } from "expo-image-picker";
import { ImageSourcePropType } from "react-native";

export interface TabIconProps {
  icon: ImageSourcePropType;
  name: string;
  color: string;
  focused: boolean;
}

export interface CreateFormData {
  title: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompt: string;
}
