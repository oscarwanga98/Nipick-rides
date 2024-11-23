import React from "react";
import { Text, TouchableOpacity, Linking } from "react-native";

const DialerButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const handleDialPress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <TouchableOpacity
      className="bg-green-500 py-3 px-5 rounded-full my-3"
      onPress={handleDialPress}
    >
      <Text className="text-white text-lg font-bold text-center">
        Call {phoneNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default DialerButton;
