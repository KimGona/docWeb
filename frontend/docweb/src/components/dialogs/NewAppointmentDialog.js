import { Popup_background } from "../wrap/popup_background"
import CloseIcon from '@mui/icons-material/Close';
import {StyledNowPopup} from "./Product_Detail.css"
import Button from "../Button"
import React, { useState } from "react";
import SimpleDialog from "./SimpleDialog";

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const NowPopup = (props) => {

    return (
        <Popup_background>
            <StyledNowPopup>
                <div className="purchase_box">
                    <div className="x" onClick={()=>props.handlePopup()}>
                    <CloseIcon />
                    </div>
                    //요 아래는 필요 없는 부분~ 그냥 주문서 내용임
                    <h1>주문서</h1>
                    <ul>
                        <li>제품명 <span>sgss</span></li>
                        <li>가격 <span>5325</span></li>
                    </ul>
                    <div className="flex_contain">
                        <Button value="주문 취소" />
                        <Button value="주문 하기" color="blue" />
                    </div>
                </div>
            </StyledNowPopup>
        </Popup_background>
    )
}

export default NowPopup