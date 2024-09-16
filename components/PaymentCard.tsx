import { View, Text, Image, TouchableOpacity } from "react-native";

const PaymentCard = ({ PaymentMethod, isSelected, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(PaymentMethod)}>
      <View
        className={[
          "flex flex-row items-center p-4 border-b border-gray-200",
          isSelected ? "bg-blue-100" : "bg-white",
        ].join(" ")}
      >
        {/* <Image source={{ uri: paymentMethod.icon }} className="w-6 h-6 mr-4" /> */}
        <Text className="text-lg font-bold">{PaymentMethod.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;
