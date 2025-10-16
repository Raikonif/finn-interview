package com.excercise.finnback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Configuration
public class SwaggerUiRedirect {

    @GetMapping({"/swagger-ui", "/swagger-ui/"})
    public String redirectToUi() {
        return "redirect:/swagger-ui/index.html";
    }
}
