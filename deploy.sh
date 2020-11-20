#!/bin/sh

cd public

scp -r build vcs@covid.vps.tecnico.ulisboa.pt:/var/www/html/build
scp -r images vcs@covid.vps.tecnico.ulisboa.pt:/var/www/html/images
scp *.php vcs@covid.vps.tecnico.ulisboa.pt:/var/www/html/
scp index.html vcs@covid.vps.tecnico.ulisboa.pt:/var/www/html/
scp bundle.css vcs@covid.vps.tecnico.ulisboa.pt:/var/www/html/


echo "Done!"