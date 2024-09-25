package com.ClothingStore.ClothingStore_backend.mapper;

import com.ClothingStore.ClothingStore_backend.dto.ProductDto;
import com.ClothingStore.ClothingStore_backend.entity.Product;



public class ProductMapper {

    public static Product mapToProduct(ProductDto productDto){

        return new Product(productDto.getId(),productDto.getName(),
                productDto.getPrice(),productDto.getWearType(),
                productDto.getProductDetails(), productDto.getImageUrl());
    }

    public static ProductDto mapToProductDto(Product product){

        return new ProductDto(product.getId(), product.getName(),
                product.getPrice(), product.getWearType(),
                product.getProductDetails(), product.getImageUrl());
    }


}
