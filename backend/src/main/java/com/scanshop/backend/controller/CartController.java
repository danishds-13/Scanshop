package com.scanshop.backend.controller;

import com.scanshop.backend.entity.Cart;
import com.scanshop.backend.entity.Product;
import com.scanshop.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/my")
    public Cart getMyCart() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return cartService.getCartByUser(username);
    }

    @PostMapping("/add")
    public Cart addProduct(@RequestBody Product product) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return cartService.addProductToCart(username, product);
    }
}
