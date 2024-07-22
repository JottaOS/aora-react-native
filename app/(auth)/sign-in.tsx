import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import { Login } from "@/components/interfaces";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert("Please fill in all the fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form);
      const result = await getCurrentUser();
      setUser(result || null);
      setIsLoggedIn(true);
      // set it to global state...
      Alert.alert("Success", "User signed in successfully!");
      router.replace("/home");
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="justify-center w-full px-4 my-6 min-h-[85vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[35px]"
          />
          <Text className="mt-10 text-2xl text-white font-psemibold">
            Sign in
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Your email address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Your password"
          />
          <CustomButton
            title="Log in"
            handlePress={submit}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-sm text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="sign-up" className="font-psemibold text-secondary-100">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
