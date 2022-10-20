package arsw.questik.controller;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
import arsw.questik.services.QuestikServices;

@RestController
@RequestMapping(value = "/questiks")
public class QuestikController {
    
    @Autowired
    QuestikServices questikServices;

    @RequestMapping(path = "/{codigo}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPregunta(@PathVariable int codigo){
        try{
            ArrayList<Pregunta> data = questikServices.getPregunta(codigo);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }catch(QuestikNotFoundException e){
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
}
