import { create } from "zustand";

type CanvasStore = {
    widthInputFeet: number;
    widthInputInch: number;
    heightInputFeet: number;
    heightInputInch: number;
    canvasWidthInput: number;
    canvasHeightInput: number
    gridSize: number;
    setWidthFeet: (feet: number) => void;
    setWidthInch: (inch: number) => void;
    setHeightFeet: (feet: number) => void;
    setHeightInch: (inch: number) => void;
    setCanvasWidthInput: (inch: number) => void;
    setCanvasHeightInput: (inch: number) => void;
    updateCanvasSize: () => void;
};

const useCanvasStore = create<CanvasStore>((set, get) => ({
    widthInputFeet: 3,
    widthInputInch: 0,
    heightInputFeet: 1,
    heightInputInch: 0,
    canvasWidthInput: 0,
    canvasHeightInput: 0,
    gridSize: 0,

    setWidthFeet: (feet) =>
        set((state) => ({ widthInputFeet: feet, canvasWidthInput: feet * 12 + state.widthInputInch })),

    setWidthInch: (inch) =>
        set((state) => ({ widthInputInch: inch, canvasWidthInput: state.widthInputFeet * 12 + inch })),

    setHeightFeet: (feet) =>
        set((state) => ({ heightInputFeet: feet, canvasHeightInput: feet * 12 + state.heightInputInch })),

    setHeightInch: (inch) =>
        set((state) => ({ heightInputInch: inch, canvasHeightInput: state.heightInputFeet * 12 + inch })),

    setCanvasWidthInput: (inch) =>
        set((state) => ({ widthInputInch: inch, canvasWidthInput: state.widthInputFeet * 12 + inch })),

    setCanvasHeightInput: (inch) =>
        set((state) => ({ widthInputInch: inch, canvasHeightInput: state.widthInputFeet * 12 + inch })),

    updateCanvasSize: () =>
        set((state) => ({
            canvasHeightInput: state.widthInputFeet * 12 + state.widthInputInch,
            canvasWidthInput: state.heightInputFeet * 12 + state.heightInputInch,
        })),
}));

export default useCanvasStore;
