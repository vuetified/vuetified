<?php

function toTitleCase($str) {
    return ucwords(str_replace("_", " ", $str));
}

?>