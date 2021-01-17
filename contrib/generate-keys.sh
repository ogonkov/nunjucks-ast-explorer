#!/bin/sh

openssl genrsa -out localhost.key 2048

printf '[req]\n distinguished_name=req\n[SAN]\nsubjectAltName=DNS:localhost\n' >> localhost.conf

openssl req \
  -new \
  -x509 \
  -key localhost.key \
  -out localhost.cert \
  -days 3650 \
  -subj /CN=localhost \
  -extensions SAN \
  -config 'localhost.conf'
