import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Chip, Portal, Modal, Tooltip, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { API_BASE_URL } from '../../confg/conf';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

// Import wizard step components
import Step1BasicInfo from '../../components/product-wizard/step1-basic-info';
import Step2Categories from '../../components/product-wizard/step2-categories';
import Step3Media from '../../components/product-wizard/step3-media';
import Step4Variants from '../../components/product-wizard/step4-variants';
import Step5Review from '../../components/product-wizard/step5-review';
import VariantModal from '../../components/product-wizard/variant-modal';

const { width } = Dimensions.get('window');

// Mock data for categories, types, and tags
const MOCK_CATEGORIES = ['Groceries', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys', 'Books'];
const MOCK_TYPES = ['New', 'Used', 'Refurbished', 'Vintage', 'Limited Edition', 'Seasonal'];
const MOCK_TAGS = ['Popular', 'Sale', 'Featured', 'Best Seller', 'Trending', 'New Arrival', 'Clearance'];
const MOCK_VARIANT_TYPES = ['Color', 'Size', 'Brand', 'Material', 'Style', 'Pattern', 'Weight', 'Length', 'Width', 'Height'];

const AddProduct = ({ navigation, route }) => {
  const { store_id } = route.params || {};
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [currentVariant, setCurrentVariant] = useState({ name: '', price: '', stock: '', type: '' });
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categories: [],
    types: [],
    tags: [],
    images: [],
    videos: [],
    variants: [],
    store_id: store_id
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleInputChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayAdd = (key, value) => {
    if (value && !form[key].includes(value)) {
      setForm(prev => ({ ...prev, [key]: [...prev[key], value] }));
    }
  };

  const handleVariantAdd = () => {
    if (currentVariant.name && currentVariant.price && currentVariant.stock && currentVariant.type) {
      setForm(prev => ({
        ...prev,
        variants: [...prev.variants, { ...currentVariant }]
      }));
      setCurrentVariant({ name: '', price: '', stock: '', type: '' });
      setShowVariantModal(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all variant fields including type',
      });
    }
  };

  const handleVariantRemove = (index) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const pickMedia = async (type) => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Please grant permission to access your media library');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: type === 'videos'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
        videoMaxDuration: type === 'videos' ? 60 : undefined,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const newMedia = result.assets.map(asset => ({
          uri: asset.uri,
          type: type === 'videos' ? 'video' : 'image',
          name: asset.uri.split('/').pop(),
        }));

        setForm(prev => ({
          ...prev,
          [type]: [...prev[type], ...newMedia]
        }));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick media',
      });
      console.error('Media picker error:', error);
    }
  };

  const removeMedia = (type, index) => {
    setForm(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Product name is required',
      });
      return false;
    }
    if (!form.price.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Product price is required',
      });
      return false;
    }
    if (!form.stock.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Stock count is required',
      });
      return false;
    }
    if (form.images.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'At least one product image is required',
      });
      return false;
    }
    return true;
  };

  const submitProduct = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('price', form.price);
      data.append('stock', form.stock);
      data.append('categories', JSON.stringify(form.categories));
      data.append('types', JSON.stringify(form.types));
      data.append('tags', JSON.stringify(form.tags));
      data.append('variants', JSON.stringify(form.variants));
      data.append('store_id', form.store_id);

      form.images.forEach((image, index) => {
        data.append(`images[${index}]`, {
          uri: image.uri,
          name: image.name,
          type: 'image/jpeg',
        });
      });

      form.videos.forEach((video, index) => {
        data.append(`videos[${index}]`, {
          uri: video.uri,
          name: video.name,
          type: 'video/mp4',
        });
      });

      const response = await axios.post(`${API_BASE_URL}/products`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product created successfully!',
      });

      setForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: [],
        types: [],
        tags: [],
        images: [],
        videos: [],
        variants: [],
      });
      setStep(1);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Could not submit product',
      });
      console.error('Product submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1BasicInfo form={form} handleInputChange={handleInputChange} />;
      case 2:
        return <Step2Categories form={form} setForm={setForm} />;
      case 3:
        return <Step3Media form={form} pickMedia={pickMedia} removeMedia={removeMedia} />;
      case 4:
        return <Step4Variants form={form} handleVariantRemove={handleVariantRemove} setShowVariantModal={setShowVariantModal} />;
      case 5:
        return <Step5Review form={form} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>Add Product</Text>
        <Text style={styles.subtitle}>Step {step} of 5</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {renderStep()}
        <View style={styles.buttons}>
          {step > 1 && (
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={prevStep}
              style={styles.wizardButton}
              disabled={loading}
            />
          )}
          {step < 5 ? (
            <IconButton
              icon="arrow-right"
              size={24}
              onPress={nextStep}
              style={styles.wizardButton}
              disabled={loading}
            />
          ) : (
            <IconButton
              icon="check"
              size={24}
              onPress={submitProduct}
              style={[styles.wizardButton, styles.submitButton]}
              loading={loading}
              disabled={loading}
            />
          )}
        </View>
      </ScrollView>

      <VariantModal
        visible={showVariantModal}
        onDismiss={() => setShowVariantModal(false)}
        currentVariant={currentVariant}
        setCurrentVariant={setCurrentVariant}
        handleVariantAdd={handleVariantAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scroll: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  wizardButton: {
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#059669',
  },
});

export default AddProduct;
