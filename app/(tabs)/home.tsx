import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { user } = useGlobalContext();
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts, refetch: refetchTrending } = useAppwrite(getLatestPosts);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    refetchTrending();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} key={item.$id} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-xl font-pbold text-white">
                  {user?.username}
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
            <Trending posts={latestPosts} />
          </View>
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to upload a video"
            />
          )
        }
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
