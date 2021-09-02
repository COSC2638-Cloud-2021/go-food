import React, { useEffect, useState } from 'react'
import { API_ACCOUNT } from "../../config"
import axios from 'axios'



export default function Intergrate () {
    useEffect(() => {
        axios.get('http://13.228.29.97:8080/accounts')
            .then(function (response) {
                console.log(response); })
    }, [])
    return (
        <div>
            <h1>This is Intergrate page</h1>
        </div>

    )
}