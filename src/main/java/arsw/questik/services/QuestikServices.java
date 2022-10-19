package arsw.questik.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import arsw.questik.model.Cuestionario;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;

@Service
public class QuestikServices {

    @Autowired
    QuestikPersistence questikPersistence;

    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        return questikPersistence.getCuestionario(codigo);
    }

    public List<Cuestionario> getCuestionarios() throws QuestikNotFoundException {
        return questikPersistence.getCuestionarios();
    }
}
