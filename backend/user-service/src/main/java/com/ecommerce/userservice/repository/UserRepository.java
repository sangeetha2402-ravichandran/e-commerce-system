package com.ecommerce.userservice.repository;

import com.ecommerce.userservice.entity.User;
import com.ecommerce.userservice.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(UserRole role);
    
    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.isVerified = true")
    List<User> findActiveVerifiedUsers();
    
    @Query("SELECT u FROM User u WHERE u.isActive = :isActive")
    List<User> findByIsActive(@Param("isActive") Boolean isActive);
    
    @Query("SELECT u FROM User u WHERE u.isVerified = :isVerified")
    List<User> findByIsVerified(@Param("isVerified") Boolean isVerified);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") UserRole role);
}
