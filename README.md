# BAINI

A web application that allows signing and verification of images.

## Description

Baini is a web application that enables creators to provide tamper-evident signatures on images and provide information on the source and history of images as well as perform verification of the provenance information. Images are cryptographically hashed and signed, along with any provenance information the creator may choose to add. The signature is tamper-evident and thus can expose any changes from the original.

The project utilizes the [CAI Open Source SDK](https://opensource.contentauthenticity.org/docs/introduction) for cryptographic hashing, signing and verification. This tool complies with the technical specifications released by the Coalition for Content Provenance and Authenticity, [C2PA](https://c2pa.org/).

## Built With

- React
- Node(Express)
- Docker

[View website](https://baini-images.web.app/)
