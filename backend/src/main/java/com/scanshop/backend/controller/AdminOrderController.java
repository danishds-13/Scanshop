package com.scanshop.backend.controller;

import com.scanshop.backend.entity.Order;
import com.scanshop.backend.service.AdminOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/orders")
public class AdminOrderController {

    @Autowired
    private AdminOrderService adminOrderService;

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return adminOrderService.getAllOrders();
    }

    // Update order status
    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Long orderId,
                                   @RequestParam String status) {
        return adminOrderService.updateOrderStatus(orderId, status);
    }
}
