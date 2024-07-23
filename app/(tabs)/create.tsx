import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { CreateFormData } from "./interfaces";
import { createVideoPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const initialForm: CreateFormData = {
  title: "",
  video: null,
  thumbnail: null,
  prompt: "",
};

const Create = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateFormData>(initialForm);
  const { user } = useGlobalContext();

  const openPicker = async (selectType: "video" | "image") => {
    const documentType =
      selectType === "image"
        ? ["image/png", "image/jpg", "image/jpeg"]
        : ["video/mp4", "video/gif"];

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    const { prompt, thumbnail, title, video } = form;
    if (!prompt || !thumbnail || !title || !video) {
      Alert.alert("Hm...", "Please fill in all the fields");
      return;
    }

    setUploading(true);
    try {
      await createVideoPost({ ...form, userId: user?.$id });
      Alert.alert("Success", "Post uploaded successfully");
      setForm(initialForm);
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error?.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload video</Text>
        <FormField
          title="Video title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-200 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="contain"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 flex-row space-x-2 border-black-200">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-5"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
