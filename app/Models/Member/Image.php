<?php

namespace App\Models\Member;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasUlids;
    protected $fillable = [
        'user_id',
        'path',
        'folder_name',
        'tags',
        'width',
        'height',
        'dpi_width',
        'dpi_height',
        'width_in_inches',
        'height_in_inches',
        'file_size',
        'mime_type'
    ];

    // Relate the image to the authenticated user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
