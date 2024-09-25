package com.ClothingStore.ClothingStore_backend.entity;


import com.ClothingStore.ClothingStore_backend.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItem {

    private ProductDto product;
    private int quantity;

}
