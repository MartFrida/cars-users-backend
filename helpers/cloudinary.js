import { v2 as cloudinary } from 'cloudinary';

const { CLOuDINARY_CLOUD_NAME, CLOuDINARY_API_KEY, CLOuDINARY_API_SECRET } = process.env

cloudinary.config({
  cloud_name: CLOuDINARY_CLOUD_NAME,
  api_key: CLOuDINARY_API_KEY,
  api_secret: CLOuDINARY_API_SECRET,
})

export default cloudinary;