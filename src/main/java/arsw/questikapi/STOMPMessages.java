package arsw.questikapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class STOMPMessages {
    @Autowired
    SimpMessagingTemplate msgt;

    @MessageMapping("/newquestik.{cuestionario}")
    public synchronized void handlePointEvent(String cues, @DestinationVariable String cuestionario) throws Exception {
        System.out.println("Nuevo punto recibido en el servidor!:"+ cues);
        msgt.convertAndSend("/topic/newquestik."+ cuestionario,cues);
    }

    @MessageMapping("/siguientePregunta/newquestik.{cuestionario}")
    public synchronized void handlePointEvent(@DestinationVariable String cuestionario) throws Exception {
        msgt.convertAndSend("/topic/newquestik."+ cuestionario,"nextQuestion");
    }

    @MessageMapping("/puntajes/newquestik.{cuestionario}")
    public synchronized void handlePointEvent2(@DestinationVariable String cuestionario) throws Exception {
        msgt.convertAndSend("/topic/newquestik."+ cuestionario,"puntos");
    }

    @MessageMapping("/user/newquestik.{cuestionario}")
    public synchronized void handlePointEvent3(@DestinationVariable String cuestionario) throws Exception {
        msgt.convertAndSend("/topic/newquestik."+ cuestionario,"user");
    }
    
}
