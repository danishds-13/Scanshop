package com.scanshop.backend.controller;

import com.scanshop.backend.entity.Product;
import com.scanshop.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add product with image upload
    @PostMapping("/add")
    public Product addProduct(@RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam("price") double price,
                              @RequestParam("image") MultipartFile image) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImageData(image.getBytes());

        return productService.addProduct(product);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
}
