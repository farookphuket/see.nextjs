<?php

namespace App\Http\Controllers;

use App\Models\Whatup;
use Illuminate\Http\Request;

use Auth;

class WhatupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wp = "";
        if(!Auth::check()):
            $wp = Whatup::with('user')
            ->with('read')
                ->where('is_public','!=',0)
                        ->latest()
                        ->paginate(10);
        else:
            $wp = $this->getAs();
        endif;


        return response()->json([
            "whatup" => $wp
        ]);
    }

    public function getAs(){
        $wp = "";
        if(Auth::user()->is_admin == 1 && Auth::user()):
            $wp = Whatup::with('user')
                        ->latest()
                        ->paginate(15);
        elseif(Auth::user()->id && Auth::user()):
            $wp = Whatup::with('user')
                    ->where('is_public','!=',0)
                    ->orWhere('user_id','=',Auth::user()->id)
                    ->latest()
                    ->paginate(14);
        else:
            $wp = Whatup::with('user')
                    ->where('is_public','!=',0)
                    ->latest()
                    ->paginate(20);
        endif;
        return $wp;
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
            "title" => ["required"]
        ]);

        // is public 
        $is_public = !request()->is_public ? 0:1;

        // cover 
        $cover = "";
        if(filter_var(request()->external_url,FILTER_VALIDATE_URL)):
            //
            $cover = request()->external_url;
        else:
            //$cover = $this->makeCover();
            if(request()->external_url == 1):
                $cover = 'img/default_kob.jpg';
            else:
                $cover = $this->makeCover();
            endif;
        endif;

        $valid["user_id"] = Auth::user()->id;
        $valid["title"] = xx_clean(request()->title);
        $valid["body"] = xx_clean(request()->body);
        $valid["is_public"] = $is_public;
        $valid["cover"] = $cover;

        Whatup::create($valid);

        // get the last row 
        $wp = Whatup::latest()->first();
        
        // make a backup 
        Whatup::backupWhatup($wp->id,"insert"); 

        $msg = "success, note has been save";
        return response()->json([
            "msg" => $msg,
            "cover" => $cover

        ],200);
    }

    public function makeCover($wp_id = 0){

        // default cover image
        $cover = "img/1280x960.png";

        // the previous cover 
        $old_cover = "";

        // set the default to prevent from delete
        $default = "img/1280x960.png";
        
        $public_path = public_path('user_uploaded');
        $db_path = "user_uploaded";


        // check if update post 
        if($wp_id != 0):
            // get the previous cover 
            $get = Whatup::find($wp_id);
            $old_cover = $get->cover;

            // has upload file will do upload
            if(request()->hasFile('cover')):

                // check if the old pic 
                if(file_exists(public_path("{$old_cover}")) && $old_cover != $default):
                    unlink(public_path("{$old_cover}") );
                endif;


                $file = request()->file('cover');

                // append the email and date to the upload file name
                $new_name = Auth::user()->email."_".date("Y-m-d")."_";
                $new_name .= $file->getClientOriginalName();

                // move the upload file to the public path
                $file->move($public_path,$new_name);

                // set the cover name to the new name
                $cover = $db_path."/".$new_name;

            else:
                // no file upload 
                $cover = $old_cover;
            endif;
        else:
            // new post 

            // has upload file will do upload
            if(request()->hasFile('cover')):
                $file = request()->file('cover');

                // append the email and date to the upload file name
                $new_name = Auth::user()->email."_".date("Y-m-d")."_";
                $new_name .= $file->getClientOriginalName();

                // move the upload file to the public path
                $file->move($public_path,$new_name);

                // set the cover name to the new name
                $cover = $db_path."/".$new_name;

            endif;

        endif;



        return $cover;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Whatup  $whatup
     * @return \Illuminate\Http\Response
     */
    public function show(Whatup $whatup)
    {

        // only public can be show here
        $wp = Whatup::with('user')
                ->where('id',$whatup->id)
                ->where('is_public','!=',0)
                ->first();

        // only count the success request
        if($wp != null):
            Whatup::hasRead($whatup->id);
        endif;


        return response()->json([
            "whatup" => $wp
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Whatup  $whatup
     * @return \Illuminate\Http\Response
     */
    public function edit(Whatup $whatup)
    {
        $wp = Whatup::find($whatup->id);

        return response()->json([
            "whatup" => $wp
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Whatup  $whatup
     * @return \Illuminate\Http\Response
     */
    public function update(Whatup $whatup)
    {

        $valid = request()->validate([
            "title" => ["required"]
        ]);

        // is public 
        $is_public = !request()->is_public ? 0:1;

        // cover 
        $cover = "";
        if(filter_var(request()->external_url,FILTER_VALIDATE_URL)):
            //
            $cover = request()->external_url;
        else:
            //$cover = $this->makeCover();
            if(request()->external_url == 1):
                $cover = 'img/kob-test1-1920x1080.png';
            else:
                $cover = $this->makeCover($whatup->id);
            endif;
        endif;

        $valid["title"] = xx_clean(request()->title);
        $valid["body"] = xx_clean(request()->body);
        $valid["is_public"] = $is_public;
        $valid["cover"] = $cover;

        Whatup::where('id',$whatup->id)->update($valid);



        $msg = "success, note id {$whatup->id} has been  save ";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Whatup  $whatup
     * @return \Illuminate\Http\Response
     */
    public function destroy(Whatup $whatup)
    {
        $wp = Whatup::find($whatup->id);
        $p_cover = $wp->cover;
        if(file_exists(public_path("{$p_cover}"))):
            unlink(public_path("{$p_cover}"));
        endif;
        $wp->delete();

        return response()->noContent();
    }
}
