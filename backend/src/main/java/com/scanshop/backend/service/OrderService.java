package com.scanshop.backend.service;

import com.scanshop.backend.entity.Order;
import com.scanshop.backend.entity.OrderItem;
import com.scanshop.backend.entity.User;
import com.scanshop.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(User user, List<OrderItem> items, double totalPrice) {
        Order order = new Order();
        order.setUser(user);
        order.setItems(items);
        order.setTotalPrice(totalPrice);
        order.setStatus("Pending");  // initial status
        return orderRepository.save(order);
    }
}
