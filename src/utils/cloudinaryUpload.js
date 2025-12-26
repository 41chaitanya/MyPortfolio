// Cloudinary Upload Utility
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtpstgz1j';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'portfolio_unsigned'); // Create this in Cloudinary dashboard
  formData.append('folder', 'portfolio-members');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Cloudinary error:', data);
      throw new Error(data.error?.message || 'Upload failed');
    }
    
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export const DEFAULT_MALE_IMAGE = 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png';
export const DEFAULT_FEMALE_IMAGE = 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg';
