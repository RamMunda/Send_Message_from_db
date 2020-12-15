var MyInterval;
var ReturnValue;
MyInterval=setInterval(WAmainfunction,4000);
var currentnotView = [];
var personOnView = [];
var messageOnview = [];
var group_or_personname;
var message;
var groupName;
var g = window.location.href;
var p = new URL(g);
var data = [];

// check message in text container and press button of send 
setTimeout(()=>{
    var selecteddivforText = document.querySelectorAll("._1awRl.copyable-text.selectable-text");
    if(selecteddivforText){
        if(selecteddivforText.length==2){
            if(selecteddivforText[1].textContent){
                eventFire(document.querySelector('span[data-icon="send"]'), 'click');
        
            }
        
        }        
    }

},10000);

// check if number is invalid and click button
setInterval(()=>{
   if(document.querySelector("._30EVj.gMRg5")){
       eventFire(document.querySelector("._30EVj.gMRg5"),'click');
   }
},2000);


// check in every 1 min if we have any contact detail in chrome storage
setInterval(()=>{
    if(document.querySelector("._36Q2N.two")){
    // check person is login or logout
    if(document.querySelector(".NVQmc")){
        console.log("you must have to login...");
    }
    // access data from chrome storage
    chrome.storage.sync.get('a', function(r) {
        console.log('Value is get to ' , r.a);
        if(r.a.length===0){
            return null;
        }
        var datad = r.a.pop();
        data = datad;
        window.data = window.data;
        chrome.storage.sync.set({'a': r.a}, function() {
            setTimeout(()=>{
                groupName = data.Group_name;
                window.groupName = window.groupName;
                message = data.message;
                window.message = window.message;
            },2000);
    
            // to check that contact detail is phone number or GroupNameor person name and then send message
            setTimeout(()=>{
                if(Boolean(Number(groupName))===true){
                    console.log("groupname",groupName);
                    group_or_personname = Number(groupName);
                    console.log(group_or_personname);
                    window.location.href = `https://web.whatsapp.com/send/?phone=91${group_or_personname}&text=${message}&app_absent=0`;
                    setTimeout(()=>{
                        eventFire("._36or._2y_c._2z0c._2z07","click");
                    },2000);
        
                }
                else{
                    group_or_personname = groupName; 
                    console.log(group_or_personname);
                    window.group_or_personname =window.group_or_personname;
                    message = message;
                    window.message = window.message;
                    selectPerson_group(group_or_personname, message);
                }
    
    
                if(typeof group_or_personname==="number"){
                    return null;
                }
            },3000);           
        });

    });
    }


},60000);

