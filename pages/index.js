import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'
import React from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'



export default function Home() {
	const [visitorId, setVisitorId] = React.useState("")


	function handleButtonClick() {
		console.log("button clicked");
		// Initialize an agent at application startup.
		const fpPromise = FingerprintJS.load({
			token: 'tXDGqdPGX6CGFZ8ofXr1', region: 'eu'
		})

		// Get the visitor identifier when you need it.
		fpPromise
			.then(fp => fp.get())
			.then(result => setVisitorId(result.visitorId))
	}

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="FingerPrintJS PRO test" />
	<button onClick={handleButtonClick}>Get Visitor Id</button>
	<div>{visitorId}</div>
      </main>

      <Footer />
    </div>
  )
}
