package com.example.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import java.util.Date;
import io.jsonwebtoken.Claims;
import org.bson.types.ObjectId;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "0eC2x8DWBYicSjLs8ESjs0JNqtFUoLcOeIq4i8b3Ug/gqG65S1aDwq5F32aq0ONq/6FAAae8pCVTKOinebHgcK6BNYlqFcFoVhQJjisNZc8lXMxMbZhbkLztNEAvhiY1i1/bdGqFfyuxt0jnfU3epDd13d4iqBhfXYaI3cwa+Vu96iWSRQNrlE4BydXHVNWHT1NJTDOvxyuVS8PQfbftLW5bBffDb0PDUqomWxk0JMSOJO5cu28Ph9Ji6ArDKzn3SoSOtaMreoS95E70y5flx3ku9oNsY283pjeUhWqtB3vypx7/SXQJZy0DdIoa3B+RhEVy3/1GII5bpZr9qERlefXkRWMCJQAG8obKw5XdRbo=y"; // Change this with your secret key
    private static final long EXPIRATION_TIME = 864_000_000;

    public String extractUserId(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY) // set the secret key used to sign the token
                    .parseClaimsJws(token.replace("Bearer ", "")) // remove Bearer prefix if present
                    .getBody();
            return claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}