import React, { useState } from 'react';
import axios from 'axios';
import useImageStore  from '@/store/imageStore';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ImageUpload() {
    const [imageFile, setImageFile] = useState(null);
    const setImages = useImageStore(state => state.setImages);
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const handleImageUpload = async (e) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('user_id', user.id);

        try {
            const response = await axios.post('/api/upload-image', formData);
            console.log(response);
            setImages(prevImages => [...prevImages, response.data]);
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    return (
        <div>
            <div className="flex flex-row space-x-2 items-end">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="file"
                           onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>

                <div>
                <Button variant="default" onClick={handleImageUpload}>Upload Image</Button>
                </div>
            </div>


        </div>
    );
};
