package com.gi.giback.dto;

import lombok.Data;

@Data
public class FolderNameDTO {
    private String userEmail;
    private Long folderId;
    private String newFolderName;
}