// selectPerson_group function to send message to a group and person 
const selectPerson_group = (group_or_personname, message) =>{
    var persons = [];
    var chatlist = document.querySelector("._3soxC._2aY82");
    var persondata = chatlist.childNodes;
    persondata.forEach(function(data){
        var personsTitles = data.querySelector('._1hI5g._1XH7x._1VzZY');
            var txtValue = personsTitles.textContent || personsTitles.innerText;
            var filter = group_or_personname.toUpperCase();
                if(txtValue.toUpperCase().indexOf(filter) >-1){
                    persons.push(txtValue);
                    if(personsTitles.title==group_or_personname){
                        console.log(group_or_personname);
                        var titleDiv = data.querySelector('._1c_mC');
                        selectChat(titleDiv, message, disp);
                    }
 

                 }

                     
        });
        // if person is not in view port then scroll side-bar down
        if(persons.length==0){
            var countTime = 0;
            var scrollFuncController = [];
            for(var t=0;t<difference.length;t++){
                if(difference[t]===group_or_personname){
                    $(document).ready(function() {
                        $('#pane-side').animate({
                          scrollTop: -(document.querySelector("._3soxC._2aY82").offsetHeight),                       
                        }, 1000);
                      persons.push("1");
                      var personFind = [];
                      var chatlist = document.querySelector("._3soxC._2aY82");
                      var persondata = chatlist.childNodes;
                    //   using observer 
                      const configure = { attributes: true, childList: true, subtree: true };
                      var observer = new MutationObserver(function(mutations){
                        var hasUpdates = false; 
                        for (var index = 0; index < mutations.length; index++) {
                             var mutation = mutations[index]; 
                             if (mutation.type === 'childList' && mutation.addedNodes.length) {
                                  hasUpdates = true; 
                                  break; 
                               } 
                           }
                           // check if childnodes are updating
                            if (hasUpdates) {
                                persondata.forEach(function(data){
                                    var personsTitles = data.querySelector('._1hI5g._1XH7x._1VzZY');
                                        var txtValue = personsTitles.textContent || personsTitles.innerText;
                                        var filter = group_or_personname.toUpperCase();
                                        if(txtValue.toUpperCase().indexOf(filter) >-1){
                                                personFind.push(txtValue);
                                                if(personsTitles.title==group_or_personname){
                                                    // persons.push("1");
                                                    scrollFuncController.push("1");
                                                    var titleDiv = data.querySelector('._1c_mC');
                                                    selectChat(titleDiv, message, disp);
                                                    return null;
                                                }
                                                else{

                                                }
                             
                            
                                             }
                            
                                                 
                                });
                                if(personFind.length==1){
                                   observer.disconnect();
                                }
                            } 
                           });
                        
                           observer.observe(chatlist, configure);   
                    });                   
                }
                else{

                }
                countTime = countTime + 1;
            }
            if(countTime==difference.length){
                if(scrollFuncController.length==0){
                    Scrolldown();
                }
            }      

        }

        // if person is not in above view port then try to scroll down and find group name and send message
        function Scrolldown(){
                $(document).ready(function() {
                      $('#pane-side').animate({
                        scrollTop: document.querySelector("._3soxC._2aY82").offsetHeight - document.getElementById('pane-side').offsetHeight,                       
                      }, 2000);                                                                                         

                    });
            
        }
        // if person is not in view port then scroll side-bar up

        if(persons.length===0){
            $(document).ready(function() {
                  $('#pane-side').animate({
                    scrollTop: document.querySelector("._3soxC._2aY82").offsetHeight - document.getElementById('pane-side').offsetHeight,                       
                  }, 2000);
                  var personFind = [];
                  var chatlist = document.querySelector("._3soxC._2aY82");
                  var persondata = chatlist.childNodes;
                //   using observer 
                  const configure = { attributes: true, childList: true, subtree: true };
                  var observer = new MutationObserver(function(mutations){
                    var hasUpdates = false; 
                    for (var index = 0; index < mutations.length; index++) {
                         var mutation = mutations[index]; 
                         if (mutation.type === 'childList' && mutation.addedNodes.length) {
                              hasUpdates = true; 
                              break; 
                           } 
                       }
                       // check if childnodes are updating
                        if (hasUpdates) {
                            persondata.forEach(function(data){
                                var personsTitles = data.querySelector('._1hI5g._1XH7x._1VzZY');
                                    var txtValue = personsTitles.textContent || personsTitles.innerText;
                                    var filter = group_or_personname.toUpperCase();
                                    if(txtValue.toUpperCase().indexOf(filter) >-1){
                                            personFind.push(txtValue);
                                            if(personsTitles.title==group_or_personname){
                                                var titleDiv = data.querySelector('._1c_mC');
                                                selectChat(titleDiv, message, disp);
                                            }
                         
                        
                                         }
                        
                                             
                            }); 
                            if(personFind.length==1){
                               observer.disconnect();
                            }
                        } 
                       });
                    
                       observer.observe(chatlist, configure);                                                                                         

                });
        
    }
    if(persons.length===0){
        if(typeof group_or_personname === Number){
        }
    }

 }
