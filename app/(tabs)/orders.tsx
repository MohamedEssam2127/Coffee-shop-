import { View, Text, ScrollView, Image, Pressable, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit, FileText, Plus, Minus, ChevronRight, ChevronDown } from 'lucide-react-native';
import Button from '../../components/ui/button';
import { Colors } from '../../lib/colors';
import { useState } from 'react';
import { CustomCupIcon, CustomDiscountIcon, CustomWalletIcon } from '../../components/icons';
import { orderService } from '../../lib/orderService';

// Mock Data
const ORDER_DATA = {
  address: 'Jl. Kpg Sutoyo',
  fullAddress: 'Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.',
  item: {
    name: 'Caffe Mocha',
    type: 'Deep Foam',
    price: 4.53,
    image: require('../../assets/images/coffee.png'),
  },
  deliveryFee: 2.0,
  discountedFee: 1.0,
  walletBalance: 5.53,
};

export default function OrderScreen() {
  const [deliveryType, setDeliveryType] = useState<'deliver' | 'pickup'>('deliver');
  const [quantity, setQuantity] = useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [address, setAddress] = useState(ORDER_DATA.address);
  const [fullAddress, setFullAddress] = useState(ORDER_DATA.fullAddress);
  const [note, setNote] = useState('');
  const [orderError, setOrderError] = useState<string | null>(null);
  const [addressDraft, setAddressDraft] = useState(ORDER_DATA.address);
  const [fullAddressDraft, setFullAddressDraft] = useState(ORDER_DATA.fullAddress);
  const [noteDraft, setNoteDraft] = useState('');
  const totalPrice = ORDER_DATA.item.price * quantity + ORDER_DATA.discountedFee;

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
        deliveryAddress: fullAddress,
        discountApplied: 0,
      });

      setIsModalVisible(false);
      console.log('Order Confirmed & Sent to API!');
    } catch (requestError) {
      setOrderError('Unable to place the order right now. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-coffee-cream">
      {/* 1. Header */}
      {/* <View className="flex-row items-center px-5 py-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color={Colors.primary900} />
        </Pressable>
        <Text className="flex-1 text-center text-[18px] font-bold text-coffee-dark mr-8">
          Order
        </Text>
      </View> */}

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
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

        <Text className="mb-3 text-[16px] font-bold text-coffee-dark">Delivery Address</Text>
        <Text className="mb-1 text-[14px] font-bold text-coffee-dark">{address}</Text>
        <Text className="mb-4 text-[12px] text-muted">{fullAddress}</Text>

        <View className="mb-6 flex-row gap-2">
          <Pressable
            onPress={openAddressModal}
            className="flex-row items-center rounded-full border border-gray-600 px-4 py-1.5">
            <Edit size={14} color={Colors.primary900} className="mr-1.5" />
            <Text className="text-[16px] text-coffee-dark">Edit Address</Text>
          </Pressable>
          <Pressable
            onPress={openNoteModal}
            className="flex-row items-center rounded-full border border-gray-600 px-4 py-1.5">
            <FileText size={14} color={Colors.primary900} className="mr-1.5" />
            <Text className="text-[16px] text-coffee-dark">Add Note</Text>
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

        <View className="mb-6 flex-row items-center">
          <Image source={ORDER_DATA.item.image} className="mr-4 h-14 w-14 rounded-2xl" />
          <View className="flex-1">
            <Text className="text-[16px] font-bold text-coffee-dark">{ORDER_DATA.item.name}</Text>
            <Text className="text-[12px] text-muted">{ORDER_DATA.item.type}</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-7 w-7 items-center justify-center rounded-full border border-border">
              <Minus size={16} color={Colors.primary900} />
            </Pressable>
            <Text className="text-[14px] font-bold text-coffee-dark">{quantity}</Text>
            <Pressable
              onPress={() => setQuantity(quantity + 1)}
              className="h-7 w-7 items-center justify-center rounded-full border border-border bg-white shadow-sm">
              <Plus size={16} color={Colors.primary900} />
            </Pressable>
          </View>
        </View>

        <View className="-mx-5 mb-6 h-[4px] bg-[#F4F4F4]" />

        <Pressable className="mb-6 flex-row items-center rounded-2xl border border-border bg-white p-4 shadow-sm">
          {/* Lw CustomDiscountIcon msh sha8al, 7oty ay Lucide icon mkano mo2aqatan */}
          <CustomDiscountIcon size={24} color={Colors.primary} />
          <Text className="ml-3 flex-1 text-[14px] font-semibold text-coffee-dark">
            1 Discount is Applies
          </Text>
          <ChevronRight size={20} color={Colors.primary900} />
        </Pressable>

        <Text className="mb-4 text-[16px] font-bold text-coffee-dark">Payment Summary</Text>
        <View className="mb-2 flex-row justify-between">
          <Text className="text-[14px] text-coffee-dark">Price</Text>
          <Text className="text-[14px] font-bold text-coffee-dark">
            ${(ORDER_DATA.item.price * quantity).toFixed(2)}
          </Text>
        </View>
        <View className="mb-8 flex-row justify-between">
          <Text className="text-[14px] text-coffee-dark">Delivery Fee</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-[14px] text-coffee-dark line-through">
              ${ORDER_DATA.deliveryFee.toFixed(1)}
            </Text>
            <Text className="text-[14px] font-bold text-coffee-dark">
              ${ORDER_DATA.discountedFee.toFixed(1)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-slate-100 bg-white px-5 pb-8 pt-4 shadow-lg">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <CustomWalletIcon size={24} color={Colors.primary} />
            <View className="ml-3">
              <Text className="text-[14px] font-bold text-coffee-dark">Cash/Wallet</Text>
              <Text className="text-[12px] font-bold text-coffee-primary">
                ${ORDER_DATA.walletBalance.toFixed(2)}
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
            <Text className="mt-1 text-[13px] text-muted">
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
                  placeholderTextColor={Colors.muted}
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
                  placeholderTextColor={Colors.muted}
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
            <Text className="mt-1 text-[13px] text-muted">
              Leave a short note for the courier or store.
            </Text>

            <View className="mt-5">
              <Text className="mb-2 text-[13px] font-semibold text-coffee-dark">Your Note</Text>
              <TextInput
                value={noteDraft}
                onChangeText={setNoteDraft}
                placeholder="Add any special instructions"
                placeholderTextColor={Colors.muted}
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
            <Text className="mb-6 text-center text-[14px] text-muted">
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
