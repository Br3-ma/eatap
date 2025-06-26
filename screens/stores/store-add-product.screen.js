import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { API_BASE_URL } from '../../confg/conf';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import wizard step components
import Step1BasicInfo from '../../components/product-wizard/step1-basic-info';
import Step2Categories from '../../components/product-wizard/step2-categories';
import Step3Media from '../../components/product-wizard/step3-media';
import Step4Variants from '../../components/product-wizard/step4-variants';
import Step5Review from '../../components/product-wizard/step5-review';
import VariantModal from '../../components/product-wizard/variant-modal';

const AddProduct = ({ navigation, route }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [storeLoading, setStoreLoading] = useState(true);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [currentVariant, setCurrentVariant] = useState({ name: '', price: '', stock: '', type: '' });
  const [storeId, setStoreId] = useState(null);
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
    store_id: null
  });

  // Get store ID from AsyncStorage on component mount
  useEffect(() => {
    getStoreIdFromStorage();
  }, []);

  const getStoreIdFromStorage = async () => {
    try {
      setStoreLoading(true);
      const storeDetailsString = await AsyncStorage.getItem('storeDetails');
      console.log('🔍 Raw storeDetails from AsyncStorage:', storeDetailsString);

      if (storeDetailsString) {
        const storeDetails = JSON.parse(storeDetailsString);
        console.log('📦 Parsed store details from AsyncStorage:', storeDetails);

        if (storeDetails && storeDetails.data && storeDetails.data.id) {
          setStoreId(storeDetails.data.id);
          setForm(prev => ({ ...prev, store_id: storeDetails.data.id }));
          console.log('✅ Store ID set to:', storeDetails.data.id);
        } else {
          console.log('❌ Store ID not found in storeDetails');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Store details not found. Please select a store first.',
          });
        }
      } else {
        console.log('❌ No storeDetails found in AsyncStorage');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Store details not found. Please select a store first.',
        });
      }
    } catch (error) {
      console.error('❌ Error getting store details from AsyncStorage:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load store details.',
      });
    } finally {
      setStoreLoading(false);
    }
  };

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
    // Validate product name
    if (!form.name || !form.name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Product name is required',
      });
      return false;
    }

    // Validate price
    if (!form.price || !form.price.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Product price is required',
      });
      return false;
    }

    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid price greater than 0',
      });
      return false;
    }

    // Validate stock
    if (!form.stock || !form.stock.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Stock count is required',
      });
      return false;
    }

    const stock = parseInt(form.stock);
    if (isNaN(stock) || stock < 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid stock count (0 or greater)',
      });
      return false;
    }

    // Validate images
    if (!form.images || form.images.length === 0) {
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
    console.log('🚀 submitProduct function called!');
    console.log('Current form state:', form);
    console.log('Current step:', step);
    console.log('Store ID:', storeId);
    console.log('Store Loading:', storeLoading);

    // Check if store is still loading
    if (storeLoading) {
      console.log('⏳ Store details still loading...');
      Toast.show({
        type: 'info',
        text1: 'Loading',
        text2: 'Please wait while we load store details...',
      });
      return;
    }

    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    if (!storeId) {
      console.log('❌ Store ID is missing');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Store ID is required to add a product. Please select a store first.',
      });
      // Try to reload store details
      await getStoreIdFromStorage();
      return;
    }

    // Check if API_BASE_URL is configured
    if (!API_BASE_URL) {
      console.log('❌ API_BASE_URL is not configured');
      Toast.show({
        type: 'error',
        text1: 'Configuration Error',
        text2: 'API base URL is not configured',
      });
      return;
    }

    console.log('✅ Starting product submission...');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', form.name.trim());
      data.append('description', form.description.trim());
      data.append('price', parseFloat(form.price));
      data.append('stock', parseInt(form.stock));
      data.append('categories', JSON.stringify(form.categories));
      data.append('types', JSON.stringify(form.types));
      data.append('tags', JSON.stringify(form.tags));
      data.append('variants', JSON.stringify(form.variants));
      data.append('store_id', storeId);

      // Handle images with proper file objects
      if (form.images.length > 0) {
        form.images.forEach((image, index) => {
          const imageFile = {
            uri: image.uri,
            name: image.name || `image_${index}.jpg`,
            type: 'image/jpeg',
          };
          data.append(`images`, imageFile);
        });
      }

      // Handle videos with proper file objects
      if (form.videos.length > 0) {
        form.videos.forEach((video, index) => {
          const videoFile = {
            uri: video.uri,
            name: video.name || `video_${index}.mp4`,
            type: 'video/mp4',
          };
          data.append(`videos`, videoFile);
        });
      }

      console.log('📤 Submitting product data:', {
        name: form.name,
        price: form.price,
        stock: form.stock,
        store_id: storeId,
        imagesCount: form.images.length,
        videosCount: form.videos.length,
        apiUrl: `${API_BASE_URL}/products`
      });

      console.log('🌐 Making API request to:', `${API_BASE_URL}/products`);

      const response = await axios.post(`${API_BASE_URL}/products`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });

      console.log('✅ Product submission successful!');
      console.log('📥 Response data:', response.data);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product created successfully!',
      });

      // Reset form
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
        store_id: storeId
      });
      setStep(1);

      // Navigate back to store products or store details
      setTimeout(() => {
        navigation.goBack();
      }, 1500);

    } catch (error) {
      console.error('❌ Product submission error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });

      let errorMessage = 'Could not submit product';

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;

        if (status === 404) {
          errorMessage = 'API endpoint not found. Please check server configuration.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (data?.error) {
          errorMessage = data.error;
        } else {
          errorMessage = `Server error: ${status}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        // Other error
        errorMessage = error.message || 'An unexpected error occurred';
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      console.log('🏁 Setting loading to false');
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
      <LinearGradient
        colors={['#FF6B35', '#FF8C42', '#FFA726']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add New Product</Text>
            <View style={styles.stepIndicator}>
              <Text style={styles.stepText}>Step {step} of 5</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(step / 5) * 100}%` }]} />
              </View>
            </View>
            {storeLoading && (
              <View style={styles.storeLoadingContainer}>
                <MaterialCommunityIcons name="loading" size={16} color="#FFFFFF" />
                <Text style={styles.storeLoadingText}>Loading store details...</Text>
              </View>
            )}
            {storeId && (
              <Text style={styles.storeIdText}>Store ID: {storeId}</Text>
            )}
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          style={styles.stepContainer}
        >
          {renderStep()}
        </Animatable.View>

        <View style={styles.navigationContainer}>
          <View style={styles.buttonRow}>
            {step > 1 && (
              <TouchableOpacity
                onPress={prevStep}
                style={[styles.navButton, styles.prevButton]}
                disabled={loading}
              >
                <MaterialCommunityIcons name="chevron-left" size={20} color="#FF6B35" />
                <Text style={styles.prevButtonText}>Previous</Text>
              </TouchableOpacity>
            )}

            <View style={styles.spacer} />

            {step < 5 ? (
              <TouchableOpacity
                onPress={nextStep}
                style={[styles.navButton, styles.nextButton]}
                disabled={loading}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={submitProduct}
                style={[styles.navButton, styles.submitButton]}
                disabled={loading || storeLoading || !storeId}
              >
                <MaterialCommunityIcons
                  name={loading ? "loading" : "check-circle"}
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={styles.submitButtonText}>
                  {loading ? 'Creating...' :
                    storeLoading ? 'Loading Store...' :
                      !storeId ? 'No Store Selected' : 'Finish'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
    backgroundColor: '#FF6B35',
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: 12,
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingTop: 24,
    paddingBottom: 100,
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 400,
  },
  navigationContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacer: {
    flex: 1,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prevButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  prevButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: '#FF6B35',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  submitButton: {
    backgroundColor: '#2ECC71',
    paddingHorizontal: 32,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  storeLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  storeLoadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  storeIdText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddProduct;