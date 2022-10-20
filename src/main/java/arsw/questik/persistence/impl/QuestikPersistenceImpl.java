package arsw.questik.persistence.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
        Pregunta p = new Pregunta(123, "pregunta", respuestas,'M', 5);
        List<Pregunta> ps = new ArrayList<Pregunta>();
        ps.add(p);
        //________________________________________
        Respuesta r9 = new Respuesta("prueba9", true);
        Respuesta r0 = new Respuesta("prueba0", false);
        List<Respuesta> respuestas3 = new ArrayList<Respuesta>();
        respuestas3.add(r9);
        respuestas3.add(r0);
        Pregunta p3 = new Pregunta(147, "pregunta2", respuestas3,'F', 5);
        ps.add(p3);
        Cuestionario c = new Cuestionario("nombre", 12345, ps);
        questiks.put(12345, c);
        //-------------------------------
        Respuesta r5 = new Respuesta("res1", true);
        Respuesta r6 = new Respuesta("res2", false);
        Respuesta r7 = new Respuesta("res3", false);
        Respuesta r8 = new Respuesta("res4", false);
        List<Respuesta> respuestas2 = new ArrayList<Respuesta>();
        respuestas2.add(r5);
        respuestas2.add(r6);
        respuestas2.add(r7);
        respuestas2.add(r8);
        Pregunta p2 = new Pregunta(456, "preg", respuestas2,'M', 5);
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
    public ArrayList<Pregunta> getPregunta(int codigo) throws QuestikNotFoundException {
        ArrayList<Pregunta> pselec = new ArrayList<>();
        if (questiks.containsKey(codigo)){
            Cuestionario cselec = questiks.get(codigo);
            pselec =  cselec.getPregunta();
        }
        return pselec;
    }

    @Override
    public ArrayList<Respuesta> getRespuestas(int codigoc, int codigop) throws QuestikNotFoundException {
        ArrayList<Respuesta> rselec = new ArrayList<>();
        Cuestionario cselec = questiks.get(codigoc);
        ArrayList<Pregunta> pselec =cselec.getPregunta();
        for(Pregunta p:pselec){
            if(p.getCodigo() == codigop){
                rselec = p.getRespuestas();
            }
        }
        return rselec;
    }

    
    
}
