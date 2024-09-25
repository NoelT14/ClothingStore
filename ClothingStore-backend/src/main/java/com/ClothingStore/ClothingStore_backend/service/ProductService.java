package com.ClothingStore.ClothingStore_backend.service;

import com.ClothingStore.ClothingStore_backend.dto.ProductDto;
import com.ClothingStore.ClothingStore_backend.entity.Product;
import com.ClothingStore.ClothingStore_backend.mapper.ProductMapper;
import com.ClothingStore.ClothingStore_backend.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/product-images/";


    public ProductDto getProductById(long id){

        Product product = productRepo.findById(id).orElseThrow();

        return ProductMapper.mapToProductDto(product);

    }
    public List<ProductDto> getAllProducts(){
        List<Product> products = productRepo.findAll();

        return products.stream()
                .map(product->ProductMapper.mapToProductDto(product))
                .collect(Collectors.toList());
    }

    public ProductDto saveProduct(ProductDto productDto){

        Product product= ProductMapper.mapToProduct(productDto);

        Product saved = productRepo.save(product);
        return  ProductMapper.mapToProductDto(saved);
    }

    public void deleteProduct(long id){

        productRepo.findById(id).orElseThrow
                (()->new NoSuchElementException("Element is not found with id:" + id));
        productRepo.deleteById(id);

    }

    public ProductDto updateProduct(long id,ProductDto productDto){
        Product product = productRepo.findById(id)
                .orElseThrow(()->new NoSuchElementException("Element is not found with id:" + id));
       // product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setWearType(productDto.getWearType());
        product.setProductDetails(productDto.getProductDetails());
        product.setImageUrl(productDto.getImageUrl());
        productRepo.save(product);

        return ProductMapper.mapToProductDto(product);

    }

     public String saveImage(MultipartFile image) {
        try {
        // Define the directory where images will be saved
        Path uploadDir = Paths.get(UPLOAD_DIR);

        // Ensure the directory exists, if not, create it
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);  // Create directory if it doesn't exist
        }

        // Define the path where the image will be saved
        Path filePath = uploadDir.resolve(image.getOriginalFilename());

        // Save the file to the directory
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return image.getOriginalFilename();
    } catch (IOException e) {
        throw new RuntimeException("Failed to store image", e);
    }
    }
}
