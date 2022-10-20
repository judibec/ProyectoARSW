package arsw.questik.model;

public class Usuario {
    private int code;
    private String nickname;
    private int score;

    public Usuario(int code, String nickname, int score){
        this.code=code;
        this.nickname=nickname;
        this.score=score;
    }

    public Usuario() {
    }

    public int getCode(){
        return code;
    }

    public String getNickname(){
        return nickname;
    }

    public int getScore(){
        return score;
    }

}