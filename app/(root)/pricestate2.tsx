import { router } from "expo-router";
import { Text, FlatList, View } from "react-native";

import CategoryCard2 from "@/components/CategoryCard2";
import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useCarCategoryStore } from "@/store";

// replace this with api call
let carCategories = [
  { id: 1, name: "Economy", maxPassengers: 3, engineCapacity: 650 },
  { id: 2, name: "Economy Plus", maxPassengers: 4, engineCapacity: 1000 },
  { id: 3, name: "Motor Bike", maxPassengers: 1, engineCapacity: 150 },
  {
    id: 4,
    name: "Motor Bike Electric",
    maxPassengers: 1,
    engineCapacity: 100,
  },
  { id: 5, name: "XL", maxPassengers: 7, engineCapacity: 1500 },
];

const PriceStatement = () => {
  const { setSelectedCategory, selectedCategory } = useCarCategoryStore();

  return (
    <RideLayout title="Price Statement" snapPoints={["75%"]}>
      <FlatList
        data={carCategories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CategoryCard2
            item={item}
            setSelected={() => setSelectedCategory(item)}
            selected={selectedCategory === item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mt-3">
            <CustomButton
              title="Request Ride"
              onPress={() => router.push("/(root)/payment")}
              disabled={!selectedCategory}
              className={`${!selectedCategory ? "bg-slate-200" : ""}`}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default PriceStatement;
