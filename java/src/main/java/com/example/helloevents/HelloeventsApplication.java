package com.example.helloevents;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class HelloeventsApplication {

        // Config "target"
        @Value("${TARGET:events}")
        String target;

        @RestController
        class HelloeventsController {
                @PostMapping(path= "/", consumes = "application/json", produces = "application/json")
                String post(
                        @RequestHeader("ce-source") String source
                ) {
                        return "source: " + source;
                }

                @GetMapping("/")
                String hello() {
                        return "Hello Java " + target + "!";
                }
        }

        public static void main(String[] args) {
                SpringApplication.run(HelloeventsApplication.class, args);
        }
}