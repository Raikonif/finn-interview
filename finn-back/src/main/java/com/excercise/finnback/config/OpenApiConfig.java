package com.excercise.finnback.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI projectOpenAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("Finn Back API")
                        .description("REST API for the FINN interview exercise")
                        .version("v1")
                        .license(new License().name("Apache 2.0").url("https://www.apache.org/licenses/LICENSE-2.0"))
                        .contact(new Contact().name("FINN").email("no-reply@example.com"))
                )
                .externalDocs(new ExternalDocumentation()
                        .description("OpenAPI specification")
                        .url("/v3/api-docs")
                );
    }
}
