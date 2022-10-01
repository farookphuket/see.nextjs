<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // current admin will not show
        $u = User::where('id' ,'!=',Auth::user()->id)
                ->latest()
                ->get();

        return response()->json([
            "user" => $u
        ]);

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $u = User::find($user->id);
        return response()->json([
            "user" => $u
        ]);
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
    public function update(User $user)
    {
        $u = User::find($user->id);

        $valid = request()->validate([
            "name" => ["required","unique:users,name,".$user->id],
            "email" => ["required","unique:users,email,".$user->id]
        ]);

        $avatar_url = request()->avatar;
        if(filter_var($avatar_url,FILTER_VALIDATE_URL)):
            $valid["avatar"] = request()->avatar;
        endif;

        $valid["name"] = request()->name;
        $valid["email"] = request()->email;

        User::where("id",$u->id)
                ->update($valid);

        $msg = "success {$u->name} has been updated";

        $data = [
            "name" => request()->name,
            "email" => request()->email
        ];
        return response()->json([
            "msg" => $msg,
            "data" => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $del = User::find($user->id);
        $del->delete();

        return response()->noContent();
    }
}
