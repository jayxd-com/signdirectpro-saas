import { create } from "zustand";

const useCanvasXStore = create((set) => {
    const inchToPx = 812; // 1 inch = 812px
    const gridSize = inchToPx / 4; // Grid size is 1/4 inch

    return {
        inchToPx,
        gridSize,
        setGridSize: (gs) => set({ gridSize: gs }),
        width: 1, // Default width in inches
        height: 1, // Default height in inches
        setWidth: (w) => set({ width: w }),
        setHeight: (h) => set({ height: h }),
    };
});

export default useCanvasXStore;