// check message from popup js and respond
chrome.runtime.onMessage.addListener(msgObj => {
    console.log(msgObj);
    // open new tab of web.whatsapp 
    if(msgObj.msg=="openNewTab"){
        chrome.runtime.sendMessage({
            from: 'content',
            subject:'Link not open',
        });
        console.log("not right url....");
        window.location.href = "https://web.whatsapp.com/";
        return null;  
    }
    // send message to popup for login
    if(window.location.href=="https://web.whatsapp.com/"){
        var non_logdesk = document.querySelector('._1PTz1');
        if(non_logdesk){
            error_message = "Please login first";
            console.log("sendmgForloginalert");
            chrome.runtime.sendMessage({
                from: 'content',
                subject: error_message,
              });
              return null;     
        }
        console.log("right url....");
 
    }
    // check for person is login or logout
    if(msgObj.msg){
        console.log(msgObj.msg);
        if(msgObj.msg=="check_loginOrNot"){
            console.log("check_loginOrNot");
            var non_logdesk = document.querySelector('._1PTz1');
            if(non_logdesk){
                error_message = "Please login first";
                console.log("sendmgForloginalert");
                chrome.runtime.sendMessage({
                    from: 'content',
                    subject: error_message,
                  });
                  return null;     
            }
        }
    }

    
    // check if we have data in chrome storage
    if(msgObj.msg[0].length>1){
        console.log(msgObj.msg);
        chrome.storage.sync.set({'a': msgObj.msg[0]}, function() {
            console.log("set object of array in chrome storage");
        });
        // chrome.storage.sync.get('a', function(r) {
        //     console.log('Value is get to ' , r.a);
        //     console.log(r.a[0].Group_name);
        //     console.log(r.a[0].message);
        //     var datad = r.a.pop();
        //     data = datad;
        //     window.data = window.data;
        //     chrome.storage.sync.set({'a': r.a}, function() {
                // making groupName and message global variable
                // setTimeout(()=>{
                //     console.log(data);
                //     console.log(data.Group_name);
                //     groupName = data.Group_name;
                //     window.groupName = window.groupName;
                //     message = data.message;
                //     window.message = window.message;
                // },2000);
                
                //         // to check that contact detail is phone number or GroupNameor person name and then send message
                // setTimeout(()=>{
                //     if(Boolean(Number(groupName))===true){
                //         console.log("groupname",groupName);
                //         group_or_personname = Number(groupName);
                //         console.log(group_or_personname);
                //         window.location.href = `https://web.whatsapp.com/send/?phone=91${group_or_personname}&text=${message}&app_absent=0`;
                //         setTimeout(()=>{
                //             eventFire("._36or._2y_c._2z0c._2z07","click");
                //         },2000);
            
                //     }
                //     else{
                //         console.log("groupname",groupName);
                //         group_or_personname = groupName; 
                //         console.log(group_or_personname);
                //         window.group_or_personname =window.group_or_personname;
                //         message = message;
                //         window.message = window.message;
                //         selectPerson_group(group_or_personname, message);

                //     }

                //     if(typeof group_or_personname==="number"){
                //         return null;
                //     }
                // },3000);
        //     });
          
        // });


    }

        
        
});

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var lastMessageOnChat = false;
var ignoreLastMsg = {};
var elementConfig = {
    "chats": [0, 0, 5, 2, 0, 3, 0, 0, 0],
    "chat_icons": [0, 0, 1, 1, 1, 0],
    "chat_title": [0, 0, 1, 0, 0, 0, 0],
    "chat_lastmsg": [0, 0, 1, 1, 0, 0],
    "chat_active": [0, 0],
    "selected_title": [0, 0, 5, 3, 0, 1, 1, 0, 0, 0, 0]
};

