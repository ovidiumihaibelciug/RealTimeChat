@extends('layouts.master')

@section('content')
    {{--<div class="container">--}}
        <div class="row" style="margin:10px">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <ul class="list-group">

                    <li class="list-group-item active"><strong>Chat room</strong></li>
                    <div class="messages" v-chat-scroll>
                        <message-component v-for="value, index in chat.message" :key="value.index" :user=chat.user[index] color="warning"  style="height: auto">
                            @{{ value }}
                        </message-component>
                    </div>

                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-md-10" style="padding: 0;">
                                <input type="text" class="form-control" v-model="message" @keyup.enter="send" @focus="seen" style="border-radius: 0">
                            </div>
                            <div class="col-md-2" style="padding: 0;">
                                <button class="btn btn-success" style="border-radius: 0" @click="send"><span class="fa fa-paper-plane"></span> Send</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
@endsection

