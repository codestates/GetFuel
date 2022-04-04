import React from "react";
import axios from "axios";

function kakaoLogin () {
    
    const code = new URL(window.location.href).searchParams.get('code')
    
};

export default kakaoLogin;