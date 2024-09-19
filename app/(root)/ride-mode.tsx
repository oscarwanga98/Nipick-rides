import { router } from "expo-router";
import { View } from "react-native";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";

const RideMode = () => {
  return (
    <RideLayout snapPoints={["15%"]} title={"Ride Mode"}>
      <View className="mx-5 mt-3">
        <CustomButton
          title="Cancel"
          // cancel ride and go back home
          //reseet all states
          onPress={() => router.push("/(root)/home")}
        />
      </View>
    </RideLayout>
  );
};
export default RideMode;
