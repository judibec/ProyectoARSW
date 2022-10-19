package arsw.questik.services;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;


@Service
public class QuestikServices {

    @Autowired
    QuestikPersistence questikPersistence;

    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        return questikPersistence.getCuestionario(codigo);
    }

    public ArrayList<Pregunta> getPregunta(int codigo) throws QuestikNotFoundException{
        return questikPersistence.getPregunta(codigo);
    }

    public ArrayList<Respuesta> getRespuestas(int codigoc, int codigop) throws QuestikNotFoundException{
        return questikPersistence.getRespuestas(codigoc,codigop);
    }
}
