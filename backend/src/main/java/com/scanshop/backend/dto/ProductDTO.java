package com.scanshop.backend.dto;

import com.scanshop.backend.entity.Product;
import java.util.Base64;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String image; // Base64 image string

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();

        // Convert byte[] to Base64 String if image exists
        if (product.getImageData() != null) {
            this.image = Base64.getEncoder().encodeToString(product.getImageData());
        } else {
            this.image = null;
        }
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public String getImage() { return image; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(double price) { this.price = price; }
    public void setImage(String image) { this.image = image; }
}
