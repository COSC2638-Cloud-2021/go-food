import React, { useEffect, useState } from 'react'
import { API_USER } from "./config"
import axios from 'axios'

export default function Intergrate () {
    useEffect(() => {
        axios.get('http://localhost:8080/accounts')
            .then(function (response) {
                console.log(response); })
    }, [])
    return (
        <div>
            <h1>This is Intergrate page</h1>
        </div>

    )
}