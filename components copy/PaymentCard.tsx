import { View, Text, Image, TouchableOpacity } from "react-native";
import { PaymentCardProps } from "@/types/type";

const PaymentCard = ({
  PaymentMethod,
  selected,
  setPaymentMethods,
}: PaymentCardProps) => {
  return (
    <TouchableOpacity
      onPress={setPaymentMethods}
      className={`${
        selected ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-3 px-3 rounded-xl`}
    >
      <View className="flex flex-row items-center  ">
        <Image
          source={PaymentMethod.icon}
          className="w-12 h-12 mr-4 align-middle"
        />
        <Text className="text-lg font-bold align-middle">
          {PaymentMethod.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;
