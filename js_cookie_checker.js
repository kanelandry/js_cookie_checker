//-get the content of a cookie
function getCookie(name) 
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 

//-delete a cookie by setting its expiration date in the past
function delete_cookie(name) 
{
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//-check the existence of the system cookies
function do_syscookies_exist()
{
	//-1st, check if browser is cookie-enabled 
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;
	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
	{ 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	//-then, check the system cookie(s) if browser is cookie-enabled
	var redirectStatus = true;
	if(cookieEnabled == true)
	{
	   var myCookie = getCookie("systemcookie1");
	   var myCookie2 = getCookie("systemcookie2");
	   if (myCookie == null || myCookie2 == null) {
          ; // keep redirectStatus to true if one of the syscookie(s) doesn't exist;
	   }
	   else redirectStatus = false;
	}
	
	//-finally, take proper action related to the existence of the system cookie(s)
	if(redirectStatus == true) {
		delete_cookie("systemcookie1"); delete_cookie("systemcookie2"); //-To cover the case where only one was inexistant
		window.location.replace("login.php?error=2&next="+encodeURIComponent(document.URL)+""); 
	}
}

//-set the javascript checker to run every 3s
setInterval(do_syscookies_exist,3000);
