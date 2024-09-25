package com.ClothingStore.ClothingStore_backend.repo;

import com.ClothingStore.ClothingStore_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepo extends JpaRepository<Product,Long> {


}
