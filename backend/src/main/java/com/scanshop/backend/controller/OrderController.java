package com.scanshop.backend.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.scanshop.backend.entity.Order;
import com.scanshop.backend.entity.OrderItem;
import com.scanshop.backend.entity.User;
import com.scanshop.backend.repository.OrderRepository;
import com.scanshop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.*;
import javax.imageio.ImageIO;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Create Order
    @PostMapping("/create")
    public Order createOrder(@RequestBody OrderRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert DTOs to entity items
        List<OrderItem> orderItems = new ArrayList<>();
        if (request.getItems() != null) {
            for (OrderItemDTO dto : request.getItems()) {
                OrderItem item = new OrderItem();
                item.setName(dto.getName());
                item.setPrice(dto.getPrice());
                item.setQuantity(dto.getQuantity());
                orderItems.add(item);
            }
        }

        // Step 1: Save the order first (without QR)
        Order order = new Order();
        order.setUser(user);
        order.setItems(orderItems);
        order.setTotalPrice(request.getTotalPrice());
        order.setStatus("Pending");
        order.setOrderDate(LocalDateTime.now());
        order = orderRepository.save(order); // ✅ JPA assigns ID here

        // Step 2: Generate QR using the now-known ID
        String qrText = "Order ID: " + order.getId() +
                "\nUser: " + user.getUsername() +
                "\nTotal: ₹" + order.getTotalPrice();
        String qrBase64 = generateQrBase64(qrText);
        order.setQrCode(qrBase64);

        // Step 3: Save again with QR
        return orderRepository.save(order);
    }

    // ✅ Fetch user orders
    @GetMapping("/{username}")
    public List<Order> getUserOrders(@PathVariable String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return Collections.emptyList();
        return orderRepository.findByUser(user);
    }

    // ✅ QR Generator Helper
    private String generateQrBase64(String text) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 250, 250);
            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            ImageIO.write(MatrixToImageWriter.toBufferedImage(bitMatrix), "PNG", pngOutputStream);
            byte[] pngData = pngOutputStream.toByteArray();
            return Base64.getEncoder().encodeToString(pngData);
        } catch (WriterException | java.io.IOException e) {
            throw new RuntimeException("QR generation failed: " + e.getMessage());
        }
    }

    // ✅ DTOs
    public static class OrderRequest {
        private String username;
        private List<OrderItemDTO> items;
        private double totalPrice;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public List<OrderItemDTO> getItems() { return items; }
        public void setItems(List<OrderItemDTO> items) { this.items = items; }

        public double getTotalPrice() { return totalPrice; }
        public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    }

    public static class OrderItemDTO {
        private String name;
        private int quantity;
        private double price;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }

        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }
}
