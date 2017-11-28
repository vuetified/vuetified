@component('mail::message')
You got a Message From {{ $sender }}

@if($contact_no)
Call Now! @ {{ $contact_no }}
@endif

{{ $subject }}

---

{{ $message }}

---

Reply To This Email : {{ $email  }}


@endcomponent
