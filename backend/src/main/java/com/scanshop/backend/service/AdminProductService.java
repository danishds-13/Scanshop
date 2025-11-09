package com.scanshop.backend.service;

import com.scanshop.backend.entity.Product;
import com.scanshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class AdminProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by id
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // Add new product with image
    public Product addProductWithImage(String name, String description, double price, MultipartFile image) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImageData(image.getBytes()); // convert file to byte[]
        return productRepository.save(product);
    }

    // Update existing product
    public Product updateProductWithImage(Long id, String name, String description, double price, MultipartFile image) throws IOException {
        Product existing = getProductById(id);
        existing.setName(name);
        existing.setDescription(description);
        existing.setPrice(price);

        if (image != null) {
            existing.setImageData(image.getBytes());
        }

        return productRepository.save(existing);
    }

    // Delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
