package com.ClothingStore.ClothingStore_backend.controller;


import com.ClothingStore.ClothingStore_backend.dto.ProductDto;
import com.ClothingStore.ClothingStore_backend.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts(){

        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }


    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestParam String  productJson,
                                                    @RequestParam MultipartFile image){

    ObjectMapper objectMapper = new ObjectMapper();
    ProductDto productDto;

    try {
        productDto = objectMapper.readValue(productJson, ProductDto.class);
    } catch (JsonProcessingException e) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

        String imageUrl = productService.saveImage(image);
        productDto.setImageUrl(imageUrl);

        //save product in db
        ProductDto savedProduct = productService.saveProduct(productDto);

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public  ResponseEntity<ProductDto> getProduct(@PathVariable("id") long id){
        ProductDto productDto = productService.getProductById(id);

        return ResponseEntity.ok(productDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") long id,
                                                    @RequestParam String productJson,
                                                @RequestParam MultipartFile image){
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDto productDto;
    try {
        productDto = objectMapper.readValue(productJson, ProductDto.class);
    } catch (JsonProcessingException e) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    productService.saveImage(image);
    productDto.setImageUrl(productDto.getImageUrl());
    ProductDto updatedProduct = productService.updateProduct(id,productDto);

    return ResponseEntity.ok(updatedProduct);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id")long id){

        productService.deleteProduct(id);

        return ResponseEntity.ok("Product has been deleted !");
    }


}
