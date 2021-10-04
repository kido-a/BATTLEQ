package com.battleq.room.repository;

import com.battleq.room.domain.entity.Room;
import com.battleq.room.domain.exception.NotFoundPinException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    public void save(Room room){
        if(room.getId() == null){
            em.persist(room);
        }else {
            em.merge(room);
        }
    }

    public Room findByPin(int pin) throws NotFoundPinException {
        try {
            return em.createQuery("select r from Room r where r.pin = :pin ", Room.class)
                    .setParameter("pin", pin)
                    .getSingleResult();
        }catch (NoResultException e){
            throw new NotFoundPinException("참가하려는 방을 찾을 수 없습니다.");
        }
    }

    public List<Room> findAll(){
        return em.createQuery("select r from Room r",Room.class)
                .getResultList();
    }
}
