// MyInterval=setInterval(myFunction,4000);
var responsedata = [];
vGlobalTabId = 0;
vWaitSeconds = 0;
var foundURL = [];
var allTabIds = [];
var currentTabId;
var value1,value2,value3;
var currentTab,oherTab;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
if (request.from == "content") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(request.subject);
        console.log(tabs);
        if(request.subject=="Link not open"){
            setTimeout(()=>{
                chrome.tabs.sendMessage(tabs[0].id, {msg:"check_loginOrNot"});
                console.log("checking for login....");
            },8000);

        }
        if(request.subject=='Please login in whatsapp web'){
            console.log("loginalert");
            console.log(tabs);
            document.getElementById('error_guide').textContent = "click in the icon";
            document.getElementById('error_message').textContent = request.subject;

        }
    });
}

value1 = request.tElements;
});

function GetWhatsAppTAB(){
    if(vGlobalTabId ===0){
        chrome.tabs.getSelected(null, function(tab){
            currentTabId = tab.id;
            window.currentTabId = window.currentTabId;
            if(tab.url==="https://web.whatsapp.com/"){
                console.log("i got wahtsapp tab");
                currentTab = "success";
                window.currentTab = window.currentTab;
            }
            else{
                console.log("current tab is not whatsapp tab....");
                chrome.tabs.query({},function(tabs){
                    console.log(tabs);
                    var i,j,l = tabs.length;
                    for(j=0;j<l;j++){
                        allTabIds.push(tabs[j].id);
                    }
                    for(i=0;i<l;i++){
                        if(tabs[i].url=="https://web.whatsapp.com/"){
                           vGlobalTabId = tabs[i].id;
                           console.log("web.whatsapp.com in other tab");
                           oherTab = "success";
                           window.oherTab = window.oherTab
                        }
                    }
                });
            }
        });
    }
}


$(document).ready(function(){
    myFunction();
});
function myFunction(){
    console.log(responsedata);
    document.getElementById("button1").addEventListener("click", abc);
}


function abc(){
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
        var username = document.querySelector(".UserName").value;
        var password = document.querySelector(".password").value;
        
        var data = {
            username : username,
            password : password
        }
        function passwordCheckCallBack(){
            console.log(tab);
            if(document.getElementById("incorrect_password").textContent){
                return null; 
             }            
        }

        PostAPI(data,tab,passwordCheckCallBack);
        chrome.tabs.sendMessage(tab.id, {msg:responsedata});
        console.log("after");
        setTimeout(()=>{
            if(document.getElementById("incorrect_password").textContent){
               return null; 
            }
            if(responsedata.length>0){
                chrome.tabs.sendMessage(tab.id, {msg:responsedata});
    
            }
        },4000);
        
        GetWhatsAppTAB();
        setTimeout(()=>{
            if(currentTab=="success"){
                console.log("current tab success..");
            }
            if(oherTab=="success"){
                console.log("other tab success..");
                document.getElementById("incorrect_password").textContent = "Please select web.whatsapp Tab"; 
            }
        },1000);

            setTimeout(()=>{
                if(oherTab=="success"){
                    return null;
                }
                if(oherTab!="success"&&currentTab!="success"){
                    console.log("openNewTab ..");
                    chrome.tabs.sendMessage(tab.id, {msg:"openNewTab"});
                    return null;
                }
                
            },2000);

      });
    });
}

function PostAPI(data,tab,cb){
    var xmlhttp = new XMLHttpRequest();
    let urlEncodedData = "",
          urlEncodedDataPairs = [],
          name;
    for( name in data ) {
            urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
    }
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );
    
    var url = "http://localhost/log/login.php";
    xmlhttp.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200) 
    {                  
        console.log('Response Text:' + xmlhttp.responseText);
        try 
         {     
           let response = JSON.parse(xmlhttp.responseText); 
             //here fetch all sitt
           if(response){
               if(responsedata.length === 0){
                responsedata.push(response);
                console.log(responsedata);
                window.responsedata = window.responsedata;
                document.getElementById('login_success').textContent = "Login Successfull...";
                cb(tab);

               }
               
           }
           $("#error").text(response);
         }catch(error)
                     {
                         document.getElementById('incorrect_password').textContent = "Invalid username and password";
                         console.log("Error : "+error.message + " in " + xmlhttp.responseText);
                     };
        };
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    
    xmlhttp.send(urlEncodedData);   
}

