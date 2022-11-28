function detectDevice() {
    let type = new MobileDetect(window.navigator.userAgent)
    let button = document.getElementById("Button")
    
    
      if (type.os() === "iOS") {
        console.log("Download for iOS")
        button.value = "Download for iOS";
      } else if (type.os() === "AndroidOS") {
        console.log("Download for Android")
        button.value = "Download for Android";
      } else if (type.os() === "WindowsOS") {
        button.value = "Download for Windows";
      } else if (type.os() === "MacOS") {
        button.value = "Download for Mac";
      } else {
        button.value = "Download on your device";
      }
    
    }
    
    window.addEventListener("load", detectDevice);