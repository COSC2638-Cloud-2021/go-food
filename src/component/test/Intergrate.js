import React, { useEffect, useState } from 'react'
import { API_ACCOUNT } from "../../config"
import axios from 'axios'



export default function Intergrate () {
    useEffect(() => {
        axios.get('ec2-13-229-242-111.ap-southeast-1.compute.amazonaws.com:8080/accounts')
            .then(function (response) {
                console.log(response); })
    }, [])
    return (
        <div>
            <h1>This is Intergrate page</h1>
        </div>

    )
}