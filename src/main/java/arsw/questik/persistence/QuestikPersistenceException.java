package arsw.questik.persistence;

public class QuestikPersistenceException extends Exception{
    
    public QuestikPersistenceException(String message) {
        super(message);
    }

    public QuestikPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
