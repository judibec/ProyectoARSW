package arsw.questik.controller;

import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.impl.Tuple;
import arsw.questik.services.QuestikServices;

@RestController
@RequestMapping(value = "/questiksTemp")
public class QuestikController2 {
    @Autowired
    QuestikServices questikServices;
    
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRtasSelec(){
        try{
            ArrayList<Tuple> tuplas = new ArrayList<>();
            ConcurrentHashMap<String, Integer> rtas = questikServices.getRtasSelec();
            Set<String> llaves  = rtas.keySet();
            for(String i : llaves){
                Tuple tupla = new Tuple<>(i, rtas.get(i));
                tuplas.add(tupla);
            }
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(tuplas), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException e){
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{bandera}" ,method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsuarios(){
        try{
            ArrayList<Tuple> usuarios = questikServices.getUsuarios();
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(usuarios), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException ex){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/{str}/{preguntaActual}" ,method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> revisarResp(@PathVariable int preguntaActual, @PathVariable String str){
        try{
            boolean respuesta = questikServices.revisarResp(preguntaActual, str);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(respuesta), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException ex){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{str}/{preguntaActual}/{bandera}" ,method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> revisarCarrera(@PathVariable int preguntaActual, @PathVariable String str){
        try{
            boolean respuesta = questikServices.revisarCarrera(preguntaActual, str);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(respuesta), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException ex){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> actualizarPuntajes(@RequestBody String nickname) throws QuestikNotFoundException{
            questikServices.actualizarPuntajes(nickname);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteAll(){
        questikServices.deleteAll();
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
