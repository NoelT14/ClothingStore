package com.ClothingStore.ClothingStore_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private long id;
    private String name;
    private double price;
    private String wearType;
    private String productDetails;
    private String imageUrl;

}
