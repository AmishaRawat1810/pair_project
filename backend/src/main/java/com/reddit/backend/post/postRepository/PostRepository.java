package com.reddit.backend.post.postRepository;

import com.reddit.backend.post.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> { }
