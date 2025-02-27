import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import MemberLayout from '@/layouts/member-layout';
import CanvasEditor from '@/components/member/canvas-editor';
import { CanvasSizeSelector } from '@/components/member/canvas/SizeSelector';
import useCanvasStore from '@/store/canvas';

export default function MemberProductShow(){
    const { auth } = usePage<SharedData>().props;

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

    const product = {
        id: '09090a1',
        name: 'Banner Product',
        sizes: [
            {
                "name" : "144 x 48",
                "width": "144",
                "height": "48"
            }
        ]
    }

    console.log('auth: ', auth);
    return (
        <MemberLayout>
            <CanvasEditor />


            <div className="w-full absolute bottom-0 left-0 bg-gray-400 min-h-[200px]">
                <div className="flex flex-row space-x-2 items-center justify-center">
                    <div className="flex flex-row space-x-2 items-center">

                        <div className="bg-yellow-200 p-2 border-2 border-black"><CanvasSizeSelector /> {canvasWidthInput}"x{canvasHeightInput}"</div>
                    </div>
                </div>

            </div>
        </MemberLayout>
    );
}
