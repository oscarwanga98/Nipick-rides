import { router } from "expo-router";
import { Text, FlatList, View } from "react-native";

import { icons } from "@/constants";

import CustomButton from "@/components/CustomButton";
import PaymentCard from "@/components/PaymentCard";
import RideLayout from "@/components/RideLayout";
import { usePaymentMethodStore } from "@/store";

const paymentMethods = [
  {
    id: 1,
    name: "Visa",
    description: "Pay with your credit card",
    icon: icons.visa,
  },
  {
    id: 2,
    name: "Cash/Mpesa",
    description: "Pay with your Mpesa account",
    icon: icons.mpesa,
  },
];
const Payment = () => {
  const { selectedPaymentMethod, selectPaymentMethod } =
    usePaymentMethodStore();
  return (
    <RideLayout title={"Payment method"} snapPoints={["28%"]}>
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => (
          <PaymentCard
            PaymentMethod={item}
            selected={selectedPaymentMethod === item}
            setPaymentMethods={() => selectPaymentMethod(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <View className="mx-5 mt-4">
            <CustomButton
              title="Book Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default Payment;
