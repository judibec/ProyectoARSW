package arsw.questik.persistence.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;

@Service
public class QuestikPersistenceImpl implements QuestikPersistence{

    private Map<Integer, Cuestionario> questiks = new HashMap<>();

    public QuestikPersistenceImpl(){
        Respuesta r1 = new Respuesta("prueba1", true);
        Respuesta r2 = new Respuesta("prueba2", false);
        Respuesta r3 = new Respuesta("prueba3", false);
        Respuesta r4 = new Respuesta("prueba4", false);
        List<Respuesta> respuestas = new ArrayList<Respuesta>();
        respuestas.add(r1);
        respuestas.add(r2);
        respuestas.add(r3);
        respuestas.add(r4);
        Pregunta p = new Pregunta(123, "pregunta", respuestas);
        List<Pregunta> ps = new ArrayList<Pregunta>();
        ps.add(p);
        Cuestionario c = new Cuestionario("nombre", 12345, ps);
        questiks.put(12345, c);

        Respuesta r5 = new Respuesta("res1", true);
        Respuesta r6 = new Respuesta("res2", false);
        Respuesta r7 = new Respuesta("res3", false);
        Respuesta r8 = new Respuesta("res4", false);
        List<Respuesta> respuestas2 = new ArrayList<Respuesta>();
        respuestas2.add(r5);
        respuestas2.add(r6);
        respuestas2.add(r7);
        respuestas2.add(r8);
        Pregunta p2 = new Pregunta(456, "preg", respuestas2);
        List<Pregunta> ps2 = new ArrayList<Pregunta>();
        ps2.add(p2);
        Cuestionario c2 = new Cuestionario("nombre2", 67890, ps2);
        questiks.put(67890, c2);



    }

    @Override
    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Cuestionario> getCuestionarios() throws QuestikNotFoundException{
        //List<Cuestionario> cues = questiks.values().stream().collect(Collectors.toList());
        //List<String> nombres = new ArrayList<String>();
        //for(Cuestionario i: cues){
        //    nombres.add(i.getNombre());
        //}
        //return nombres;
        return questiks.values().stream().collect(Collectors.toList());
    }
    
}
