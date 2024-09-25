package com.ClothingStore.ClothingStore_backend.controller;

import com.ClothingStore.ClothingStore_backend.apiResponse.ApiResponse;
import com.ClothingStore.ClothingStore_backend.dto.ProductDto;
import com.ClothingStore.ClothingStore_backend.entity.CartItem;
import com.ClothingStore.ClothingStore_backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private ProductService productService;
    private List<CartItem> cart = new ArrayList<>();


    @PostMapping("/add/{id}")
    public ResponseEntity<ApiResponse> addToCart(@PathVariable("id") long id){

        ProductDto productDto = productService.getProductById(id);
        boolean productExists = false;

        for(CartItem item : cart){
            if(item.getProduct().getId()==id){//gjej a esht ekzistues produkti ne cart
                item.setQuantity(item.getQuantity() + 1);
                productExists = true;
                break;
            }
        }//for
        if(!productExists){
            cart.add(new CartItem(productDto,1));
        }

        return ResponseEntity.ok(new ApiResponse
            (true, "Product added to cart", cart));

    }

    @GetMapping("/getCart")
    public ResponseEntity<List<CartItem>> getCart(){
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteFromCart(@PathVariable("id")long id){

         boolean productExists = false;

         Iterator<CartItem> iterator = cart.iterator();
        while (iterator.hasNext()) {
            CartItem item = iterator.next();
            if ( (long) item.getProduct().getId() == id) {
                System.out.println("Product ID: " + item.getProduct().getId() + ", Deleting ID: " + id);
                iterator.remove(); // Remove item from cart
                productExists = true;
                break;
            }
        }

        if(!productExists){
             return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(false, "Product not found in cart",cart));
        }
          return ResponseEntity.ok(new ApiResponse
            (true, "Product deleted from cart", cart));

    }

}
