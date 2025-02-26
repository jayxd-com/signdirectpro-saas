<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberProductController extends Controller
{
    public function show($id)
    {
        return Inertia::render('member/product/show');
    }
}