const jokeList = [
    `
    Husband and Wife had a Fight.
    Wife called Mom : He fought with me again,
    I am coming to you.
    Mom : No beta, he must pay for his mistake,
    I am comming to stay with U!`,

    `
    Husband: Darling, years ago u had a figure like Coke bottle.
    Wife: Yes darling I still do, only difference is earlier it was 300ml now it's 1.5 ltr.`,

    `
    God created the earth, 
    God created the woods, 
    God created you too, 
    But then, even God makes mistakes sometimes!`,

    `
    What is a difference between a Kiss, a Car and a Monkey? 
    A kiss is so dear, a car is too dear and a monkey is U dear.`
]


	// Get random value between a range
	function rand(high, low = 0) {
		return Math.floor(Math.random() * (high - low + 1) + low);
	}
    
    function getLastMsg(){
		var messages = document.querySelectorAll('.msg');
		var pos = messages.length-1;
		
		while (messages[pos] && (messages[pos].classList.contains('msg-system') || messages[pos].querySelector('.message-in'))){
			pos--;
			if (pos <= -1){
				return false;
			}
		}
		if (messages[pos] && messages[pos].querySelector('.selectable-text')){
			return messages[pos].querySelector('.selectable-text').innerText.trim();
		} else {
			return false;
		}
	}
    
    function getUnreadChats(){
		var unreadchats = [];
        var chats = getElement("chats");
		if (chats){
			chats = chats;
			for (var i in chats){
				if (!(chats[i] instanceof Element)){
					continue;
				}
                var icons = getElement("chat_icons", chats[i]);
				if (!icons){
					continue;
				}
				for (var j in icons){
					if (icons[j] instanceof Element){
						if (!(icons[j].childNodes[0].getAttribute('data-icon') == 'muted' || icons[j].childNodes[0].getAttribute('data-icon') == 'pinned')){
							unreadchats.push(chats[i]);
							break;
						}
					}
				}
			}
        }
		return unreadchats;
	}
	
	function didYouSendLastMsg(){
		var messages = document.querySelectorAll('.msg');
		if (messages.length <= 0){
			return false;
		}
		var pos = messages.length-1;
		
		while (messages[pos] && messages[pos].classList.contains('msg-system')){
			pos--;
			if (pos <= -1){
				return -1;
			}
		}
		if (messages[pos].querySelector('.message-out')){
			return true;
		}
		return false;
	}

	// Call the main function again
	const goAgain = (fn, sec) => {
		// const chat = document.querySelector('div.chat:not(.unread)')
		// selectChat(chat)
		setTimeout(fn, sec * 1000)
    }
    


	// Send a message
	const sendMessage = (chat, message) => {
		//avoid duplicate sending
		var title;
		if (chat){          
            title = getElement("chat_title",chat);
		} else {
            title = getElement("selected_title").title;
            
		}
        ignoreLastMsg[title] = message;
		messageBox = document.querySelectorAll("[contenteditable='true']")[1];
        //add text into input field
        messageBox.innerHTML = message.replace(/  /gm,'');
		//Force refresh
        event = document.createEvent("UIEvents");
		event.initUIEvent("input", true, true, window, 1);
		messageBox.dispatchEvent(event);

		//Click at Send Button
		eventFire(document.querySelector('span[data-icon="send"]'), 'click');
        

    
		
	}


function sendMessages () {
  var evt = new Event('input', {
    bubbles: true
  });
  
  var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
  input.innerHTML = "this is a test";
  input.dispatchEvent(evt);

  getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[3]/button").click();
}

// callback function call after code complition in select function
function disp(chat, message){ 
    start(chat, message);

    console.log('This must be printed after code complition'); 
}

// selectchat function to show chat box
const selectChat = (chat, message, callback) => {
    console.log(chat);
    console.log(message);

    const title = getElement("chat_title",chat);
    setTimeout(()=>{
        eventFire(chat.firstChild.firstChild, 'mousedown');

    },2200);
    // const loopFewTimes = () => {
    //     setTimeout(() => {
    //         console.log("titeElement working...");
    //         const titleMain = getElement("chat_title",chat);
    //         if (titleMain !== undefined && titleMain != title){
    //             console.log('not yet');
    //             return loopFewTimes();
    //         }

    //     }, 300);
    // }

    // loopFewTimes();
    setTimeout(()=>sendMessage(chat,message),3000);
    setTimeout(()=>callback(chat,message),3000);
    
}

const eventFire = (el, etype) => {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(evt);
}

function getElement(id, parent){
    if (!elementConfig[id]){
        return false;
    }
    var elem = !parent ? document.body : parent;

    var elementArr = elementConfig[id];
    elementArr.forEach(function(pos) {
        if (!elem.childNodes[pos]){
            return false;
        }

         elem = elem.childNodes[pos];

    });
    return elem;
}

