import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(234,239,196,0.05)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerBlur: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  welcomeSection: {
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  profileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  featuredSection: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  featuredList: {
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  featuredCard: {
    width: width - 80,
    height: 160,
    marginHorizontal: 4,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  featuredImage: {
    width: '50%',
    height: '100%',
  },
  featuredContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  categoriesSection: {
    paddingTop: 30,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  categoryButton: {
    alignItems: 'center',
    marginHorizontal: 4,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
  },
  categoryText: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
  selectedCategoryText: {
    color: '#000000',
    fontWeight: '600',
  },
  productsSection: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginRight: 4,
  },
  productGrid: {
    paddingHorizontal: 0,
  },
  productItem: {
    width: ITEM_WIDTH,
    marginHorizontal: 8,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH,
    borderRadius: 16,
  },
  productContent: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    color: '#FF6B6B',
    fontWeight: '700',
  },
  shimmerContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: 8,
    marginBottom: 24,
  }
});