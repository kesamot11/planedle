package com.planedle.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${DATABASE_URL:}")
    private String rawDatabaseUrl;

    @Value("${DB_USER:postgres}")
    private String dbUser;

    @Value("${DB_PASSWORD:03082005}")
    private String dbPassword;

    @Value("${DB_NAME:planedle}")
    private String dbName;

    @Value("${DB_HOST:localhost}")
    private String dbHost;

    @Value("${DB_PORT:5432}")
    private String dbPort;


    @Bean
    public DataSource dataSource() {
        if (rawDatabaseUrl != null && !rawDatabaseUrl.isEmpty()) {
            String jdbcUrl = rawDatabaseUrl.replace("postgresql://", "jdbc:postgresql://");
            return DataSourceBuilder.create()
                    .url(jdbcUrl)
                    .build();
        } else {
            String jdbcUrl = "jdbc:postgresql://" + dbHost + ":" + dbPort + "/" + dbName;
            return DataSourceBuilder.create()
                    .url(jdbcUrl)
                    .username(dbUser)
                    .password(dbPassword)
                    .build();
        }
    }
}