const start = (_chats,message) => {
    // get next unread chat
    const chats = _chats || getUnreadChats();
    const chat = chats;
    
    var processLastMsgOnChat = false;
    var lastMsg;
    
    if (!lastMessageOnChat){
        if (false === (lastMessageOnChat = getLastMsg())){
            lastMessageOnChat = true; //to prevent the first "if" to go true everytime
        } else {
            lastMsg = lastMessageOnChat;

        }
    } else if (lastMessageOnChat != getLastMsg() && getLastMsg() !== false && !didYouSendLastMsg()){
        lastMessageOnChat = lastMsg = getLastMsg();

        processLastMsgOnChat = true;
    }
    
    if (!processLastMsgOnChat && (chats.length == 0 || !chat)) {
        console.log(new Date(), 'nothing to do now... (1)', chats.length, chat);
        return goAgain(start, 3);
    }

    // get infos
    if (!processLastMsgOnChat){
        title = getElement("chat_title",_chats);
        lastMsg = message;
        // lastMsg = (getElement("chat_lastmsg", chat) || { innerText: '' }).title.replace(/[\u2000-\u206F]/g, ""); //.last-msg returns null when some user is typing a message to me

    } else {
        title = getElement("selected_title").title;
    }
    // avoid sending duplicate messaegs
    // if (ignoreLastMsg[title] && (ignoreLastMsg[title]) == lastMsg) {
    //     console.log(new Date(), 'nothing to do now... (2)', title, lastMsg);
    //     return goAgain(() => { start(chats, cnt + 1) }, 0.1);
    // }

    // what to answer back?
    let sendText;
    if (lastMsg.toUpperCase().indexOf('@HELP') > -1){
        sendText = `
            Cool ${title}! Some commands that you can send me:

            1. *@TIME*
            2. *@JOKE*`
    }

    if (lastMsg.toUpperCase().indexOf('@TIME') > -1){
        sendText = `
            Don't you have a clock, dude?

            *${new Date()}*`;
    }

    if (lastMsg.toUpperCase().indexOf('@JOKE') > -1){
        sendText = jokeList[rand(jokeList.length - 1)];
    }
    
    // that's sad, there's not to send back...
    if (!sendText) {
        ignoreLastMsg[title] = lastMsg;
        console.log(new Date(), 'new message ignored -> ', title, lastMsg);
        // return goAgain(() => { start(chats, cnt + 1) }, 0.1);
        return null;
    }

    console.log(new Date(), 'new message to process, uhull -> ', title, lastMsg);

    // select chat and send message
    var cnt = 0;
    if (!processLastMsgOnChat){
        // selectChat(chat, () => {
            sendMessage(chat, sendText.trim(), () => {
                goAgain(() => { start(chats, cnt + 1) }, 1);
            });
        // })
    } else {
        sendMessage(null, sendText.trim(), () => {
            goAgain(() => { start(chats, cnt + 1) }, 1);
        });
    }
}

function WAmainfunction(){
		    var chatlist = document.querySelector("._3soxC._2aY82");
            if(chatlist){            
                var persondata = chatlist.childNodes;
                //   using observer 
                const configure = { attributes: true, childList: true, subtree: true };
                var observer = new MutationObserver(function(mutations){
                  var hasUpdates = false; 
                  for (var index = 0; index < mutations.length; index++) {
                       var mutation = mutations[index]; 
                       if (mutation.type === 'childList' && mutation.addedNodes.length) {
                            hasUpdates = true; 
                            break; 
                         } 
                     }
                     if(hasUpdates){
                        persondata.forEach(function(data){
                            var personsTitles = data.querySelector('._1hI5g._1XH7x._1VzZY');
                                var txtValue = personsTitles.textContent || personsTitles.innerText;
                                var count = 0;
                                var d = personOnView.length;
                                for(var k=0;k<d;k++){
                                    if(personOnView[k]===txtValue){
                                        count = count + 1;
                                    }

                                }
                                if(count==0){
                                    personOnView.push(txtValue);

                                }
                                
                        });
                     }
                
                    });
                    observer.observe(chatlist, configure);                                                                                         

            }
            var ViewOnPerson = [];
            var chatlist = document.querySelector("._3soxC._2aY82");
            if(chatlist){
                var persondata = chatlist.childNodes;
                persondata.forEach(function(data){
                    var personsTitles = data.querySelector('._1hI5g._1XH7x._1VzZY');
                    var txtValue = personsTitles.textContent || personsTitles.innerText;
                    ViewOnPerson.push(txtValue);
                    
                });
            }
         
   var difference = personOnView.filter(x => ViewOnPerson.indexOf(x) === -1);
   window.difference = difference;

   $("#pane-side").on("scroll", function() {
    var scrollHeight = document.querySelector("._3soxC._2aY82").offsetHeight;
    var scrollPosition = document.getElementById('pane-side').offsetHeight + $("pane-side").scrollTop();
	if ((scrollHeight - scrollPosition) / scrollHeight !== 0) {
        // when scroll to bottom of the page
	}
});
}
