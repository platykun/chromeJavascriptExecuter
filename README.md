# chromeJavascriptExecuter
chrome extention execute javascript

## 1. how to setup

### 1.1. run npm install

```sh
cd chromeJavascriptExecuter
npm install
```

### 1.2. Load manifest.json from chrome extension

#### 1.2.1. access chrome extensions

[chrome://extensions/](chrome://extensions/) 

#### 1.2.2. Turn on developer mode

#### 1.2.3. Load an unpackaged extension

click button "Load an unpackaged extension".  
Specify the directory where manifest.json is located.  

## 2. how to use

#### 2.1. add javascript

click `Extension Options` and access option page.  
`chrome-extension://[id]/src/option.html`  

Enter summary and javascript and press Add button.

#### 2.2. execute javascript

Move to the site where you want to execute javascript.  
click browser action button.  
press any button and run javascript.  