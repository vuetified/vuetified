<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
@stack('meta')
@stack('favicon')
@stack('css')
@stack('header_js')
@stack('title')
</head>
<body>
@yield('content')
@stack('footer_js')
</body>
</html>
