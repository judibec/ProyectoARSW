package arsw.questikapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication
@ComponentScan(basePackages = {"arsw"})
public class QuestikAPIApplication {
    public static void main(String[] args){
        SpringApplication.run(QuestikAPIApplication.class,args);
    }
    
}
