package com.excercise.finnback.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDocument {
    @Id
    private String id;

    private Long relationalId; // links to PostgreSQL UserEntity

    private String fullName;
    private String email;
}
