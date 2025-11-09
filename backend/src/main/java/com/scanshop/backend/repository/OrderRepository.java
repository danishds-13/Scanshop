package com.scanshop.backend.repository;

import com.scanshop.backend.entity.Order;
import com.scanshop.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
