package arsw.questik.model;

import java.util.ArrayList;
import java.util.List;

public class Cuestionario {
    private String nombre;
    private int codigo;
    private ArrayList<Pregunta> preguntas;

    public Cuestionario(String nombre,int codigo, List<Pregunta> prgtas){
        this.nombre=nombre;
        this.codigo=codigo;
        this.preguntas = new ArrayList<>(prgtas);
    }

    public Cuestionario(){}

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setPregunta(ArrayList<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

    public ArrayList<Pregunta> getPregunta() {
        return preguntas;
    }
}
