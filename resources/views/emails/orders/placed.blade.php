@component('mail::message')
**Congratulations, {{$order->user->name}}**

**Your Order Has Been Placed**

**Order No: {{$order->id}}**

@component('mail::table')
| Product           | Qty              | Price                           | Subtotal                           |
|:------------------|:----------------:|:-------------------------------:|-----------------------------------:|
@foreach($items as $item)
| {{$item['name']}} | {{$item['qty']}} | {{$currency}}{{$item['price']}} | {{$currency}}{{$item['subtotal']}} |
@endforeach

@endcomponent

@component('mail::table')
|  |   |                    |                                          |
|:-|:-:|-------------------:|-----------------------------------------:|
|  |   | **Subtotal:**      | **{{$currency}}{{$subtotal}}**                        |
|  |   | **Tax:**           | **{{$currency}}{{$tax}}**                             |
|  |   | **Shipping Fee:**  | **{{$currency}}{{$shipping_fee}}**                    |
|  |   | **Total:**         | **{{$currency}}{{$net_total}}**                       |
@endcomponent

---

**You May Settle Your Payment As Specified Below**
@component('mail::panel')
<strong>Mode of Payment: {{ $gateway->name }}</strong>
@foreach($gateway->details as $key => $detail)

{{ toTitleCase($key) }} : {{$detail}}

@endforeach
@endcomponent

---

@if($courier)
@component('mail::panel')
<strong>Delivery Method: {{ $courier->group }}</strong>
@foreach($courier->details as $key => $detail)

{{ toTitleCase($key) }} : {{$detail}}

@endforeach

@endcomponent
@endif

---

<center>Click Button Below To Update Your Order</center>

@component('mail::button', ['url' => '/dashboard','color' => 'green'])
Confirm Payment
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
