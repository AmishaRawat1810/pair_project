package com.reddit.backend.post.postService;

import com.reddit.backend.post.dto.CreatePostRequest;
import com.reddit.backend.post.model.Post;
import com.reddit.backend.post.postRepository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PostService {
    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public Post createPost(CreatePostRequest postRequest) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContentText(postRequest.getContentText());
        post.setMediaType(postRequest.getMediaType());
        post.setMediaURL(postRequest.getMediaUrl());
        post.setLikeCount(0);
        post.setCreatedAt(Instant.now());

        return repository.save(post);
    }
}
