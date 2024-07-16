import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";
import { TabIconProps } from "./interfaces";

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6 mb-1"/>
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color }}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs 
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle:{
            height: 60,
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: "#232533"
          },
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0'
        }} 
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                focused={focused}
                name="Home"
                icon={icons.home}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                focused={focused}
                name="Bookmark"
                icon={icons.bookmark}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                focused={focused}
                name="Create"
                icon={icons.plus}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                focused={focused}
                name="Profile"
                icon={icons.profile}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
