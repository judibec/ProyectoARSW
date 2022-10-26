package arsw.questik.persistence.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import arsw.questik.model.Cuestionario;
import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;
import arsw.questik.model.Usuario;
import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.QuestikPersistence;

@Service
public class QuestikPersistenceImpl implements QuestikPersistence{

    private ConcurrentHashMap<String, Integer> rtasSelec = new ConcurrentHashMap<>();
    private Map<Integer, Cuestionario> questiks = new HashMap<>();
    private ArrayList<Usuario> usuarios = new ArrayList<>();
    private int cuestSelec;

    public QuestikPersistenceImpl(){
        Respuesta r1 = new Respuesta("prueba1 larga muy larga demasiado larga excesivamente larga nos quedamos sin ideas...larga", true);
        Respuesta r2 = new Respuesta("prueba2", false);
        Respuesta r3 = new Respuesta("prueba3", false);
        Respuesta r4 = new Respuesta("prueba4", false);
        List<Respuesta> respuestas = new ArrayList<Respuesta>();
        respuestas.add(r1);
        respuestas.add(r2);
        respuestas.add(r3);
        respuestas.add(r4);
        Pregunta p = new Pregunta(1, "pregunta", respuestas,'M', 3);
        List<Pregunta> ps = new ArrayList<Pregunta>();
        ps.add(p);
        //________________________________________
        Respuesta r9 = new Respuesta("prueba9", true);
        Respuesta r0 = new Respuesta("prueba0", false);
        List<Respuesta> respuestas3 = new ArrayList<Respuesta>();
        respuestas3.add(r9);
        respuestas3.add(r0);
        Pregunta p3 = new Pregunta(2, "pregunta2", respuestas3,'F', 3);
        ps.add(p3);
        //________________________________________
        Respuesta r10 = new Respuesta("BECERRA", false);
        Respuesta r11 = new Respuesta("ROZO", true);
        Respuesta r12 = new Respuesta("ESTEBAN", false);
        Respuesta r13 = new Respuesta("A", false);
        List<Respuesta> respuestas4 = new ArrayList<Respuesta>();
        respuestas4.add(r10);
        respuestas4.add(r11);
        respuestas4.add(r12);
        respuestas4.add(r13);
        Pregunta p4 = new Pregunta(3, "Hola", respuestas4,'C', 20);
        ps.add(p4);
        //________________________________________
        Respuesta r14 = new Respuesta("QUÉ", false);
        Respuesta r15 = new Respuesta("COMO", false);
        Respuesta r16 = new Respuesta("QUE", false);
        Respuesta r17 = new Respuesta("NO?", true);
        List<Respuesta> respuestas5 = new ArrayList<Respuesta>();
        respuestas5.add(r14);
        respuestas5.add(r15);
        respuestas5.add(r16);
        respuestas5.add(r17);
        Pregunta p5 = new Pregunta(4, "AHHHH con razón tuurururururu", respuestas5,'C', 20);
        ps.add(p5);
        Cuestionario c = new Cuestionario("nombre", 12345, ps);
        questiks.put(12345, c);

        //-------------------------------

        Respuesta r5 = new Respuesta("res1", true);
        Respuesta r6 = new Respuesta("res2", false);
        Respuesta r7 = new Respuesta("res3", false);
        Respuesta r8 = new Respuesta("res4", false);
        List<Respuesta> respuestas2 = new ArrayList<Respuesta>();
        respuestas2.add(r5);
        respuestas2.add(r6);
        respuestas2.add(r7);
        respuestas2.add(r8);
        Pregunta p2 = new Pregunta(1, "preg", respuestas2,'M', 5);
        List<Pregunta> ps2 = new ArrayList<Pregunta>();
        ps2.add(p2);
        Cuestionario c2 = new Cuestionario("nombre2", 67890, ps2);
        questiks.put(67890, c2);

    }

    @Override
    public Set<Cuestionario> getCuestionario(int codigo) throws QuestikNotFoundException{
        // TODO Auto-generated method stub
        return null;
    }

    // @Override
    // public List<Cuestionario> getCuestionarios() throws QuestikNotFoundException{
    //     return questiks.values().stream().collect(Collectors.toList());
    // }

    @Override
    public ArrayList<Tuple> getCuestionarios() throws QuestikNotFoundException{
        ArrayList<Tuple> tuples = new ArrayList<>();
        // System.out.println(questiks.values().stream().collect(Collectors.toList()).toString());        
        Set<Integer> keys = questiks.keySet();
        for(Integer key: keys){
            String nombre = questiks.get(key).getNombre();
            int codigo = questiks.get(key).getCodigo();
            Tuple tuple = new Tuple<>(codigo, nombre);
            tuples.add(tuple);
        }
        return tuples;
    }
    
