import axios from 'axios';

const KEY = "5Dsc2CogKNZ2ORdfckm4KhHDR5GDRWph64PDUZu36TE";
axios.defaults.baseURL = "https://api.unsplash.com/";
const config = {
  headers: {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${KEY}`,
  },
  params: {
    orientation: "landscape",
    content_filter: "low",
    per_page: 20,
  } as Record<string, string | number>,
};

interface ImageResponse {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface GetImagesResponse {
  results: ImageResponse[];
  total: number;
  total_pages: number;
}

async function GetImages(query: string, page: number): Promise<GetImagesResponse> {
  config.params = { ...config.params, query, page }; // Обновление параметров запроса

  const response = await axios.get<GetImagesResponse>("search/photos", config);

  return response.data;
}

export default GetImages;