<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SampleNotification extends Mailable
{
    use Queueable, SerializesModels;

    protected $title;
    protected $body;
    protected $name;
    protected $text1;
    protected $text2;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //各変数設定
        $this->title = $data['title'];
        $this->text = $data['text'];
        $this->name = $data['name'];
        $this->text1 = $data['text1'];
        $this->text2 = $data['text2'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //return $this->view('view.name');
        return $this->view('mails.temp1')
        ->subject($this->title)
        ->with(array(
            'name' => $this->name,
            'text' => $this->text,
            'text1' => $this->text1,
            'text2' => $this->text2,
        ));
    }
}
