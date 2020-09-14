# Dojo Storm Client

The client and IoT server that runs on a Raspberry PI hooked up to a monitor

## Run the IOT app in one terminal

`node app -k "certs/private.pem.key" -c "certs/certificate.pem.crt" -a "certs/root-CA.crt" -T "whatever-here" -p 8883 -H "avqchaav0iwou-ats.iot.us-east-2.amazonaws.com"`

## Run the local React server in a second terminal

`npm start`
