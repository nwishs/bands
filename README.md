
# Bands
Bands festival details

## Table of Content:
- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Setup](#setup)
- [Start](#start)
- [Test](#test)
- [Limitation](#limitation)

## About The App
Bands is an application that downloads music festival data from https://eacp.energyaustralia.com.au/codingtest/api/v1/ in the below format -

    [
        {
            "name": "Omega Festival",
            "bands": [
            {
                "name": "Band X",
                "recordLabel": "Record Label 1"
            }
        },
        {
            "name": "",
            "bands": [
            {
                "name": "Band X",
                "recordLabel": "Record Label 1"
            }
        },
        {
            "name": "Alpha Festival",
            "bands": [
            {
                "name": "Band A",
                "recordLabel": "Record Label 2"
            }
        },
        {
            "name": "Beta Festival",
            "bands": [
            {
                "name": "Band A",
                "recordLabel": "Record Label 2"
            }
        },
    ]

It then transforms the data into below format to display it using reactjs -

    Record Label 1
        Band X
            Omega Festival
        Band Y
    Record Label 2
        Band A
            Alpha Festival
            Beta Festival

## Technologies
`React`

## Setup
- download or clone the repository
- run `npm install`

## Start 
- npm start

## Test 
- npm test

## Limitation
The project is connected to Proxy which is hosted on free dynos hence limiting the number of requests
https://p1-anywhere.herokuapp.com/corsdemo 
