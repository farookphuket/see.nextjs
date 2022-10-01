<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Auth;
use Cookie;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $valid = request()->validate([
            "email" => ["required","email"],
            "password" => ["required"]
        ]);

        if(!Auth::attempt(request()->only("email","password"))):
            return response()->json([
                "msg" => "Sorry! but login fail"
            ],401);
        endif;

        $user = User::find(Auth::user()->id);

        $cookie_life = 60*24;
        $cookie_url = "/";
       $url = '/'; 
        if(Auth::user()->is_admin != 0):
            $cookie_url = cookie("USER_ROOT_URL","/admin",$cookie_life);
            $url = '/admin';
        else:
            $cookie_url = cookie("USER_ROOT_URL","/member",$cookie_life);
            $url = '/member';
        endif;
        $name = Auth::user()->name;
        $msg = "success , welcome {$name}";
        return response()->json([
            "msg" => $msg,
            "user" => $user,
            "user_root_url" => $url,
            "user_id" => Auth::user()->id
        ])->withCookie($cookie_url);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        
        Cookie::forget("USER_ROOT_URL");
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();


        return response()->noContent();
    }
}
