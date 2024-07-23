import { DocumentPickerAsset } from "expo-document-picker";
import { ImageSourcePropType } from "react-native";

export interface TabIconProps {
  icon: ImageSourcePropType;
  name: string;
  color: string;
  focused: boolean;
}

export interface CreateFormData {
  title: string;
  video: DocumentPickerAsset | null;
  thumbnail: DocumentPickerAsset | null;
  prompt: string;
}
