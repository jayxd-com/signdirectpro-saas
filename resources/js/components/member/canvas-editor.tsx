import {useState, useEffect, useRef} from "react";
import useCanvasStore from "@/store/canvas";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";

export default function CanvasEditor() {

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

    const gridUnitThreshold = 12;

    const [scale, setScale] = useState(1);

    const [screenCenterX, setScreenCenterX] = useState(0);
    const [screenCenterY, setScreenCenterY] = useState(0);

    const canvasContainerRef = useRef(null);


    const [inchToPx, setInchToPx] = useState(0)

    const divRef = useRef(null);
    const [canvasContainerWidth, setCanvasContainerWidth] = useState(0);
    const [canvasContainerHeight, setCanvasContainerHeight] = useState(0);

    // Width and Height are in inches. 1 is 1 inch.

    // const [canvasWidthInput, setCanvasWidthInput] = useState(248);
    // const [canvasHeightInput, setCanvasHeightInput] = useState(144);

    // Calculate scale factors
    const scaleFactorW = canvasContainerWidth / canvasWidthInput;
    const scaleFactorH = canvasContainerHeight / canvasHeightInput;
    const scaleFactor = Math.min(scaleFactorW, scaleFactorH); // Ensures it fits within both dimensions

    const biggerDimension = Math.max(canvasWidthInput,canvasHeightInput);
    const smallerDimension = Math.min(canvasWidthInput,canvasHeightInput);

    const widthToHeightRatio = biggerDimension/smallerDimension;


    const [canvasWidth, setCanvasWidth] = useState(1);
    const [canvasHeight, setCanvasHeight] = useState(1);

    const possibleGridSizeMuliples = [1,2,4,8,12,16,20,24];
    // const gridSize = scaleFactor * (biggerDimension/12) ;

    const [gridSize, setGridSize] = useState(0);
    // const canvasWidth = canvasWidthInput * scaleFactor;
    // const canvasHeight = canvasHeightInput * scaleFactor;
    useEffect(() => {
        console.log('runnnnnnnnnnn', canvasWidthInput);
        setCanvasWidth(canvasWidthInput * scaleFactor);
        setCanvasHeight(canvasHeightInput * scaleFactor);
    }, [canvasWidthInput, canvasHeightInput]);



    // const [gridSize, setGridSize] = useState(80);

    // const [baseGridSize, setBaseGridSize] = useState(0)
    //
    // const [defaultInchToGrid, setDefaultInchToGrid] = useState(4);
    //
    // const [heightGreaterThanWidth, setHeightGreaterThanWidth] = useState(false);
    //
    // const [widthToGrid, setWidthToGrid] = useState(4);
    // const [heightToGrid, setHeightToGrid] = useState(4);




    console.log('scale factor: ', scaleFactor);

    // const [gridUnit, setGridUnit] = useState("inch")


    // Canvas Container
    const [isContainerWidthGreaterThanHeight, setIsContainerWidthGreaterThanHeight] = useState(true);


    useEffect(() => {
        let gsScale = 1;
        if(biggerDimension >= 1){
            gsScale = 12
        }

        console.log('biggerDimension', biggerDimension);

        // setGridSize(scaleFactor * widthToHeightRatio);
        setGridSize(((scaleFactor * biggerDimension )/biggerDimension) * 12 );


        // console.log("grid sizee: ", (biggerDimension * gsScale) / (biggerDimension/12));
    }, [gridSize, scaleFactor]);

    // useEffect(() => {
    //     // Adjust grid size based on canvas dimensions
    //     // let newGridSize = width > 24 || height > 24 ? 50 : 52;
    //     let newGridSize = 10;
    //
    //     setGridSize(newGridSize);
    //
    //     // Adjust scale to simulate zoom effect
    //     // let newScale = width > 48 || height > 48 ? 1 : 2;
    //     let newScale = 1;
    //     setScale(newScale);
    //     console.log(newScale, width, height);
    // }, [width, height]);
    //

    useEffect(() => {
        // Function to update center coordinates
        const updateCenter = () => {
            setScreenCenterX(window.innerWidth / 2);
            setScreenCenterY(window.innerHeight / 2);
        };

        // Initial calculation
        updateCenter();

        console.log('screen center:', screenCenterX,screenCenterY);

        // Update when the window resizes
        window.addEventListener("resize", updateCenter);
        return () => window.removeEventListener("resize", updateCenter);
    }, []);


    useEffect(() => {
        // Function to update size
        const updateSize = () => {
            if (divRef.current) {
                console.log('on load: ', divRef.current);

                const styles = window.getComputedStyle(divRef.current);
                const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
                const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

                // Update the inner width and height based on the container size minus padding
                setCanvasContainerWidth(divRef.current.clientWidth - paddingX);
                setCanvasContainerHeight(divRef.current.clientHeight - paddingY);
            }
        };

        // Initial size calculation on component load
        updateSize();

        // Update on resize
        window.addEventListener("resize", updateSize);

        // Cleanup listener when component unmounts
        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount



    // This useEffect will be triggered whenever canvasContainerWidth or canvasContainerHeight is updated
    useEffect(() => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(divRef.current);

            const paddingLeft = parseFloat(computedStyle.paddingLeft);
            const paddingRight = parseFloat(computedStyle.paddingRight);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);

            const contentWidth = rect.width - paddingLeft - paddingRight;
            const contentHeight = rect.height - paddingTop - paddingBottom;

            const centerX = rect.left + paddingLeft + contentWidth / 2;
            const centerY = rect.top + paddingTop + contentHeight / 2;

            setScreenCenterX(centerX);
            setScreenCenterY(centerY);
        }


        // Set Status for width to height ration.
        checkContainerWidthGreaterThanHeight();

        console.log("Updated iw and ih: ", canvasContainerWidth, canvasContainerHeight, isContainerWidthGreaterThanHeight); // Will log updated values after state change

    }, [canvasContainerWidth, canvasContainerHeight, isContainerWidthGreaterThanHeight]); // Dependency array makes it run whenever canvasContainerWidth or canvasContainerHeight changes


    useEffect(() => {

        // setGridSize(80);
        //
        // if(canvasWidthInput > gridUnitThreshold || canvasHeightInput > gridUnitThreshold){
        //     setGridUnit("feet");
        // }
        //
        // console.log(gridUnit);
        //
        //
        // if(canvasWidthInput > canvasHeightInput){
        //     let gridSizCalcW = canvasContainerWidth / (canvasWidthInput * 4);
        //     if(gridSizCalcW < 80 ) {
        //         setGridSize(gridSizCalcW);
        //     }
        //     setCanvasWidth((cw) => {
        //         return gridSize * canvasWidthInput * 4;
        //     })
        //
        //     setCanvasHeight((cw) => {
        //
        //         return gridSize * canvasHeightInput * 4;
        //     })
        //
        // }
        // if(canvasHeightInput > canvasWidthInput || canvasHeightInput === canvasWidthInput){
        //     let gridSizCalcH = canvasContainerHeight / (canvasHeightInput * 4);
        //     if(gridSizCalcH < 80 ) {
        //         setGridSize(gridSizCalcH);
        //     }
        //     setCanvasWidth((cw) => {
        //
        //         return gridSize * canvasWidthInput * 4;
        //     })
        //
        //     setCanvasHeight((cw) => {
        //
        //         return gridSize * canvasHeightInput * 4;
        //     })
        // }
        //
        //
        //
        // console.log('grid size: ', gridSize);

    }, [canvasWidthInput, canvasHeightInput, gridSize]);

    const calculateGridSize = () => {

        let c;
        if(canvasContainerHeight > canvasContainerWidth){
            c = canvasContainerHeight
        }

    }

    const checkContainerWidthGreaterThanHeight = () => {
        setIsContainerWidthGreaterThanHeight(canvasContainerWidth > canvasContainerHeight);
    }

    const calculateHeightGreaterThanWidth = () => {
        return canvasHeight > canvasWidth;
    }


    return (
        <>
            <div
                className="absolute top-0 left-0 z-[-4] box-border h-full w-full transform-gpu bg-white bg-center select-none"
                style={{
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    backgroundImage: `
      linear-gradient(0deg, rgba(229, 229, 229, 1), rgba(229, 229, 229, 1) 0.5px, transparent 1px, transparent ${gridSize}px),
      linear-gradient(-90deg, rgba(229, 229, 229, 1), rgba(229, 229, 229, 1) 0.5px, transparent 1px, transparent ${gridSize}px)
    `,
                    backgroundPosition: `${screenCenterX}px ${screenCenterY}px`,
                    transformOrigin: `${screenCenterX}px ${screenCenterY}px`,
                    transform: `scale(${scale})`,
                }}
            ></div>

            <div className="absolute top-[85px] bottom-[280px] left-0 box-border w-full min-w-[480px] bg-no-repeat">
                {isContainerWidthGreaterThanHeight}
                {/* Content here */}

                <div className="flex-column relative flex h-full w-full justify-center">
                    <div
                        id="canvas_container"
                        ref={divRef}
                        className="user-select-none box-border flex h-full min-h-full w-full max-w-full flex-grow items-center justify-center p-[60px_80px_140px_80px] transition-[padding-left] duration-100 perspective-[1200px]"
                    >
                        {/* Content here */}

                        <div
                            className="bg-opacity-40 relative border border-gray-400 bg-white shadow-lg"
                            style={{
                                width: `${canvasWidth}px`,
                                height: `${canvasHeight}px`,
                            }}
                        >
                            {/*bottom-[calc(50%-10px)] left-[calc(-50%-15px)]*/}
                            <div className="absolute -left-7  h-full w-6 border-y-3 border-gray-300 border-dashed flex flex-row justify-center items-center"
                                 style={{
                                     background: `url(/images/arrows/dim-left-h.png) top no-repeat,
                url(/images/arrows/dim-right-h.png) bottom no-repeat,
                url(/images/arrows/dim-width-h.png) top repeat-y`
                                 }}
                            ><div className="text-center rotate-90 bg-white px-3">{canvasHeightInput}"</div></div>
                            <div
                                className="absolute -right-7 h-full w-6 border-y-3 border-gray-300 border-dashed flex flex-col justify-center items-center"
                                style={{
                                    background: `url(/images/arrows/dim-left-h.png) top no-repeat,
                url(/images/arrows/dim-right-h.png) bottom no-repeat,
                url(/images/arrows/dim-width-h.png) top repeat-y`
                                }}
                            >
                                <div  className="text-center -rotate-90  bg-white px-3">{canvasHeightInput}"</div></div>
                            <div
                                className="absolute -top-7 h-6 w-full border-x-3 border-gray-300 border-dashed flex flex-row justify-center items-center"
                                style={{
                                    background: `url(/images/arrows/dim-left.png) top left no-repeat,
                url(/images/arrows/dim-right.png) top right no-repeat,
                url(/images/arrows/dim-width.png) top left repeat-x`
                                }}
                            >
                                <div className="text-center inline-block bg-white px-3 mx-auto">{canvasWidthInput}"</div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="bg-[#ff0923] absolute left-0 bottom-[0px] min-w-[480px] w-full bg-no-repeat box-border py-12">*/}
            {/*    <div className="flex gap-4 mb-4">*/}
            {/*        <div className="flex flex-col">*/}
            {/*            <label className="text-sm">Width (inches)</label>*/}
            {/*            /!*<Slider min={0} max={120} step={6} value={[90]} ></Slider>*!/*/}
            {/*            <Slider min={1} max={120} step={1} defaultValue={[width]} onValueChange={(v) => setWidth(v)}/>*/}
            {/*        </div>*/}
            {/*        <div className="flex flex-col">*/}
            {/*            <label className="text-sm">Height (inches)</label>*/}
            {/*            <Slider min={1} max={120} step={1} defaultValue={[height]} onValueChange={(v) => setHeight(v)}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}

            {/*<div*/}
            {/*    className="relative border border-gray-400 shadow-lg"*/}
            {/*    style={{*/}
            {/*        width: `${width * 52}px`,*/}
            {/*        height: `${height * 52}px`,*/}

            {/*    }}*/}
            {/*>*/}
            {/*    <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-600">*/}
            {/*        {width}" x {height}"*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}
