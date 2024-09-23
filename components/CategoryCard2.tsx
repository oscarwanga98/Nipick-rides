import { Text, View, TouchableOpacity, Image } from "react-native";

import { icons } from "@/constants";
import { CategoryCard2Props } from "@/types/type";
const CategoryCard2 = ({ item, setSelected, selected }: CategoryCard2Props) => {
  const renderCategoryIcon = () => {
    switch (item.name.toLowerCase()) {
      case "economy":
        return (
          <Image source={icons.economy} style={{ width: 40, height: 40 }} />
        );
      case "economy plus":
        return (
          <Image source={icons.economyPlus} style={{ width: 40, height: 40 }} />
        );
      case "motor bike":
        return (
          <Image source={icons.motobike} style={{ width: 40, height: 40 }} />
        );
      case "motor bike electric":
        return (
          <Image source={icons.motobike} style={{ width: 40, height: 40 }} />
        );
      case "xl":
        return <Image source={icons.xl} style={{ width: 40, height: 40 }} />;
      default:
        return (
          <Image source={icons.economy} style={{ width: 40, height: 40 }} />
        );
    }
  };
  return (
    <TouchableOpacity
      className={`${
        selected ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
      onPress={setSelected}
    >
      {renderCategoryIcon()}
      <View className="flex-1 flex flex-col items-start justify-center mx-3 ">
        <View className="flex flex-row items-center justify-start mb-1">
          <Text className="text-lg font-JakartaRegular">{item.name}</Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.person} className="w-3.5 h-3.5" />
            <Text className="text-sm font-JakartaRegular">3 Passanger(s)</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start ">
          <View className="flex flex-row items-center">
            <Image source={icons.map} className="w-4 h-4" />
            <Text className="text-sm font-JakartaRegular ml-1">5,000 KSH</Text>
          </View>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800">
            {/* {formatTime(item.time!)} */}2 MIN
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800">
            {item.maxPassengers} seats
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard2;
