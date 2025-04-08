// MOCK_DATA.js
const featuredStores = [
    {
      id: 4,
      title: 'Fresh Grocery Store',
      subtitle: 'Fresh produce daily',
      image: require('../../assets/stores/12.webp'), // Replace with actual image path
      legalName: 'Fresh Groceries Ltd.',
      address: '123 Main St, Cityville',
      contact: '+1 234 567 890',
      email: 'info@freshgroceries.com',
      status: 'Active',
      openingHours: '8:00 AM - 10:00 PM',
      rating: 4.5,
      reviews: 1200,
      website: 'https://freshgroceries.com',
      socialMedia: {
        facebook: 'https://facebook.com/freshgroceries',
        instagram: 'https://instagram.com/freshgroceries',
      },
    },
    {
      id: 3,
      title: 'Health Pharmacy',
      subtitle: 'Health and wellness',
      image: require('../../assets/stores/4.jpg'), // Replace with actual image path
      legalName: 'Health Pharmacy Inc.',
      address: '456 Elm St, Townsville',
      contact: '+1 345 678 901',
      email: 'support@healthpharmacy.com',
      status: 'Active',
      openingHours: '9:00 AM - 8:00 PM',
      rating: 4.7,
      reviews: 950,
      website: 'https://healthpharmacy.com',
      socialMedia: {
        facebook: 'https://facebook.com/healthpharmacy',
        instagram: 'https://instagram.com/healthpharmacy',
      },
    },
    {
      id: 2,
      title: 'Hungry Lion',
      subtitle: 'Delicious meals',
      image: require('../../assets/stores/2.jpg'), // Replace with actual image path
      legalName: 'Delicious Eats LLC',
      address: '789 Oak St, Villagetown',
      contact: '+1 456 789 012',
      email: 'contact@deliciouseats.com',
      status: 'Active',
      openingHours: '10:00 AM - 11:00 PM',
      rating: 4.8,
      reviews: 1500,
      website: 'https://deliciouseats.com',
      socialMedia: {
        facebook: 'https://facebook.com/deliciouseats',
        instagram: 'https://instagram.com/deliciouseats',
      },
    },
    {
      id: 1,
      title: 'Shoprite',
      subtitle: 'Convenience at your doorstep',
      image: require('../../assets/stores/2.png'), // Replace with actual image path
      legalName: 'Quick Mart Enterprises',
      address: '101 Pine St, Hamletville',
      contact: '+1 567 890 123',
      email: 'support@quickmart.com',
      status: 'Inactive',
      openingHours: '7:00 AM - 9:00 PM',
      rating: 4.3,
      reviews: 800,
      website: 'https://quickmart.com',
      socialMedia: {
        facebook: 'https://facebook.com/quickmart',
        instagram: 'https://instagram.com/quickmart',
      },
    },
  ];
  
  export default featuredStores;