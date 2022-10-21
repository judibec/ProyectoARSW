package arsw.questik.services;


import java.util.List;
import java.util.ArrayList;
import java.util.Set;

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

    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        return questikPersistence.getCuestionario(codigo);
    }

    // public List<Cuestionario> getCuestionarios() throws QuestikNotFoundException {
    //     return questikPersistence.getCuestionarios();
    // }

    public ArrayList<Tuple> getCuestionarios() throws QuestikNotFoundException {
        return questikPersistence.getCuestionarios();
    }

    public Pregunta getPregunta(int codigo, int codigop) throws QuestikNotFoundException, InterruptedException{
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
}
