import { router } from "expo-router";
import { View, Text } from "react-native";

import CustomButton from "@/components/CustomButton";
import DialerButton from "@/components/DialerButton";
import RideLayout from "@/components/RideLayout";
import { useLocationStore } from "@/store";
const RideMode = () => {
  const { setDriverLocation } = useLocationStore();
  return (
    <RideLayout snapPoints={["35%"]} title={"Ride Mode"}>
      <View className="mx-5 mt-3">
        <DialerButton phoneNumber="0719788033" />
        {/* add drive er picture and name  */}
        <Text>Driver picture and name</Text>
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
