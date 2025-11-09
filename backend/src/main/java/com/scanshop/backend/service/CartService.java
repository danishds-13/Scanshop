package com.scanshop.backend.service;

import com.scanshop.backend.entity.Cart;
import com.scanshop.backend.entity.Product;
import com.scanshop.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart getCartByUser(String username) {
        return cartRepository.findByUsername(username).orElse(new Cart(username, new ArrayList<>()));
    }

    public Cart addProductToCart(String username, Product product) {
        Cart cart = cartRepository.findByUsername(username).orElse(new Cart(username, new ArrayList<>()));
        cart.getProducts().add(product);
        return cartRepository.save(cart);
    }
}
