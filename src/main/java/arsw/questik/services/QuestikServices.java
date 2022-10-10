package arsw.questik.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import arsw.questik.model.Cuestionario;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;

public class QuestikServices {

    @Autowired
    QuestikPersistence questikPersistence;

    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        return questikPersistence.getCuestionario(codigo);
    }
}
