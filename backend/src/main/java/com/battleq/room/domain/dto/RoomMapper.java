package com.battleq.room.domain.dto;

import com.battleq.room.domain.dto.request.CreateRoomRequest;
import com.battleq.room.domain.entity.Room;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper extends GenericMapper<CreateRoomRequest, RoomDto> {
}
