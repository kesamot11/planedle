package com.planedle.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

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
            try {
                URI uri = new URI(rawDatabaseUrl);
                String userInfo = uri.getUserInfo(); // user:pass
                String[] userParts = userInfo.split(":");

                String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();

                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(userParts[0])
                        .password(userParts[1])
                        .build();
            } catch (URISyntaxException e) {
                throw new RuntimeException("Invalid DATABASE_URL", e);
            }
        } else {
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://localhost:5432/planedle")
                    .username("postgres")
                    .password("03082005")
                    .build();
        }
    }

}

