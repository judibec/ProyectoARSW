package arsw.questik.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Pregunta {

    private int codigo;
    private String pregunta;
    private ArrayList<Respuesta> respuestas;
    
    public Pregunta(int codigo, String pregunta, Respuesta[] rtas){
        this.codigo=codigo;
        this.pregunta=pregunta;
        List<Respuesta> respuestatest = Arrays.asList(rtas);
        this.respuestas = new ArrayList<>(respuestatest);
    }

    public Pregunta(){}

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }
    
    public String getPregunta() {
        return pregunta;
    }

    public void setRespuestas(ArrayList<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }

    public ArrayList<Respuesta> getRespuestas() {
        return respuestas;
    }

}
