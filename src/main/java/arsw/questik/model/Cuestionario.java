package arsw.questik.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Cuestionario {
    private String nombre;
    private int codigo;
    private ArrayList<Pregunta> preguntas;

    public Cuestionario(String nombre,int codigo, Pregunta[] prgtas){
        this.nombre=nombre;
        this.codigo=codigo;
        List<Pregunta> preguntatest = Arrays.asList(prgtas);
        this.preguntas = new ArrayList<>(preguntatest);
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
