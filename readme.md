## UAV-Mav-API

#### Before install:

```sh

# update local index packages
sudo apt-get update

# install nodejs
sudo apt-get install nodejs

# install npm package manager
sudo apt-get install npm

```

#### Set configurations in config.json

```sh

# example

{
	"port": "ttyUSB1",
	"baudrate": 57600,
	"autopilotType": "ardupilotmega",
	"mavlinkVersion": "v1.0"
}

```


#### Install:

```sh
# clone git repo:
git clone https://github.com/AndrewKuktenko/Uav-Mav-API.git

# navigate to project dir
cd Uav-Mav-API

# install npm dep:
npm install

# run app
node app.js
```
 