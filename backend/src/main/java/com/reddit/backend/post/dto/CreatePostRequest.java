package com.reddit.backend.post.dto;

import lombok.Data;

@Data
public class CreatePostRequest {
    private String title;
    private String contentText;
    private String mediaUrl;
    private String mediaType;
}