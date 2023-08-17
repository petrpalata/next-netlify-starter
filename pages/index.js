import Head from 'next/head'
import InnerHTML from 'dangerously-set-html-content'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'
import React from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'



export default function Home() {
    const [visitorId, setVisitorId] = React.useState("")
    const [error, setError] = React.useState("")


    function handleButtonClick() {
        console.log("button clicked");
        // Initialize the agent at application startup.
        const fpPromise = FingerprintJS.load({
            apiKey: 'Pe5kakv7aTUlgSjFNw5E',
            scriptUrlPattern: [
                'https://stg.fp.palatable.tech/procdn/v3/Pe5kakv7aTUlgSjFNw5E/loader_v3.8.5.js',
                FingerprintJS.defaultScriptUrlPattern, // The default endpoint as fallback
            ],
            endpoint: [
                'https://stg.fp.palatable.tech/',
                FingerprintJS.defaultEndpoint, // The default endpoint as fallback
            ]
        })

        // When you need the visitor identifier:
        fpPromise
            .then(fp => fp.get())
            .then(result => console.log(result.visitorId))
            .catch(error => console.log(error))
    }

    const cdnScript = `
           <script>
            const fpPromise = import('https://stg.fp.palatable.tech/procdn/v3/Pe5kakv7aTUlgSjFNw5E')
            .then(FingerprintJS => FingerprintJS.load({ 
            endpoint: [ 'https://stg.fp.palatable.tech'] 
        })); 
            fpPromise.then(fp => fp.get()).then(result => console.log('CDN version', result.visitorId)).catch(error => console.log(error));
            </script>
    `

    return (
        <div className="container">
        <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
        <Header title="FingerPrintJS PRO test" />
        <button onClick={handleButtonClick}>Get Visitor Id NPM</button>
        <div>{visitorId}</div>
        <div>{error}</div>
        <InnerHTML html={cdnScript} />
        </main>

        <Footer />
        </div>
    )
}
