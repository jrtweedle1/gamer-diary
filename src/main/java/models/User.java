import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document annotation to specify the collection
@Document(collection="users")
public class User {

    //setting up the fields including @Id annotation; marks it as primary key
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private List<String> diaryIds;

    //constructor
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    //getters and setters
    //id
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    //username
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    //password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}