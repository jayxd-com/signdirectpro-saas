import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import useCanvasStore from '@/store/canvas';
import { ChangeEvent } from 'react';

export function CanvasSizeSelector() {
    const {
        widthInputFeet,
        widthInputInch,
        heightInputFeet,
        heightInputInch,
        setWidthFeet,
        setWidthInch,
        setHeightFeet,
        setHeightInch,
        canvasWidthInput,
        canvasHeightInput
    } = useCanvasStore();

    // Handler to update the store values
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
        const value = parseInt(e.target.value) || 0; // Ensure a number is passed
        setter(value);
    };


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Select Size</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the canvas.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {/* Width (Feet) */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Width(ft) {widthInputFeet}</Label>
                            <Input
                                id="width"
                                value={widthInputFeet}
                                type="number"
                                className="col-span-2 h-8"
                                onChange={(e) => handleInputChange(e, setWidthFeet)}
                            />
                        </div>
                        {/* Width (Inches) */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="widthInch">Width(in)</Label>
                            <Input
                                id="widthInch"
                                value={widthInputInch}
                                type="number"
                                className="col-span-2 h-8"
                                onChange={(e) => handleInputChange(e, setWidthInch)}
                            />
                        </div>
                        {/* Height (Feet) */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Height(ft)</Label>
                            <Input
                                id="height"
                                value={heightInputFeet}
                                type="number"
                                className="col-span-2 h-8"
                                onChange={(e) => handleInputChange(e, setHeightFeet)}
                            />
                        </div>
                        {/* Height (Inches) */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="heightInch">Height(in)</Label>
                            <Input
                                id="heightInch"
                                value={heightInputInch}
                                type="number"
                                className="col-span-2 h-8"
                                onChange={(e) => handleInputChange(e, setHeightInch)}
                            />
                        </div>

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
