package arsw.questik.model;

public class Usuario {
    private int cuestionario;
    private String nickname;
    private int puntaje;

    public Usuario(int cuestionario, String nickname, int puntaje){
        this.cuestionario = cuestionario;
        this.nickname = nickname;
        this.puntaje = puntaje;
    }

    public void setCuestionario(int cuestionario) {
        this.cuestionario = cuestionario;
    }

    public int getCuestionario() {
        return cuestionario;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setPuntaje(int puntaje) {
        this.puntaje = puntaje;
    }

    public int getPuntaje() {
        return puntaje;
    }
}
