package com.reddit.backend.post.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.Instant;

@Data
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String userId;
    private String title;
    private String contentText;
    private String mediaURL;
    private String mediaType;
    private Integer likeCount;
    private Instant createdAt;
}

//Lombok generates:
//getters
//setters
//toString
//equals
//hashCode automatically.