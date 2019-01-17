# vue-electron-typescript-quickstart

A boilerplate of Electron app that uses Vue in TypeScript.  
This is based on the output of Vue CLI 3 and is not ejecting from the CLI.


## Usage
```
git clone https://github.com/shellyln/vue-electron-typescript-quickstart.git
cd vue-electron-typescript-quickstart

vi package.json
# and edit package name, author, ...

rm package-lock.json
npm install

rm -rf .git/
git init
git add .
git commit -m "initial commit."

npm run build
npm run build:mainproc
npm start
```

---

## Project setup
```
npm install
```

### ~~Compiles and hot-reloads for development~~
```
npm run serve
```

### Compiles and minifies for production (electron renderer process)
```
npm run build
```

### Compiles and minifies for production (electron main process)
```
npm run build:mainproc
```

### Clean project
```
npm run clean
```

### Start electron app for debug
```
npm run start
```

### Build electron distribution executable files (unpacked)
```
npm run pack
```

### Build electron distribution executable files (packing to the installer)
```
npm run dist
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests (renderer process)
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


---


## **Electron Documentation (security)**
See [this](https://electronjs.org/docs/tutorial/security) guide.
