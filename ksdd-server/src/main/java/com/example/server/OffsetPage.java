package com.example.server;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class OffsetPage<T> extends PageImpl<T> {
    public OffsetPage(List<T> content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public OffsetPage(List<T> content) {
        super(content);
    }

}
