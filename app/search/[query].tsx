import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => searchPosts(query));
  const { query } = useLocalSearchParams();

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} key={item.$id} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-xl font-pbold text-white">{query}</Text>
            <View className="my-8">
              <SearchInput
                placeholder="Search for a video topic"
                initialQuery={query}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query"
            />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
