<?php

return [
// If We Will Use Database , We Would Like To Fetch it By Order Increasing
            [
            'id'        => 1,
            'action'    => 'fa-tags',
            'title'     => 'Sub Categories',
            'href'      => '/categories',
            'active'    => false,
            'component' => null,
            'order'     => 0,
            // Relationship For Nested Sets of Menu
            'items'     => [
                                [
                                'id'        => 4,
                                'title'=> 'Packages', 
                                'avatar'=> '/img/packages.png', 
                                'action'=> 'fa-search', 
                                'active'=> false, 
                                'href'=> '/categories/packages', 
                                'component'=> 'Category'
                                ],
                                [
                                    'id'        => 5,
                                    'title'=> 'Amazing Products', 
                                    'avatar'=> '/img/products.jpg', 
                                    'action'=> 'fa-search', 
                                    'active'=> false, 
                                    'href'=> '/categories/supplements', 
                                    'component'=> 'Category'
                                ],
                                [
                                    'id'        => 5,
                                    'title'=> 'Food Cart', 
                                    'avatar'=> '/img/foodcart.png', 
                                    'action'=> 'fa-search', 
                                    'active'=> false, 
                                    'href'=> '/categories/food-cart', 
                                    'component'=> 'Category'
                                ],
                            ],
            ],
            // Add Here Array you want to add in your Group Menu Links
];