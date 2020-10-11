package com.naver.reserve.dao;

import com.naver.reserve.dto.request.MoreViewRequestDto;
import com.naver.reserve.dto.response.Product;
import com.naver.reserve.dto.response.ProductResponseDto;

import java.util.List;

public interface ProductDao {

    List<Product> getProduct(String categoryId, MoreViewRequestDto moreViewRequestDto);

    int getProductCount(String categoryId);
}
