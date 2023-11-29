package com.example.security;
import com.example.models.User;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;
import java.util.HashMap;
import java.util.Map;
import com.example.repositories.UserRepository;


@Service
public class UserService {

    private Map<String, String> users = new HashMap<>();
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }



    public boolean createUser(User user) {
        if (users.containsKey(user.getUsername())) {
            return false;
        }

        // password hashing
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        users.put(user.getUsername(), hashedPassword);
        return true;
    }

    public String generateToken(String id) {
        return jwtUtil.generateToken(id);
    }

    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            String hashedPassword = user.getPassword();
            if (BCrypt.checkpw(password, hashedPassword)) {
                ObjectId id = user.getId();
                String idAsString = id.toString();
                String token = generateToken(idAsString);
                user.setToken(token);
                return user;
            }
        }
        return null;
    }
}