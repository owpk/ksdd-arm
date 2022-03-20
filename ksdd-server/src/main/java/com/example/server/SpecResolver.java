package com.example.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import java.util.Map;

/**
 * @author owpk
 */
@Slf4j
public class SpecResolver {

    private final Map<String, String> specs;
    private Specification<TransformedLog> defaultSpec;

    public SpecResolver(Map<String, String> specs) {
        this.specs = specs;
        defaultSpec = Specification.where(null);
    }

    public Specification<TransformedLog> resolve() {
        appendIfContains("obj_id", (r, cq, cb) ->
                cb.like(r.get("objId").as(String.class), "%" + specs.get("obj_id") + "%"));
        return defaultSpec;
    }

    private void appendIfContains(String key, Specification<TransformedLog> specification) {
        if (specs.containsKey(key)) {
            if (specs.get(key) != null && !specs.get(key).isBlank())
                defaultSpec = defaultSpec.and(specification);
            else log.warn("empty specification with key: {}", key);
        }
    }
}