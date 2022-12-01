const APP_ID = '673115882376428ba37ef97e93fa71f2'
const CHANNEL = 'main'
const TOKEN = '007eJxTYND87uQqa3t7JWu/fwa7xLVfjzcbdP1fy7PoobGhwQFtaRkFBjNzY0NDUwsLI2NzMxMji6REY/PUNEvzVEvjtERzwzSjj3YdyQ2BjAx7LpYwMTJAIIjPwpCbmJnHwAAAsw8dxg=='
let UID;

console.log('Stream.js connected')


const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                  </div>`
    
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream()