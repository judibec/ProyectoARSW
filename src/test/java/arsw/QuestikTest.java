package arsw;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;

import java.util.ArrayList;

import org.junit.Before;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.impl.Tuple;
import arsw.questik.services.QuestikServices;

public class QuestikTest {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    QuestikServices qts = app.getBean(QuestikServices.class);   

    @Before
    public void setUp(){
        qts.deleteAll();
    }

    @Test
    public void Prueba() throws QuestikNotFoundException{
        ArrayList<Tuple> cuestionarios = qts.getCuestionarios();
        assertEquals(cuestionarios.size(), 2);  
    }
}
