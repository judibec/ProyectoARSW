package arsw.questik.persistence;

import java.util.List;
import java.util.Set;

import arsw.questik.model.Cuestionario;

public interface QuestikPersistence {
    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException;

    public List<Cuestionario> getCuestionarios() throws QuestikNotFoundException;
}
