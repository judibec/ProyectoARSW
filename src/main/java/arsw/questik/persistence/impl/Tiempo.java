package arsw.questik.persistence.impl;

public class Tiempo extends Thread{

    private boolean suspend;

    public Tiempo(){
        super();
    }

    public void run(){
        while (true){
            enSuspension();
        }
        
    }

    public synchronized void suspender(){
        System.out.println("mimido");
		suspend = true;
	}

    public synchronized void enSuspension(){
		while(suspend){
			try {
				wait();
			}catch (InterruptedException e){
				e.printStackTrace();
			}
		}
	}

    public synchronized void reanudar(){
		suspend = false;
		notifyAll();
	}
    
}
