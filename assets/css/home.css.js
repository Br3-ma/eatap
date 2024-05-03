import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    scrollContainer: {
        padding: 4,
        flex: 1,
        overflow: 'hidden',
    },
    categoriesContainer: {
        marginTop: 4,
        marginBottom: 16,
        paddingBottom: 0,
        flexDirection: 'row',
    },
    categoryTab: {
        marginRight: 16,
        alignItems: 'center',
        paddingBottom: 50,
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
    },
    productList: {
        justifyContent: 'center',
        marginTop: 16,
    },
    productContainer: {
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        margin: 1,
        padding: 1,
        shadowColor: '#00000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 3,
    },
    productImage: {
        width: 180,
        height: 140,
        borderRadius: 5,
        marginBottom: 8,
    },
    productName: {
        fontSize: 15,
        marginBottom: 2,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    mostPop:{
        borderRadius: 10,
        backgroundColor: 'white',
    },
    heroSlide: {
        width: width,
        height: 200,
        marginRight: 10,
        marginVertical:3,
        borderRadius: 10,
    },
    heroBannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        borderRadius: 10,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent black background
        padding: 20,
    },
    heroBannerText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    heroBannerButton: {
        backgroundColor: '#bc2900',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    heroBannerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerText1: {
        position: 'relative',
        top: 20,
        left: 10,
        fontSize: 18,
        marginBottom: 10,
        // marginHorizontal:5,
        color: 'green',
        fontWeight: 'bold',
    },
    iconGap: {
        width: 10,
    },
    iconButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    iconButtonAdd: {
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#25C480',
        backgroundColor:'#00FF92',
    },
    iconButtonShare: {
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#8AEAC0',
        backgroundColor:'#6F8D80',
    },
    cartPreview: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        elevation: 5,
        zIndex: 999,
    },
});
