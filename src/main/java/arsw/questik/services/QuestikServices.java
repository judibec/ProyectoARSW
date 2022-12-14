package arsw.questik.services;


import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;
import arsw.questik.persistence.impl.Tuple;


@Service
public class QuestikServices {

    @Autowired
    QuestikPersistence questikPersistence;
    AtomicInteger activo = new AtomicInteger(0);

    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        return questikPersistence.getCuestionario(codigo);
    }

    public ArrayList<Tuple> getCuestionarios() throws QuestikNotFoundException {
        return questikPersistence.getCuestionarios();
    }

    public Pregunta getPregunta(int codigo, int codigop) throws QuestikNotFoundException, InterruptedException{
        activo.set(0);
        return questikPersistence.getPregunta(codigo,codigop);
    }

    public ArrayList<Respuesta> getRespuestas(int codigoc, int codigop) throws QuestikNotFoundException{
        return questikPersistence.getRespuestas(codigoc,codigop);

    }

    public void guardarCodigoCues(String codigoc) throws QuestikNotFoundException{
        questikPersistence.guardarCodigoCues(codigoc);
    }

    public int getCodCues() throws QuestikNotFoundException{
        return questikPersistence.getCodCues();
    }

    public boolean revisarCues(String nickname,int codigo) throws QuestikNotFoundException{
        return questikPersistence.revisarCues(nickname,codigo);
    }

    public void setRtasSelec(String rta) throws QuestikNotFoundException{
        questikPersistence.setRtasSelec(rta);
    }

    public void cleanRtasSelec() throws QuestikNotFoundException{
        questikPersistence.cleanRtasSelec();
    }

    public ConcurrentHashMap<String, Integer> getRtasSelec() throws QuestikNotFoundException {
        return questikPersistence.getRtasSelec();
    }

    public ArrayList<Tuple> getUsuarios() throws QuestikNotFoundException{
        return questikPersistence.getUsurios();
    }

    public boolean revisarResp(int preguntaActual, String str) throws QuestikNotFoundException {
        return questikPersistence.revisarResp(preguntaActual, str);
    }

    public boolean revisarCarrera(int preguntaActual, String str) throws QuestikNotFoundException{
        boolean resp = false;
        synchronized(activo){
            if(activo.get() == 0){
                activo.set(1);
                resp = questikPersistence.revisarResp(preguntaActual, str);
                if(!resp){
                    activo.set(0);
                }else{
                    activo.set(2);
                }
            }
        }
        return resp;
    }

    public void actualizarPuntajes(String nickname) throws QuestikNotFoundException {
        questikPersistence.actualizarPuntajes(nickname);
    }

    public void deleteAll() {
        questikPersistence.deleteAll();
    }
}
