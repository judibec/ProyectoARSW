package arsw.questik.model;

import java.util.ArrayList;
import java.util.List;

public class Pregunta {

    private int codigo;
    private String pregunta;
    private ArrayList<Respuesta> respuestas;
    private char tipo;
    private int tiempo;

    public Pregunta(int codigo, String pregunta, List<Respuesta> rtas, char tipo, int tiempo){
        this.codigo=codigo;
        this.pregunta=pregunta;
        this.respuestas = new ArrayList<>(rtas);
        this.tipo = tipo;
        this.tiempo= tiempo;
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

    public char getTipo() {
        return tipo;
    }

    public void setTipo(char tipo) {
        this.tipo = tipo;
    }

    public int getTiempo() {
        return tiempo;
    }

    public void setTiempo(int tiempo) {
        this.tiempo = tiempo;
    }

}
