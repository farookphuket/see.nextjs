<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Read extends Model
{
    use HasFactory;
    protected $fillable = [
        'ip',
        'os','browser','device'
    ];

    protected static $read_table = "reads";

    public function whatup(){
        return $this->belongsToMany(Whatup::class);
    }


    public static function makeBackup($id){
        // table 
        $table = static::$read_table;

        // file 
        $file = base_path("DB/read_list.sqlite");

        // data 
        $data = Read::find($id);

        // command 
        $command = "
/* ===================== make backup for read id {$id}=====================
 * on ".date("Y-m-d")."
 * */
INSERT INTO `{$table}`(`ip`,`os`,`browser`,`device`,`created_at`,`updated_at`) 
VALUES(
'{$data->ip}',
'{$data->os}',
'{$data->browser}',
'{$data->device}',
'{$data->created_at}',
'{$data->updated_at}');
";
        write2text($file,$command);
    }
}
