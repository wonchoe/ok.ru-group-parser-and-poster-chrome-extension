var lasturl = '';
var cnt = 0;
var winid = 1;

function checkTab()
{
chrome.windows.getAll(null, function(et){
	winid = et[0].id;
chrome.tabs.getAllInWindow(winid, function(tabs) {
      for(i=0;i<tabs.length;i++)
		   {
		   url = tabs[i].url;
		   if (url.indexOf('ok.ru')>0)
			{
			if (lasturl!=url)
				{
				cnt = 0;
				
				lasturl=url;				
				}
			cnt = cnt + 1;
			if (cnt==30)
				{
				cnt=0;
				//chrome.tabs.update(tabs[i].id, {url: 'https://www.ok.ru/dk?st.cmd=anonymMain&st.redirect=%2Fonline&amp;st.lgn=on&amp;st.redirect=%2Fonline&amp;st.fflo=on'});
				}
			}		   
		   }
});
	
});

	setTimeout(checkTab,2000);
}
checkTab();

