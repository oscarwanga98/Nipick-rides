import React, { useState } from "react";
import { router } from "expo-router";
import { Text, FlatList, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

import PaymentCard from "@/components/PaymentCard";
import RideLayout from "@/components/RideLayout";

const paymentMethods = [
  {
    id: 1,
    name: "Visa",
    description: "Pay with your credit card",
    icon: "https://example.com/visa-icon.png",
  },
  {
    id: 2,
    name: "Cash/Mpesa",
    description: "Pay with your Mpesa account",
    icon: "https://example.com/visa-icon.png",
  },
];
const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };
  return (
    <RideLayout title={"Payment method"}>
      <Text>Title</Text>
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => (
          <PaymentCard
            PaymentMethod={item}
            isSelected={item.id === selectedPaymentMethod?.id}
            onSelect={handleSelect}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
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
