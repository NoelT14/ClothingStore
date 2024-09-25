package com.ClothingStore.ClothingStore_backend.apiResponse;

import com.ClothingStore.ClothingStore_backend.dto.ProductDto;
import com.ClothingStore.ClothingStore_backend.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor

public class ApiResponse {

    private boolean success;
    private String message;
    private List<CartItem> data;

}
