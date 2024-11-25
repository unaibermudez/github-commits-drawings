// src/services/apiService.ts
import axios from "axios";

export const exportGridData = async (exportedData: { year: number; days: number[] }) => {
  try {
    const response = await axios.post('https://example.com/api/export', exportedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response from the API
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
};
