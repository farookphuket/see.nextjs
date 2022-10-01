<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Auth;
class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $user_root_url = "/";
    public function index()
    {
        //
        $this->user_root_url = request()->cookie("USER_ROOT_URL");
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
        $u = User::find(Auth::user()->id);

        $this->user_root_url = request()->cookie("USER_ROOT_URL");
        return response()->json([
            "current_user" => $u,
            "user_root_url" => $this->user_root_url
        ]);
    }

    public function makeAvatar($user_id = 0){
        $avatar = 'img/default.jpeg';

        $avatar_default = 'img/default.jpeg';
        $old_pic = '';
        $public_path = public_path('img/USER_UPLOAD/AVATAR');
        if($user_id != 0):
            // update the profile
            $get = User::find($user_id);
            $old_pic = $get->avatar;

            // user upload file
            if(request()->hasFile('avatar')):
                if($old_pic != $avatar_default && file_exists($old_pic)):
                    // find and delete the previous uploaded file from this user
                    unlink($old_pic);
                endif;
                $fileName = request()->file('avatar');
                $new_name = Auth::user()->email."_".date("Y-m-d")."_".$fileName
                                        ->getClientOriginalName();
    // move the upload file to public folder
                $fileName->move($public_path,$new_name);

                $avatar = 'img/USER_UPLOAD/AVATAR/'.$new_name;
            else:
                // user do not upload any file
                $avatar = $old_pic;
            endif;

        endif;
        return $avatar;
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
    public function update($user_id)
    {
        $u = User::find(Auth::user()->id);

        $valid = request()->validate([
            "email" => ["required","unique:users,email,".$u->id],
            "name" => ["required","unique:users,name,".$u->id],
        ]);

        $avatar = $this->makeAvatar($u->id);
        $valid["name"] = request()->name;
        $valid["email"] = request()->email;
        $valid["avatar"] = $avatar;

        User::where('id',$user_id)
            ->update($valid);


        return response()->json([
            "msg" => "success update id {$user_id} and save"
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
        //
    }
}
