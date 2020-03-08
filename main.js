const {app, BrowserWindow, Menu, globalShortcut} = require('electron')
  
  let win
  
  function ready() {
    Menu.setApplicationMenu(null)
    win = new BrowserWindow( { width: 1000, height: 600, fullscreenable: true, images: true } )
    win.setBackgroundColor('#000') // turns opaque brown
    win.loadURL("https://music.youtube.com")
    win.on('closed', () => {
      win = null
    })
    //https://electronjs.org/docs/api/accelerator
    globalShortcut.register('CommandOrControl+Shift+Left', song_prev)
    globalShortcut.register('CommandOrControl+Shift+Enter', song_playPause)
    globalShortcut.register('CommandOrControl+Shift+Right', song_next)
    globalShortcut.register('CommandOrControl+Shift+Up', song_thumbsUp)
    globalShortcut.register('CommandOrControl+Shift+Down', song_thumbsDown)

    globalShortcut.register('MediaPreviousTrack', song_prev)
    globalShortcut.register('MediaPlayPause', song_playPause)
    globalShortcut.register('MediaNextTrack', song_next)
  }

  function song_playPause() {
    hook_ytm("#left-controls > div > paper-icon-button.play-pause-button.style-scope.ytmusic-player-bar")
  }
  function song_next() {
    hook_ytm("#left-controls > div > paper-icon-button.next-button.style-scope.ytmusic-player-bar")
  }
  function song_prev() {
    hook_ytm("#left-controls > div > paper-icon-button.previous-button.style-scope.ytmusic-player-bar")
  }
  function song_thumbsUp() {
    win.setSize(1000,600)
  }
  function song_thumbsDown() {
    win.setSize(500,150)

  }  

  function hook_ytm(selector) {
    win.webContents.executeJavaScript('document.querySelector("'+selector+'").click();', true)
  }
  
  app.on('ready', ready)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if (win === null) {
      ready()
    }
  })
