import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from 'react';

interface ImageItem {
    id: string
}
export const IMImageBoxItem = ({ image }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleFolderChange = () => {
        console.log('change folder');
    }

    const handleImageDelete = () => {
        setDialogOpen(true); // Open the AlertDialog when the delete button is clicked
    }

    const handleDeleteConfirm = () => {
        console.log(`delete image with id: ${image.id}`);
        setDialogOpen(false); // Close the dialog after confirming the deletion
    }

    const handleDeleteCancel = () => {
        setDialogOpen(false); // Close the dialog if the cancel button is clicked
    }

    return (
        <div className="shadow rounded overflow-hidden min-h-40">
            <div className="grid grid-cols-3 h-full">
                <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                    <img src="https://placehold.co/600x400" alt={image.title} />
                </div>
                <div className="col-span-2">
                    <div className="flex flex-row justify-end items-center border-b-2">
                        <Button variant="ghost" className="p-2" onClick={handleFolderChange}>
                            <Folder />
                        </Button>
                        <Button variant="ghost" className="p-2" onClick={handleImageDelete}>
                            <Trash2 />
                        </Button>
                    </div>

                    <div className="flex flex-col justify-end items-end p-2">
                        <h3>{image.title}</h3>
                        <p>8"x7"</p>
                        <p className="text-sm text-gray-600">96 DPI</p>
                        <p className="text-xs text-gray-500">9/13/2024, 2:30 AM</p>
                    </div>
                </div>

                {/* AlertDialog is controlled by state */}
                <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the image titled "{image.title}".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500" onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};
