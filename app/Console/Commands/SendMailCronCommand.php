<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Mailer;
use DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\SampleNotification;
use App\Libs\Common;

class SendMailCronCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:csmail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    protected $row;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //dd(\Config::get('mail'));
        //
        $mail = new Mailer();
        //$data = $mail->fetchOneId(1);
        $data = $mail->fetchAll();
        //echo $data['start_at'];

        foreach($data as $row){
            $this->row= $row;
            $body = '名前：{{$name}}-テキスト：{{$text1}}-テキスト２：{{$text2}}名前222：{{$name}}';
            $param = array(
                'name' => 'せくし～',
                'text1' => 'どうぐ使い',
                'text2' => 'text2',
            );
            //Mail::to($row['address'])->send(new SampleNotification($param));
            $body = Common::pregBody($body, $param);

            Mail::raw($body, function ($message) {
                $message->to($this->row['address']);
                $message->subject('メールタイトル');
            });
            echo $row['address']."\r\n";
        }


    }
}
