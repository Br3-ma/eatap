import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const AddProduct = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={['#4facfe', '#00f2fe']} 
        style={styles.gradient}
      >
        <Animatable.View 
          animation="fadeInUp" 
          style={styles.header}
        >
          <Text style={styles.headerText}>Add a Product</Text>
        </Animatable.View>
        <Animatable.View 
          animation="fadeInUp" 
          delay={300} 
          style={styles.content}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.goBack()}
            >
              <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
              />
              <Text style={styles.cardText}>Sample Product</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => alert('Add Product!')}
          >
            <LinearGradient 
              colors={['#34d399', '#10b981']} 
              style={styles.addButtonGradient}
            >
              <Text style={styles.addButtonText}>Add Product</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 30,
  },
  scrollContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  card: {
    width: width * 0.8,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 15,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    width: '80%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AddProduct;
