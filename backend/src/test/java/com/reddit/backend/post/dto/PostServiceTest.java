package com.reddit.backend.post.dto;
import com.reddit.backend.post.model.Post;
import com.reddit.backend.post.postRepository.PostRepository;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class PostServiceTest {
    @Test
    void shouldCreateRequestWithValues() {

        CreatePostRequest request = new CreatePostRequest();

        request.setTitle("Hello");
        request.setContentText("First post");

        assertEquals("Hello", request.getTitle());
        assertEquals("First post", request.getContentText());
    }
}