import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, Star } from 'lucide-react-native';
import { useProductStore } from '@/store/product.store';
import { CustomCoffeeIcon, CustomDeliveryIcon, CustomMilkIcon } from '@/components/icons';
import Button from '@/components/ui/button';
import SizeSelector from '@/components/ui/SizeSelector';
import AddToCartModal from '@/components/ui/AddToCartModal';
import { useCartStore } from '@/store/cart.store';

export default function Details() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [imageError, setImageError] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [modalVisible, setModalVisible] = useState(false);
  const { fetechProduct, productLoading, product } = useProductStore();
  const { addToCart } = useCartStore();

  const availableSizes =
    product?.sizes && product.sizes.length > 0
      ? product.sizes
      : [
          { size: 'S', priceModifier: 0 },
          { size: 'M', priceModifier: 0.5 },
          { size: 'L', priceModifier: 1.0 },
        ];

  useEffect(() => {
    if (product) {
      const sizeNames = availableSizes.map((s: any) => s.size);
      if (!sizeNames.includes(selectedSize)) {
        setSelectedSize(sizeNames[0] || 'M');
      }
    }
  }, [product, availableSizes]);

  const selectedSizeObj = availableSizes.find((s: any) => s.size === selectedSize);
  const priceModifier = selectedSizeObj ? selectedSizeObj.priceModifier : 0;
  const currentPrice = ((product?.price || 0) + priceModifier).toFixed(2);

  const imageSource =
    product?.image && !imageError
      ? { uri: product.image }
      : require('../assets/images/notFoundImg.png');

  useEffect(() => {
    if (id) {
      fetechProduct(id as string);
    }
  }, [id]);

  if (productLoading || !product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#C67C4E" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ paddingTop: insets.top }} className="bg-white">
        <View className="flex-row items-center justify-between px-6 py-4">
          <Pressable onPress={() => router.back()} className="p-2 -m-2 active:opacity-75">
            <ChevronLeft size={24} color="#2F2D2C" />
          </Pressable>
          <Text className="text-[18px] font-bold text-[#2F2D2C] font-sans">Detail</Text>
          <Pressable onPress={() => setFavorite(!favorite)} className="p-2 -m-2 active:opacity-75">
            <Heart
              size={24}
              color={favorite ? '#C67C4E' : '#2F2D2C'}
              fill={favorite ? '#C67C4E' : 'transparent'}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Image
          source={imageSource}
          className="h-60 w-full rounded-[24px] bg-coffee-100"
          resizeMode="cover"
          onError={() => setImageError(true)}
        />

        <View className="mt-5">
          <View className="flex-row justify-between items-start">
            <View className="flex-grow mr-4 max-w-[65%]">
              <Text className="text-[22px] font-bold text-[#2F2D2C] font-sans" numberOfLines={1}>
                {product.name}
              </Text>
              <Text className="text-[12px] text-[#9B9B9B] mt-1 font-sans">
                {product.category?.name || 'Ice/Hot'}
              </Text>
              <View className="flex-row items-center mt-3">
                <Star size={18} color="#FBBE21" fill="#FBBE21" />
                <Text className="text-[16px] font-bold text-[#2F2D2C] ml-1 font-sans">
                  {product.rating || '4.8'}
                </Text>
                <Text className="text-[12px] text-[#9B9B9B] ml-1 font-sans">
                  (230)
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3 items-center">
              <View className="w-[44px] h-[44px] bg-[#F9F9F9] rounded-[14px] items-center justify-center">
                <CustomDeliveryIcon color="#C67C4E" size={20} />
              </View>
              <View className="w-[44px] h-[44px] bg-[#F9F9F9] rounded-[14px] items-center justify-center">
                <CustomCoffeeIcon color="#C67C4E" size={20} />
              </View>
              <View className="w-[44px] h-[44px] bg-[#F9F9F9] rounded-[14px] items-center justify-center">
                <CustomMilkIcon color="#C67C4E" size={20} />
              </View>
            </View>
          </View>
        </View>

        <View className="h-[1px] bg-[#EAEAEA] my-5" />

        <Text className="text-[16px] font-bold text-[#2F2D2C] font-sans">
          Description
        </Text>
        <Text className="text-[14px] text-[#9B9B9B] leading-5 font-sans mt-3">
          {isReadMore ? product.description : `${product.description.slice(0, 120)}${product.description.length > 120 ? '...' : ''}`}
          {product.description.length > 120 && (
            <Text
              onPress={() => setIsReadMore(!isReadMore)}
              className="text-[#C67C4E] font-semibold"
            >
              {isReadMore ? ' Read Less' : ' Read More'}
            </Text>
          )}
        </Text>

        <Text className="text-[16px] font-bold text-[#2F2D2C] mt-6 font-sans">
          Size
        </Text>
        <SizeSelector
          sizes={availableSizes.map((s: any) => s.size)}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
      </ScrollView>

      <View
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
        className="bg-white border-t border-[#F0F0F0] px-6 pt-5 rounded-t-[24px] shadow-lg shadow-black/10 flex-row justify-between items-center"
      >
        <View>
          <Text className="text-[12px] text-[#9B9B9B] font-sans">Price</Text>
          <Text className="text-[18px] font-bold text-[#C67C4E] mt-1 font-sans">
            $ {currentPrice}
          </Text>
        </View>
        <Button
          onPress={() => setModalVisible(true)}
          className="flex-1 ml-10"
        >
          Buy Now
        </Button>
      </View>

      <AddToCartModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={product}
        initialSize={selectedSize}
        onConfirm={async (productId, size, quantity) => {
          await addToCart(productId, size, quantity);
        }}
      />
    </View>
  );
}

