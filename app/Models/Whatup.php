<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Read;
use App\Models\Visitor;

use DB;

class Whatup extends Model
{
    use HasFactory;


    protected static $wp_table = "whatups";

    protected static $read_table = "reads";
    protected static $whatup_read_pip = "read_whatup";

    protected $fillable = [
        "user_id",
        "cover",
        "title",
        "body",
        "is_public"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function read(){
        return $this->belongsToMany(Read::class);
    }

    public static function hasRead($wp_id){
        // read table
        $read_table = static::$read_table;

        // read pip table
        $pip_table = static::$whatup_read_pip;

        // visitor data 
        $visitor_data = Visitor::where('ip',getUserIp())
            ->whereDate('created_at','=',date('Y-m-d'))
            ->latest()->first();

        $u_data = [
            'ip' => $visitor_data['ip'],
            'os' => $visitor_data['os'],
            'browser' => $visitor_data['browser'],
            'device' => $visitor_data['device'],
        ];

      //  if(count($visitor_data) > 0):

      //      foreach($visitor_data as $vt):
      //          $u_data["ip"] = $vt->ip;
      //          $u_data['os'] = $vt->os;
      //          $u_data['browser'] = $vt->browser;
      //          $u_data['device'] = $vt->device;
      //      endforeach;
      //  endif;

        // check if the current user ip has been record
        $check = DB::table($pip_table)
            ->where('whatup_id',$wp_id)
            ->where('ip',getUserIp())
            ->whereDate('created_at','=',date("Y-m-d"))
        ->get()->count();

        if($check == 0):
            // this ip has not been record yet, do record
            $read_data = [
                "ip" => getUserIp(),
                "os" => $u_data['os'],
                "browser" => $u_data['browser'],
                "device" => $u_data['device'],
                "created_at" => now(),
                "updated_at" => now()
            ];
            Read::create($read_data);

            // get the last row 
            $new_read = Read::latest()->first();

            // make backup
            Read::makeBackup($new_read->id);

            // read-whatup related
            $pip_data = [
                "ip" => getUserIp(),
                "whatup_id" => $wp_id,
                "read_id" => $new_read->id,
                "created_at" => now(),
                "updated_at" => now()
            ];
            DB::table($pip_table)->insert($pip_data);

            // make backup read link
            static::backupReadLink($wp_id);
        endif;



    }


    public static function backupReadLink($wp_id){
        // table 
        $table = static::$whatup_read_pip;

        // file 
        $file = base_path("DB/whatup_read_link.sqlite");

        // data 
        $r_data = DB::table($table)->where("whatup_id",$wp_id)
                        ->whereDate("created_at","=",date("Y-m-d"))
                        ->where("ip",getUserIp())
                        ->first();
        // command 
        $command = "
/* ====================== pip table for read count whatup ==================== 
 * on ".date("Y-m-d H:i:s")."
 * */
INSERT INTO `{$table}`(`read_id`,`whatup_id`,`ip`,`created_at`,`updated_at`) 
VALUES(
'{$r_data->read_id}',
'{$r_data->whatup_id}',
'{$r_data->ip}',
'{$r_data->created_at}',
'{$r_data->updated_at}');
";
       write2text($file,$command); 
    }

    public static function backupWhatup($wp_id,$cmd=""){
        // table 
        $table = static::$wp_table;
        // to file 
        $toFile = base_path("DB/whatup_list.sqlite");

        // data 
        $data = Whatup::find($wp_id);

        // command to write 
        $command = "";

        // command switch
        switch($cmd):
        case"insert":
            $command = "
/* ============= backup INSERT whatup id {$data->id} =================
 * on ".date("Y-m-d H:i:s a")."
 * */
    INSERT INTO `{$table}` (`user_id`,`title`,`cover`,`body`,`is_public`,
    `created_at`,`updated_at`)VALUES(
        '{$data->user_id}',
        '{$data->title}',
        '{$data->cover}',
        '{$data->body}',
        '{$data->is_public}',
        '{$data->created_at}',
        '{$data->updated_at}');
";
            break;
case"update":
    $command = "
/* ============= backup UPDATE whatup id {$data->id} =================
 * on ".date("Y-m-d H:i:s a")."
 * */
    UPDATE `{$table}` SET 
    title='{$data->title}',
    cover='{$data->cover}',
    is_public='{$data->is_public}',
    body='{$data->body}',
    updated_at='{$data->updated_at}'
    WHERE id='{$wp_id}';
";
            endswitch;


       write2text($toFile,$command); 

    }
}
