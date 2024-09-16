import { router } from "expo-router";
import { Text, FlatList, View } from "react-native";

import CategoryCard from "@/components/CategoryCard";
import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useCategoryStore } from "@/store";

const PriceStatement = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoryStore();
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

  return (
    <RideLayout title="Price Statement">
      <FlatList
        data={carCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            selected={selectedCategory!} // Check if the category is selected
            setSelected={() => setSelectedCategory(item.id!)} // Update the selected category
          />
        )}
        ListFooterComponent={() => (
          <View>
            <CustomButton
              title="Request Ride"
              onPress={() => router.push("/(root)/payment")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default PriceStatement;
