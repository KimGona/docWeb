package com.example.docweb.dto

import lombok.Data

@Data
data class AvailableTime(
        val name: String,
        val date: String,
        val hours: List<Int>
)
