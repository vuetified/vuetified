<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Exceptions\EmailNotFound;
use App\Exceptions\OrderArchive;
use App\Exceptions\OrderDone;
use App\Exceptions\OrderNotFound;
use App\Exceptions\SlugNotFound;
use App\Exceptions\UsernameNotFound;
use App\Exceptions\UserTokenNotFound;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        EmailNotFound::class,
        OrderArchive::class,
        OrderDone::class,
        OrderNotFound::class,
        SlugNotFound::class,
        UserNameNotFound::class,
        UserTokenNotFound::class
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            return response()->json(['message' => 'Action UnAuthorized!'],403);
        }
        return parent::render($request, $exception);
    }
}
