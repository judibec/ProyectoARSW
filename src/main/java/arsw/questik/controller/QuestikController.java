package arsw.questik.controller;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import arsw.questik.model.Pregunta;
import arsw.questik.model.Respuesta;

import arsw.questik.persistence.QuestikNotFoundException;
import arsw.questik.persistence.impl.Tuple;
import arsw.questik.services.QuestikServices;

@RestController
@RequestMapping(value = "/questiks")
public class QuestikController {


    @Autowired
    QuestikServices questikServices;


    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCuestionariosNombresCodigo(){
        try{
            ArrayList<Tuple> tupla = questikServices.getCuestionarios();
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(tupla), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException ex){
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{codigo}/{codigop}/{bandera}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPregunta(@PathVariable int codigo, @PathVariable int codigop, @PathVariable String bandera){
        try{
            questikServices.cleanRtasSelec();
            Pregunta data = questikServices.getPregunta(codigo,codigop);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException|InterruptedException e){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{codigoc}/{codigop}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRespuestas(@PathVariable int codigoc, @PathVariable int codigop){
        try{
            ArrayList<Respuesta> data = questikServices.getRespuestas(codigoc,codigop);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException e){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> guardarCodigoCues(@RequestBody String codigoc){
        try{
            questikServices.guardarCodigoCues(codigoc);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(QuestikNotFoundException e){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{bandera}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCodCues(@PathVariable String bandera){
        try{
            int data = questikServices.getCodCues();
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException e){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{nickname}/{codigo}/{bandera1}/{bandera2}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> revisarCues(@PathVariable String nickname, @PathVariable int codigo){
        try{
            boolean data = questikServices.revisarCues(nickname,codigo);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException e){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{bandera}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> setRtasSelec(@RequestBody String rta){
        try{
            questikServices.setRtasSelec(rta);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(QuestikNotFoundException e){
            Logger.getLogger(QuestikController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }
}
