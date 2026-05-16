package com.ecommerce.userservice.repository;

import com.ecommerce.userservice.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    
    List<UserAddress> findByUserId(Long userId);
    
    List<UserAddress> findByUserIdAndIsDefault(Long userId, Boolean isDefault);
    
    @Query("SELECT ua FROM UserAddress ua WHERE ua.user.id = :userId AND ua.isDefault = true")
    Optional<UserAddress> findDefaultAddressByUserId(@Param("userId") Long userId);
    
    void deleteByUserId(Long userId);
}
