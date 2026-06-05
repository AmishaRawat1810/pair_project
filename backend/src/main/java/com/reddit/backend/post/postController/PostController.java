package com.reddit.backend.post.postController;

import com.reddit.backend.post.dto.CreatePostRequest;
import com.reddit.backend.post.model.Post;
import com.reddit.backend.post.postService.PostService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public Post createPost(@RequestBody CreatePostRequest postRequest) {
        return postService.createPost(postRequest);
    }

}
