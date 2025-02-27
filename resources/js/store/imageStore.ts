import { create } from "zustand";

const useImageStore = create((set) => ({
    images: [],
    folders: [],
    setImages: (images) => set({ images }),
    setFolders: (folders) => set({ folders }),
    addImage: (image) => set((state) => ({ images: [...state.images, image] })),
    deleteImage: (imageId) => set((state) => ({
        images: state.images.filter(image => image.id !== imageId)
    })),
}));


export default useImageStore;
