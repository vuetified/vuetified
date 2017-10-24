@component('mail::message')
# Order Placed

@component('mail::table')
|                   |           |                                           |
|-------------------|:---------:|:-----------------------------------------:|
| Total Price       |           | {{$subtotal}}                             |
| Tax               |           | {{$tax}}                                  |
| Shipping Fee      |           | {{$shipping_fee}}                         |
| Total Amount      |           | {{$subtotal + $tax + $shipping_fee}}      |
@endcomponent

Settle Your Payment At:

@if($gateway->group === 'Bank Deposit')
@component('mail::panel')

Bank Name: {{ $gateway->name }}

Bank Account: {{ $gateway->details['account_name'] }}

Bank Account No: {{ $gateway->details['account_no'] }}

@endcomponent
@endif

If You Have Settle Your Payment Click This Button To Update Us
@component('mail::button', ['url' => '/dashboard','color' => 'green'])
Confirm Payment
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