    @Override
    public Pregunta getPregunta(int codigo,int codigop) throws QuestikNotFoundException, InterruptedException {
        ArrayList<Pregunta> arraypreg = new ArrayList<>();
        Pregunta pselec = new Pregunta();
        if (questiks.containsKey(codigo)){
            Cuestionario cselec = questiks.get(codigo);
            arraypreg =  cselec.getPregunta();
            for(Pregunta p: arraypreg){
                if(p.getCodigo() == codigop){
                    pselec = p;
                }
            }
        }
        return pselec;
    }

    // public void iniciarHilo(int segundos) throws InterruptedException{
    //     Tiempo hilo = new Tiempo();
    //     hilo.start();
    //     long startTime = System.nanoTime();
	// 	TimeUnit.SECONDS.sleep(segundos);
	// 	long endTime = System.nanoTime();
	// 	long timeElapse = endTime-startTime;
    //     hilo.suspender();
    // }

    @Override
    public ArrayList<Respuesta> getRespuestas(int codigoc, int codigop) throws QuestikNotFoundException {
        ArrayList<Respuesta> rselec = new ArrayList<>();
        Cuestionario cselec = questiks.get(codigoc);
        ArrayList<Pregunta> pselec =cselec.getPregunta();
        for(Pregunta p:pselec){
            if(p.getCodigo() == codigop){
                rselec = p.getRespuestas();
            }
        }
        return rselec;
    }

    @Override
    public void guardarCodigoCues(String codigoc) throws QuestikNotFoundException {
        this.cuestSelec = Integer.valueOf(codigoc);
        
    }

    @Override
    public int getCodCues() throws QuestikNotFoundException {
        return cuestSelec;
    }

    @Override
    public boolean revisarCues(String nickname, int codigo) throws QuestikNotFoundException {
        boolean existe = false;
        if (questiks.containsKey(codigo)){
            Usuario usuario = new Usuario(codigo, nickname, 0);
            usuarios.add(usuario);
            existe = true;
        }
        // System.out.println(usuarios.size());
        return existe;
    }

    @Override
    public void setRtasSelec(String rta) throws QuestikNotFoundException {
        if(rtasSelec.containsKey(rta)){
            int cont = rtasSelec.get(rta);
            cont ++;
            rtasSelec.put(rta, cont);
        }
        else{
            rtasSelec.put(rta, 1);
        }
        
    }

    @Override
    public void cleanRtasSelec() throws QuestikNotFoundException{
        rtasSelec.clear();
    }

    @Override
    public ConcurrentHashMap<String, Integer> getRtasSelec() throws QuestikNotFoundException{
        return rtasSelec;
    }

    @Override
    public ArrayList<Tuple> getUsurios() throws QuestikNotFoundException {
        ArrayList<Tuple> usuariosIn = new ArrayList<>();
        for(Usuario usuario:usuarios){
            String nickname = usuario.getNickname();
            int puntaje = usuario.getPuntaje();
            Tuple tuple = new Tuple<>(nickname, puntaje);
            usuariosIn.add(tuple);
            
        }

        return getUsuBySco(usuariosIn);
    }

    public ArrayList<Tuple> getUsuBySco(ArrayList<Tuple> usuar) throws QuestikNotFoundException{
        Collections.sort(usuar, new Comparator<Tuple>(){

			@Override
			public int compare(Tuple o1, Tuple o2) {
				Integer primer = (Integer) o1.getElem2();
                Integer segundo = (Integer) o2.getElem2();
				return primer.compareTo(segundo);
			}
            
        });
        return usuar;
    }

    @Override
    public boolean revisarResp(int preguntaActual, String str) throws QuestikNotFoundException {
        ArrayList<Pregunta> pregs = questiks.get(cuestSelec).getPregunta();
        ArrayList<Respuesta> rtas = new ArrayList<>();
        boolean bandera = false;
        for(Pregunta pregunta: pregs){
            if(pregunta.getCodigo() == preguntaActual){
                rtas = pregunta.getRespuestas();
            }
        }
        for(Respuesta respuesta: rtas){
            if(respuesta.getRespuesta().equals(str)){
                bandera = respuesta.getCorrecta();
            }
        }
        return bandera;
    }

    @Override
    public void actualizarPuntajes(String nickname) throws QuestikNotFoundException {
        for(Usuario usuario:usuarios){
            if(usuario.getNickname().equals(nickname)){
                int puntaje = usuario.getPuntaje();
                usuario.setPuntaje(puntaje + 600);
            }
        }
        
    }
    
}
