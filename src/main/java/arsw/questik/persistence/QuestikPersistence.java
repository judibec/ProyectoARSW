package arsw.questik.persistence;

import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;
import arsw.questik.persistence.impl.Tuple;

public interface QuestikPersistence {
    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException;

    public ArrayList<Tuple> getCuestionarios() throws QuestikNotFoundException;
    
    public Pregunta getPregunta(int codigo, int codigop) throws QuestikNotFoundException, InterruptedException;

    public ArrayList<Respuesta> getRespuestas(int codigoc, int codigop) throws QuestikNotFoundException;

    public void guardarCodigoCues(String codigoc) throws QuestikNotFoundException;

    public int getCodCues() throws QuestikNotFoundException;

    public boolean revisarCues(String nickname, int codigo) throws QuestikNotFoundException;

    public void setRtasSelec(String rta) throws QuestikNotFoundException;

    public void cleanRtasSelec() throws QuestikNotFoundException;

    public ConcurrentHashMap<String, Integer> getRtasSelec() throws QuestikNotFoundException;

    public ArrayList<Tuple> getUsurios() throws QuestikNotFoundException;

    public boolean revisarResp(int preguntaActual, String str) throws QuestikNotFoundException;

    public void actualizarPuntajes(String nickname) throws QuestikNotFoundException;

    public void deleteAll();


}
