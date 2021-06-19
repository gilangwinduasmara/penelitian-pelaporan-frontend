const CONFIG = {
    KEY: '12345',
    BASE_URL: 'https://restaurant-api.dicoding.dev/',
    IMAGE_BASE_URL: (pictureId, resolution='small') =>`${CONFIG.BASE_URL}/images/${resolution}/${pictureId}`,
};

export default CONFIG;