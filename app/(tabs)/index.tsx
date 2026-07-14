import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, SlidersHorizontal } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Search from '@/components/ui/Search';
import PromoCard from '@/components/ui/PromoCard';
import CategoryChip from '@/components/ui/CategoryChip';
import ProductCard from '@/components/ui/ProductCard';
import { useProductStore } from '@/store/product.store';
import { useCategoryStore } from '@/store/category.store';
import { useCartStore } from '@/store/cart.store';
import AddToCartModal from '@/components/ui/AddToCartModal';
import { router } from 'expo-router';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Coffee');
  const [selectedProduct, setSelectedProduct] = useState<any>(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const { fetchProducts, products, loading } = useProductStore();
  const { fetchCategories, categories } = useCategoryStore();
  const { cart, fetchCart, addToCart, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    fetchCategories();
    fetchCart();
  }, []);

  useEffect(() => {
    const activeCategoryObj = categories.find((c) => c.name === activeCategory);
    const categoryId = activeCategory === 'All Coffee' ? undefined : activeCategoryObj?._id;

    fetchProducts({
      category: categoryId,
    });
  }, [activeCategory, categories]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const showLoadingState = loading && filteredProducts.length === 0;

  const handleNavTodetails = (id:string) => {
    router.navigate({ pathname: '/details', params: { id: id } });
  };
  const categoryNames = ['All Coffee', ...categories.map((c) => c.name)];
  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar style="light" />
      {showLoadingState ? (
        <View className="flex-1 items-center justify-center bg-[#F9F9F9]">
          <ActivityIndicator size="large" color="#C67C4B" />
          <Text className="mt-3 text-sm text-[#8C8C8C]">Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 24 }}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <LinearGradient
                colors={['#0A0A0A', '#131313']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ paddingTop: insets.top + 16, paddingBottom: 130, paddingHorizontal: 16 }}>
                <View className="mb-6">
                  <Text className="text-12-semibold mb-1.5 text-xs text-[#B7B7B7]">Location</Text>
                  <Pressable className="flex-row items-center self-start">
                    <Text className="text-16-semibold mr-1.5 text-white">Bilzen, Tanjungbalai</Text>
                    <ChevronDown size={14} color="white" />
                  </Pressable>
                </View>
                <View className="flex-row items-center justify-between">
                  <Search
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search coffee"
                    containerClassName="flex-1 mr-3"
                  />
                  <Pressable className="h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-coffee-primary active:opacity-80">
                    <SlidersHorizontal size={20} color="white" />
                  </Pressable>
                </View>
              </LinearGradient>
              <View className="mb-6 px-6" style={{ marginTop: -85 }}>
                <PromoCard />
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
                className="mb-6">
                {categoryNames.map((category) => (
                  <CategoryChip
                    key={category}
                    category={category}
                    isActive={activeCategory === category}
                    onPress={() => setActiveCategory(category)}
                  />
                ))}
              </ScrollView>
            </>
          }
          renderItem={({ item }) => {
            const matchedCartItems = cart?.items?.filter((ci) => ci?.product?._id === item._id) || [];
            const cartQuantity = matchedCartItems.reduce((sum, ci) => sum + ci.quantity, 0);

            const handleIncrement = () => {
              const firstMatched = matchedCartItems[0];
              if (firstMatched) {
                updateQuantity(firstMatched._id, firstMatched.quantity + 1);
              }
            };

            const handleDecrement = () => {
              const firstMatched = matchedCartItems[0];
              if (firstMatched) {
                if (firstMatched.quantity > 1) {
                  updateQuantity(firstMatched._id, firstMatched.quantity - 1);
                } else {
                  removeItem(firstMatched._id);
                }
              }
            };

            const handleAddPress = () => {
              setSelectedProduct(item);
              setModalVisible(true);
            };

            return (
              <ProductCard
                product={item}
                cartQuantity={cartQuantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onAddPress={handleAddPress}
                onPress={() => {
                  handleNavTodetails(item._id);
                }}
              />
            );
          }}
        />
      )}
      <AddToCartModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onConfirm={async (productId, size, quantity) => {
          await addToCart(productId, size, quantity);
        }}
      />
    </View>
  );
}
