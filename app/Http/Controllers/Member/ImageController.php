<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use App\Models\Member\Image as ImageModel;

class ImageController extends Controller
{
    public function upload(Request $request)
    {

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

//        $imageFile = $request->file('image');
//        $imagePath = $imageFile->store('images', 'public');  // Store in a common 'images' folder


        $upload = $request->file('image');
        $image = Image::read($upload);

        $widthInInches = round($image->width() / $image->resolution()->x(),0); // Width in inches = pixels / DPI width
        $heightInInches = round($image->height() /  $image->resolution()->y(),0); // Height in inches = pixels / DPI height

        $widthInchToPx = $widthInInches * $image->resolution()->x();
        $heightInchToPx = $image->height();


        $image = $image->resize(width: $widthInchToPx);

        $imagePath = 'images/' . Str::random() . '.' . $upload->getClientOriginalExtension();

         Storage::put(
            $imagePath,
            $image->encodeByExtension($upload->getClientOriginalExtension(), quality: 100)
        );


        $mimeType= Storage::mimeType($imagePath);
        $fileSize = Storage::size($imagePath);



        // Calculate image size in inches


        $imageArr = [
            'user_id' => $request->user_id,
            'path' => $imagePath,
            'folder_name' => $request->folder_name,  // Virtual folder name
            'tags' => $request->tags,  // Tags, can be comma-separated
            'width' => $widthInchToPx,
            'height' => $heightInchToPx,
            'dpi_width' => $image->resolution()->x(),
            'dpi_height' => $image->resolution()->y(),
            'width_in_inches' => $widthInInches,
            'height_in_inches' => $heightInInches,
            'file_size' => $fileSize,
            'mime_type' => $mimeType,
        ];

//        return response()->json($imageArr);

        // Save to the database
        $image = ImageModel::create($imageArr);

        return response()->json([
            'message' => 'Image uploaded successfully!',
            'image' => $image,
        ]);
    }
}
