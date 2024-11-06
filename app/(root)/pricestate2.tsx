import axios from "axios";
import { useEffect } from "react";
import { router } from "expo-router";
import { Text, FlatList, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useCarCategoryStore } from "@/store";
import { usePricingStore } from "@/store/price";
import CategoryCard2 from "@/components/CategoryCard2";

const PriceStatement = () => {
  const { setSelectedCategory, selectedCategory } = useCarCategoryStore();
  const { setPricingData, prices } = usePricingStore();

  useEffect(() => {
    const fetchCarCategories = async () => {
      try {
        const requestBody = {
          distance: 13,
          duration: 28,
          origin: "Umoja 3, PWG4+775, Nairobi",
          destination: "Huduma Centre - GPO, Nairobi",
          tripTime: "2024-10-03T08:30:00Z",
          latitude: -1.27641,
          longitude: 36.90433,
        };

        const response = await axios.post(
          "http://192.168.0.102:8081/(api)/prices/prices",
          requestBody
        );

        const pricingData = response.data;
        setPricingData({
          baseFare: pricingData.baseFare,
          distanceCost: pricingData.distanceCost,
          timeCost: pricingData.timeCost,
          surgeMultiplier: pricingData.surgeMultiplier,
          weatherAdjustment: pricingData.weatherAdjustment,
          driverRatingAdjustment: pricingData.driverRatingAdjustment,
          prices: pricingData.prices,
        });
      } catch (error) {
        console.error("Error fetching car categories:", error);
      }
    };

    fetchCarCategories();
  }, [setPricingData]);

  return (
    <RideLayout title="Price Statement" snapPoints={["55%", "75%"]}>
      {prices.length > 0 ? (
        <FlatList
          data={prices}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <CategoryCard2
              item={item}
              setSelected={() => setSelectedCategory(item)}
              // selected={selectedCategory === item}
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
      ) : (
        <Text>Loading prices...</Text>
      )}
    </RideLayout>
  );
};

export default PriceStatement;
