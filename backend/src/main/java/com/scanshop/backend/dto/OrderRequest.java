package com.scanshop.backend.dto;

import java.util.List;
import com.scanshop.backend.entity.OrderItem;

public class OrderRequest {
    private String username;
    private List<OrderItem> items;
    private double totalPrice;

    // Getters & Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}
