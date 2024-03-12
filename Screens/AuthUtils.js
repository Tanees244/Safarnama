import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store JWT token locally
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Function to retrieve JWT token from storage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Function to make authenticated API requests with JWT token
const fetchUserData = async () => {
  const token = await getToken();
  if (token) {
    try {
      const response = await fetch('http://example.com/api/user-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User data:', data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  } else {
    console.error('Token not found');
  }
};
