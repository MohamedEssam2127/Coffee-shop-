import { View, Text, ScrollView, Image, Pressable, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit, FileText, Plus, Minus, ChevronRight, ChevronDown, Check } from 'lucide-react-native';
import Button from '../../components/ui/button';
import { Colors } from '../../lib/colors';
import { useState, useCallback, useEffect } from 'react';
import { CustomCupIcon, CustomDiscountIcon, CustomWalletIcon } from '../../components/icons';
import { orderService } from '../../lib/orderService';
import { useCartStore } from '@/store/cart.store';
import { useFocusEffect, router } from 'expo-router';
import { api } from '@/lib/api';

export default function OrderScreen() {
  const cart = useCartStore((s) => s.cart);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const [deliveryType, setDeliveryType] = useState<'deliver' | 'pickup'>('deliver');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [address, setAddress] = useState('Home');
  const [fullAddress, setFullAddress] = useState('Fetching address...');
  const [note, setNote] = useState('');
  const [orderError, setOrderError] = useState<string | null>(null);

  const [addressDraft, setAddressDraft] = useState('');
  const [fullAddressDraft, setFullAddressDraft] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const [initialLoaded, setInitialLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchCart().finally(() => {
        setInitialLoaded(true);
      });
    }, [])
  );


  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get('/users/me/addresses');
        const data = response.data.data || response.data;
        if (Array.isArray(data) && data.length > 0) {
          const defaultAddr = data.find((addr: any) => addr.isDefault) || data[0];
          setAddress(defaultAddr.label || 'Home');
          setFullAddress(`${defaultAddr.street}, ${defaultAddr.city}`);
        } else {
          setAddress('Home');
          setFullAddress('No address saved. Tap edit to add.');
        }
      } catch (err) {
        console.log('Error fetching address:', err);
        setAddress('Home');
        setFullAddress('Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.');
      }
    };
    fetchAddress();
  }, []);

  const openAddressModal = () => {
    setAddressDraft(address);
    setFullAddressDraft(fullAddress);
    setIsAddressModalVisible(true);
  };

  const openNoteModal = () => {
    setNoteDraft(note);
    setIsNoteModalVisible(true);
  };

  const placeOrder = async () => {
    try {
      setIsPlacingOrder(true);
      setOrderError(null);

      await orderService.placeOrder({
        deliveryAddress: deliveryType === 'deliver' ? fullAddress : 'Main Coffee Shop (Pick Up)',
        discountApplied: 0,
      });

      await clearCart();

      setIsModalVisible(false);
      router.replace('/(tabs)');
    } catch (requestError) {
      setOrderError('Unable to place the order right now. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const cartSubtotal = cart?.totalPrice || 0;
  const deliveryFee = deliveryType === 'deliver' ? 2.0 : 0.0;
  const discountedFee = deliveryType === 'deliver' ? 1.0 : 0.0;
  const totalPrice = cartSubtotal + discountedFee;

  const hasItems = cart && cart.items && cart.items.length > 0;

  if (!initialLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-coffee-cream">
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text className="mt-4 text-[14px] text-coffee-dark/70">Loading your order details...</Text>
      </SafeAreaView>
    );
  }

  if (!hasItems) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-coffee-cream px-5">
        <View className="items-center">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-[#FAEDE5]">
            <CustomCupIcon size={40} color={Colors.primary} />
          </View>
          <Text className="text-[20px] font-bold text-coffee-dark mb-2">Your Cart is Empty</Text>
          <Text className="text-center text-[14px] text-coffee-dark/70 mb-8 max-w-[280px]">
            Looks like you haven't added any coffee yet. Start exploring our menu to place an order!
          </Text>
          <Button onPress={() => router.replace('/(tabs)')} className="px-8 py-3.5">
            Explore Menu
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-coffee-cream">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}>

        <View className="mb-6 mt-4 flex-row rounded-full bg-[#F2F2F2] p-1">
          <Pressable
            onPress={() => setDeliveryType('deliver')}
            className={`flex-1 items-center rounded-full py-3 ${deliveryType === 'deliver' ? 'bg-coffee-primary' : 'bg-transparent'}`}>
            <Text
              className={`text-[16px] font-semibold ${deliveryType === 'deliver' ? 'text-white' : 'text-coffee-dark'}`}>
              Deliver
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setDeliveryType('pickup')}
            className={`flex-1 items-center rounded-full py-3 ${deliveryType === 'pickup' ? 'bg-coffee-primary' : 'bg-transparent'}`}>
            <Text
              className={`text-[16px] font-semibold ${deliveryType === 'pickup' ? 'text-white' : 'text-coffee-dark'}`}>
              Pick Up
            </Text>
          </Pressable>
        </View>

        <Text className="mb-3 text-[16px] font-bold text-coffee-dark">
          {deliveryType === 'deliver' ? 'Delivery Address' : 'Pick Up Location'}
        </Text>
        <Text className="mb-1 text-[14px] font-bold text-coffee-dark">
          {deliveryType === 'deliver' ? address : 'Main Coffee Shop'}
        </Text>
        <Text className="mb-4 text-[12px] text-coffee-dark/70">
          {deliveryType === 'deliver' ? fullAddress : 'Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.'}
        </Text>

        <View className="mb-6 flex-row gap-2">
          {deliveryType === 'deliver' && (
            <Pressable
              onPress={openAddressModal}
              className="flex-row items-center rounded-full border border-gray-600 px-4 py-1.5">
              <Edit size={14} color={Colors.primary900} className="mr-1.5" />
              <Text className="text-[16px] text-coffee-dark">Edit Address</Text>
            </Pressable>
          )}
          <Pressable
            onPress={openNoteModal}
            className="flex-row items-center rounded-full border border-gray-600 px-4 py-1.5">
            <FileText size={14} color={Colors.primary900} className="mr-1.5" />
            <Text className="text-[16px] text-coffee-dark">
              {note ? 'Edit Note' : 'Add Note'}
            </Text>
          </Pressable>
        </View>

        {note ? (
          <View className="mb-6 rounded-2xl border border-[#E9D6C8] bg-[#FAF4EF] px-4 py-3">
            <Text className="mb-1 text-[12px] font-semibold uppercase tracking-[1px] text-coffee-primary">
              Note
            </Text>
            <Text className="text-[13px] text-coffee-dark">{note}</Text>
          </View>
        ) : null}

        <View className="mb-6 h-[1px] bg-border" />

        {cart?.items?.map((item) => {
          const imageSource = item.product.image && !imageErrors[item._id]
            ? { uri: item.product.image }
            : require('../../assets/images/notFoundImg.png');

          return (
            <View key={item._id} className="mb-6 flex-row items-center">
              <Image
                source={imageSource}
                className="mr-4 h-14 w-14 rounded-2xl bg-coffee-100"
                onError={() => setImageErrors(prev => ({ ...prev, [item._id]: true }))}
              />
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-coffee-dark" numberOfLines={1}>
                  {item.product.name}
                </Text>
                <Text className="text-[12px] text-coffee-dark/70">Size: {item.size}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Pressable
                  onPress={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item._id, item.quantity - 1);
                    } else {
                      removeItem(item._id);
                    }
                  }}
                  className="h-7 w-7 items-center justify-center rounded-full border border-border">
                  <Minus size={16} color={Colors.primary900} />
                </Pressable>
                <Text className="text-[14px] font-bold text-coffee-dark">{item.quantity}</Text>
                <Pressable
                  onPress={() => {
                    updateQuantity(item._id, item.quantity + 1);
                  }}
                  className="h-7 w-7 items-center justify-center rounded-full border border-border bg-white shadow-sm">
                  <Plus size={16} color={Colors.primary900} />
                </Pressable>

              </View>
            </View>
          );
        })}

        <View className="-mx-5 mb-6 h-[4px] bg-[#F4F4F4]" />

        <Pressable className="mb-6 flex-row items-center rounded-2xl border border-border bg-white p-4 shadow-sm">
          <CustomDiscountIcon size={24} color={Colors.primary} />
          <Text className="ml-3 flex-1 text-[14px] font-semibold text-coffee-dark">
            1 Discount is Applied
          </Text>
          <ChevronRight size={20} color={Colors.primary900} />
        </Pressable>

        <Text className="mb-4 text-[16px] font-bold text-coffee-dark">Payment Summary</Text>
        <View className="mb-2 flex-row justify-between">
          <Text className="text-[14px] text-coffee-dark">Price</Text>
          <Text className="text-[14px] font-bold text-coffee-dark">
            ${cartSubtotal.toFixed(2)}
          </Text>
        </View>
        <View className="mb-8 flex-row justify-between">
          <Text className="text-[14px] text-coffee-dark">Delivery Fee</Text>
          {deliveryType === 'deliver' ? (
            <View className="flex-row items-center gap-2">
              <Text className="text-[14px] text-coffee-dark line-through">
                ${deliveryFee.toFixed(2)}
              </Text>
              <Text className="text-[14px] font-bold text-coffee-dark">
                ${discountedFee.toFixed(2)}
              </Text>
            </View>
          ) : (
            <Text className="text-[14px] font-bold text-coffee-dark">Free</Text>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-slate-100 bg-white px-5 pb-8 pt-4 shadow-lg">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <CustomWalletIcon size={24} color={Colors.primary} />
            <View className="ml-3">
              <Text className="text-[14px] font-bold text-coffee-dark">Cash/Wallet</Text>
              <Text className="text-[12px] font-bold text-coffee-primary">
                $5.53
              </Text>
            </View>
          </View>
          <ChevronDown size={20} color={Colors.primary900} />
        </View>
        <Button dark={false} fullWidth onPress={() => setIsModalVisible(true)}>
          Order
        </Button>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isAddressModalVisible}
        onRequestClose={() => setIsAddressModalVisible(false)}>
        <View className="flex-1 justify-center bg-black/50 px-5">
          <View className="rounded-[28px] bg-white p-5 shadow-lg">
            <Text className="text-[20px] font-bold text-coffee-dark">Edit Address</Text>
            <Text className="mt-1 text-[13px] text-coffee-dark/70">
              Update the delivery details for this order.
            </Text>

            <View className="mt-5 gap-4">
              <View>
                <Text className="mb-2 text-[13px] font-semibold text-coffee-dark">
                  Short Address
                </Text>
                <TextInput
                  value={addressDraft}
                  onChangeText={setAddressDraft}
                  placeholder="e.g. Jl. Kpg Sutoyo"
                  placeholderTextColor="#6F6F6F"
                  className="rounded-2xl border border-border bg-[#FAFAFA] px-4 py-4 text-[14px] text-coffee-dark"
                />
              </View>

              <View>
                <Text className="mb-2 text-[13px] font-semibold text-coffee-dark">
                  Full Address
                </Text>
                <TextInput
                  value={fullAddressDraft}
                  onChangeText={setFullAddressDraft}
                  placeholder="Enter the full delivery address"
                  placeholderTextColor="#6F6F6F"
                  multiline
                  className="min-h-[110px] rounded-2xl border border-border bg-[#FAFAFA] px-4 py-4 text-[14px] text-coffee-dark"
                  style={{ textAlignVertical: 'top' }}
                />
              </View>
            </View>

            <View className="mt-6 flex-row gap-3">
              <Pressable
                onPress={() => setIsAddressModalVisible(false)}
                className="flex-1 items-center justify-center rounded-2xl border border-coffee-primary py-4">
                <Text className="text-[15px] font-bold text-coffee-primary">Cancel</Text>
              </Pressable>
              <Button
                className="flex-1"
                onPress={() => {
                  setAddress(addressDraft.trim() || address);
                  setFullAddress(fullAddressDraft.trim() || fullAddress);
                  setIsAddressModalVisible(false);
                }}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={isNoteModalVisible}
        onRequestClose={() => setIsNoteModalVisible(false)}>
        <View className="flex-1 justify-center bg-black/50 px-5">
          <View className="rounded-[28px] bg-white p-5 shadow-lg">
            <Text className="text-[20px] font-bold text-coffee-dark">Add Note</Text>
            <Text className="mt-1 text-[13px] text-coffee-dark/70">
              Leave a short note for the courier or store.
            </Text>

            <View className="mt-5">
              <Text className="mb-2 text-[13px] font-semibold text-coffee-dark">Your Note</Text>
              <TextInput
                value={noteDraft}
                onChangeText={setNoteDraft}
                placeholder="Add any special instructions"
                placeholderTextColor="#6F6F6F"
                multiline
                className="min-h-[140px] rounded-2xl border border-border bg-[#FAFAFA] px-4 py-4 text-[14px] text-coffee-dark"
                style={{ textAlignVertical: 'top' }}
              />
            </View>

            <View className="mt-6 flex-row gap-3">
              <Pressable
                onPress={() => setIsNoteModalVisible(false)}
                className="flex-1 items-center justify-center rounded-2xl border border-coffee-primary py-4">
                <Text className="text-[15px] font-bold text-coffee-primary">Cancel</Text>
              </Pressable>
              <Button
                className="flex-1"
                onPress={() => {
                  setNote(noteDraft.trim());
                  setIsNoteModalVisible(false);
                }}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50 px-5">
          <View className="w-full items-center rounded-3xl bg-white p-6 shadow-lg">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-[#FAEDE5]">
              <CustomCupIcon size={32} color={Colors.primary} />
            </View>

            <Text className="mb-2 text-[20px] font-bold text-coffee-dark">Confirm Order</Text>
            <Text className="mb-6 text-center text-[14px] text-coffee-dark/70">
              Are you sure you want to place this order for ${totalPrice.toFixed(2)}?
            </Text>

            {orderError ? (
              <View className="mb-4 w-full rounded-2xl border border-[#F1D2C4] bg-[#FFF4EE] px-4 py-3">
                <Text className="text-center text-[13px] font-semibold text-coffee-dark">
                  {orderError}
                </Text>
              </View>
            ) : null}

            <View className="w-full flex-row gap-4">
              <Pressable
                onPress={() => setIsModalVisible(false)}
                className="flex-1 items-center justify-center rounded-2xl border-2 border-coffee-primary py-4">
                <Text className="text-[16px] font-bold text-coffee-primary">Cancel</Text>
              </Pressable>

              <Button className="flex-1" disabled={isPlacingOrder} onPress={placeOrder}>
                {isPlacingOrder ? 'Placing...' : 'Confirm'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

