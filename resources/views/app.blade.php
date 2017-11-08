@extends('layouts.main')

@push('meta')
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<!-- Fix For Error: Loading chunk [chunk-no] failed at HTMLScriptElement.onScriptComplete -->
<base href="/" />
@endpush

@push('favicon')
<link rel="shortcut icon" href="/img/favicon.ico?v=2" type="image/x-icon"/>
@endpush

@push('css')
<link rel="stylesheet" href="{{ mix('/css/app.css') }}">
@endpush

@push('header_js')
@include('partials.state')
@routes
@endpush

@push('title')
<title>{{ config('app.name') }} </title>
@endpush

@section('content')
<div id="app">
    <app/>
</div>
@endsection

@push('footer_js')
<!-- Load Logo Slider -->
@include('partials.sliderjs')
<!-- If Laravel Echo is Disable in Our Config Dont Load this -->
{{-- @if(config('echo.realtime'))
<script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
@endif --}}
<script src="{{ mix('/js/manifest.js') }}"></script>
<script src="{{mix('/js/vendor.js')}}"></script>
<script src="{{mix('/js/app.js')}}"></script>
@endpush