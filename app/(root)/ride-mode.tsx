import { router } from "expo-router";
import { View } from "react-native";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";

const RideMode = () => {
  return (
    <RideLayout snapPoints={["15%"]} title={"Ride Mode"}>
      <View className="mx-5 mt-10">
        <CustomButton
          title="Cancel"
          onPress={() => router.push("/(root)/book-ride")}
        />
      </View>
    </RideLayout>
  );
};
export default RideMode;
