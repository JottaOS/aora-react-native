import { View, Text, Image, ScrollView, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { user } = useGlobalContext();

  const onRefresh = () => {
    setRefreshing(true);
    // re recall videos
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: "1" }, { id: "2" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text key={item.id}>{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-xl font-pbold text-white">
                  {user?.$id}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              placeholder="Search for a video topic"
              handleChangeText={() => {}}
              value=""
            />
            <Text className="text-gray-100 font-pregular text-lg my-3">
              Latest videos
            </Text>
            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (<EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />)}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}
      />
    </SafeAreaView>
  );
};

export default Home;