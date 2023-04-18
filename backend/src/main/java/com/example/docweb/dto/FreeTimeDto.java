package com.example.docweb.dto;


import com.example.docweb.entity.FreeTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class FreeTimeDto {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private List<TimeDto> timeList;

    static FreeTime toFreeTime(FreeTimeDto freeTimeDto) {
        FreeTime freeTime = new FreeTime();
        freeTime.setId(freeTimeDto.getId());
        freeTime.setDate(freeTimeDto.getDate());
        freeTime.setTimeList(freeTimeDto.getTimeList().stream().map(TimeDto::toTime).collect(Collectors.toList()));
        return freeTime;
    }
}
