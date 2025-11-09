package com.scanshop.backend.controller;

import com.scanshop.backend.dto.ProductDTO; // ✅ Import ProductDTO
import com.scanshop.backend.entity.Product;
import com.scanshop.backend.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {

    @Autowired
    private AdminProductService adminProductService;

    // List all products
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        List<Product> products = adminProductService.getAllProducts();
        return products.stream().map(ProductDTO::new).toList();
    }

    // Add new product with image upload
    @PostMapping
    public Product addProduct(@RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam("price") double price,
                              @RequestParam("image") MultipartFile image) throws IOException {

        return adminProductService.addProductWithImage(name, description, price, image);
    }

    // Update product (optional: include new image)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestParam("name") String name,
                                 @RequestParam("description") String description,
                                 @RequestParam("price") double price,
                                 @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        return adminProductService.updateProductWithImage(id, name, description, price, image);
    }

    // Delete product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        adminProductService.deleteProduct(id);
    }
}
