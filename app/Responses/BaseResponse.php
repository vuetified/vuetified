<?php 

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;

abstract class BaseResponse implements Responsable {
    
        /**
         * @var string
         */
        protected $view;
    
        abstract protected function prepare() : array;
    
        public function toResponse()
        {
            $data = $this->prepare();
    
            if (request()->ajax()) {
                return response()->json($data);
            } else {
                return response()->view($this->view, $data);
            }
        }
    }