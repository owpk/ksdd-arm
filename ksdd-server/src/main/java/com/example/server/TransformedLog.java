package com.example.server;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "logs")
public class TransformedLog {

    @Id
    @Column(name = "obj_id")
    Long objId;

    @Column(name = "content")
    String content;

    @Column(name = "transformed")
    Boolean transformed;
}
