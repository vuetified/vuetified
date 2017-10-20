<?php

namespace Vuetified\Contracts;

interface InitialFrontendState
{
    /**
     * Generate the initial front-end state for the application.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return array
     */
    public function forUser($user);

    public function getCart();

    // public function getProducts();

    // public function getUsersCount();

    // public function getPlacedOrders();

    // public function getPendingOrders();

    // public function getPaidOrders();

    // public function getDeliveredOrders();

    // public function getTotalPendingIncome();

    // public function getTotalPaidIncome();

    // public function getActiveUsersCounter();

    // public function getTotalRefund();

}
