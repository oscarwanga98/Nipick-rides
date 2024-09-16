import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    user?.primaryPhoneNumber?.phoneNumber || ""
  );

  const handleEditPress = async () => {
    const clerkId= user?.id
    if (isEditMode) {
      // Save the new phone number
      try {
        const response = await fetch("/(api)/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clerkId, phoneNumber }),
        });

        if (!response.ok) {
          throw new Error(`Error updating phone number: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Phone number updated successfully: ${data.data}`);
        setIsEditMode(!isEditMode);
      } catch (error) {
        console.error(`Error updating phone number: ${error}`);
      }
    }
    // Toggle between edit and view mode
    setIsEditMode(!isEditMode);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={phoneNumber}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditMode}
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
              textContentType="telephoneNumber"
            />

            <View className="flex w-full pt-3 pb-3 justify-center ">
              <CustomButton
                title={isEditMode ? "Save" : "Edit"}
                className="w-20 items-center"
                onPress={handleEditPress}
              />
            </View>
            <Text>"{user.id}"</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
