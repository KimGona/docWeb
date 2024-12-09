package com.example.docweb.dto

import lombok.Data

@Data
data class AvailableScheduleTime(
        val name: String,
        val date: String,
        val schedule: String,
        val hours: List<AvailableScheduleTimeHour>
)

@Data
data class AvailableScheduleTimeHour(
        val value: Int,
        val isTaken: Boolean,
        val isFree: Boolean,
)