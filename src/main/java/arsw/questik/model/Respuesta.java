package arsw.questik.model;

public class Respuesta {
    
    private String respuesta;
    private boolean correcta;

    public Respuesta(String respuesta, boolean correcta){
        this.respuesta=respuesta;
        this.correcta=correcta;
    }

    public Respuesta() { 
    }
    
    public void setCorrecta(boolean correcta) {
        this.correcta = correcta;
    }
    
    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public boolean getCorrecta() {
        return correcta;
    }
}
