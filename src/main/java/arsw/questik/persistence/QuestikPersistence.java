package arsw.questik.persistence;

import java.util.ArrayList;
import java.util.Set;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;

public interface QuestikPersistence {
    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException;

    public Pregunta getPregunta(int codigo, int codigop) throws QuestikNotFoundException;

    public ArrayList<Respuesta> getRespuestas(int codigoc, int codigop) throws QuestikNotFoundException;
}
