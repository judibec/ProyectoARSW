package arsw.questik.persistence;

public class QuestikNotFoundException extends Exception{
    public QuestikNotFoundException(String message) {
        super(message);
    }

    public QuestikNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
