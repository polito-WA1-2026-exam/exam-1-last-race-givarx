import React from "react";
import { Alert,CloseButton } from "react-bootstrap";
import { useState,useEffect } from "react";
function ErrorIcon(props) {
    const [closed,setClosed] = useState("no")
    useEffect(()=>{
        if(!props.canBeClosed){
            setClosed(props.canBeClosed)
        }
    },[])
    return (
        <>
            {<Alert key={props.variant} variant={props.variant} style={{ minWidth: "70%" }}>
                {closed !== "no" && <CloseButton  onClick={()=>{setClosed("no"); props.close()}}/>}{props.message}
            </Alert>}
        </>
    );
}

export default ErrorIcon;