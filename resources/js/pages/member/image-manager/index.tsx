import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import MemberLayout from '@/layouts/member-layout';
import ImageUpload from '@/components/member/image-manager/Image-upload';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IMImageBoxItem } from '@/components/member/image-manager/image-box/item';
import { Button } from '@/components/ui/button';
import { FolderPlus, PlayCircleIcon, PlayIcon, Video } from 'lucide-react';

export default function ImageManagerIndex() {
    const { auth } = usePage<SharedData>().props;
    console.log('auth: ', auth);
    return (
        <MemberLayout>

            <div className="grid grid-cols-3 gap-4">

                <div>
                <Card>
                    <CardHeader>Upload Image</CardHeader>
                    <CardContent>
                        <ImageUpload /></CardContent>
                </Card>
                </div>
                <div className="col-span-2">
                    <Card>
                        <CardHeader>Folder Manager</CardHeader>
                        <CardContent>
                            <div className="flex space-x-2">
                                <Button>
                                    <FolderPlus /> Add Folder
                                </Button>

                                <Button className="bg-yellow-300 hover:bg-yellow-200 text-black outline ">
                                    <PlayCircleIcon /> How to
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>


            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 20 }, (_, index) => (
                    <IMImageBoxItem key={index} image={{id: index}} />
                ))}
            </div>

        </MemberLayout>
    );
};
