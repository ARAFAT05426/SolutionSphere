import  dotenv  from 'dotenv';
import { useState } from 'react';
import axios from 'axios';

dotenv.config()

const useImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
      console.log(apiKey)
      if (!apiKey) throw new Error('Image upload API key is missing.');

      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
      
      console.log(response)
      const imageUrl = response.data.data.display_url;
      
      setLoading(false);
      return imageUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Image upload failed.');
      throw err;
    }
  };

  return { uploadImage, loading, error };
};

export default useImageUploader;
