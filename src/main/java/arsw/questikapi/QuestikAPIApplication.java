package arsw.questikapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"arsw.questik"})
public class QuestikAPIApplication {
    public static void main(String[] args){
        SpringApplication.run(QuestikAPIApplication.class,args);
    }
}
