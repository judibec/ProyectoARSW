package arsw.questik.persistence.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;

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



    }

    @Override
    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        // TODO Auto-generated method stub
        return null;
    }
    
}
