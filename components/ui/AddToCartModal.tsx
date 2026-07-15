import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, Image, ActivityIndicator } from 'react-native';
import { Plus, Minus, X, Check } from 'lucide-react-native';
import Product from '@/constants/productType';
import SizeSelector from './SizeSelector';
import Button from './button';

interface AddToCartModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | undefined;
  initialSize?: string;
  onConfirm: (productId: string, size: string, quantity: number) => Promise<void>;
}

export default function AddToCartModal({
  visible,
  onClose,
  product,
  initialSize = 'M',
  onConfirm,
}: AddToCartModalProps) {
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setSize(initialSize);
      setQuantity(1);
      setSuccess(false);
      setError(null);
      setLoading(false);
    }
  }, [visible, initialSize]);

  if (!product) return null;

  const availableSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : [
          { size: 'S', priceModifier: 0 },
          { size: 'M', priceModifier: 0.5 },
          { size: 'L', priceModifier: 1.0 },
        ];

  const selectedSizeObj = availableSizes.find((s: any) => s.size === size);
  const priceModifier = selectedSizeObj ? selectedSizeObj.priceModifier : 0;
  const singlePrice = product.price + priceModifier;
  const totalPrice = (singlePrice * quantity).toFixed(2);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm(product._id, size, quantity);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add to cart');
      setLoading(false);
    }
  };

  const imageSource = product.image
    ? { uri: product.image }
    : require('@/assets/images/notFoundImg.png');

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <Pressable className="flex-1" onPress={onClose} />
        <View className="rounded-t-[32px] bg-white px-6 pb-10 pt-6 shadow-2xl">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-[20px] font-bold text-coffee-dark font-sans">
              Add to Cart
            </Text>
            <Pressable onPress={onClose} className="p-2 -m-2 active:opacity-75">
              <X size={20} color="#313131" />
            </Pressable>
          </View>

          {/* Product Info Row */}
          <View className="flex-row items-center mb-6">
            <Image
              source={imageSource}
              className="h-16 w-16 rounded-2xl bg-coffee-100"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-[16px] font-bold text-coffee-dark font-sans" numberOfLines={1}>
                {product.name}
              </Text>
              <Text className="text-[12px] text-coffee-dark/70 mt-0.5 font-sans">
                {product.category?.name || 'Ice/Hot'}
              </Text>
            </View>
          </View>

          {/* Size Selector */}
          <Text className="text-[14px] font-bold text-coffee-dark font-sans mb-1">
            Size
          </Text>
          <SizeSelector
            sizes={availableSizes.map((s: any) => s.size)}
            selectedSize={size}
            onSelectSize={setSize}
          />

          {/* Quantity Selector */}
          <View className="flex-row items-center justify-between mt-6 mb-8">
            <Text className="text-[14px] font-bold text-coffee-dark font-sans">
              Quantity
            </Text>
            <View className="flex-row items-center bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl p-1">
              <Pressable
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 items-center justify-center rounded-lg bg-[#EAEAEA] active:scale-95"
              >
                <Minus size={16} color="#313131" />
              </Pressable>
              <Text className="text-[16px] font-bold text-[#313131] mx-6">
                {quantity}
              </Text>
              <Pressable
                onPress={() => setQuantity(quantity + 1)}
                className="w-10 h-10 items-center justify-center rounded-lg bg-coffee-primary active:scale-95"
              >
                <Plus size={16} color="white" />
              </Pressable>
            </View>
          </View>

          {error && (
            <View className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
              <Text className="text-red-600 text-xs font-sans text-center">{error}</Text>
            </View>
          )}

          {/* Total & Action Button */}
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[12px] text-coffee-dark/70 font-sans">Total Price</Text>
              <Text className="text-[20px] font-bold text-coffee-primary mt-0.5 font-sans">
                $ {totalPrice}
              </Text>
            </View>
            <Button
              onPress={handleAddToCart}
              disabled={loading}
              className="flex-1 ml-10"
            >
              {loading ? <ActivityIndicator size="small" color="white" /> : 'Add to Cart'}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
