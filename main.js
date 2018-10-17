function copyToClipboard(text) {
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};

var curg = '0';

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, ms);
  });
}

var dt = new Date();
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function setUpValue(value,searchfor)
{
	var dropdownlistbox = document.getElementsByName(searchfor)[0];
	for(var x=0;x < dropdownlistbox.length -1 ; x++)
	{
	   if(value == dropdownlistbox.options[x].text)
		  dropdownlistbox.selectedIndex = x;
	}	
}

groups = ["51820134465687","53917018816714","58630800867367","53591917920413","54670220066822","52109369606296","50793687875751","51980934447283","51886439465139","57166429880369","52491341660312","53033884188737"];
groupsGIF = ["53917018816714","53591917920413","51886439465139","53856501563634","54337335263246","52276318765213","52534149316739","52003556950093"];
groupsMAIN = ["51886439465139","53856501563634","54337335263246","52276318765213","52534149316739","52003556950093","51820134465687","53917018816714","58630800867367","53591917920413","54670220066822","52109369606296","50793687875751","51980934447283","57166429880369","52491341660312","53033884188737"];



async function checkGroups()
{
	
	groupid = localStorage.getItem('currentGroup');
	if(!localStorage.getItem(groupid)) localStorage.setItem(groupid,'0');
	if(!localStorage.getItem(groupid)) localStorage.setItem(groupid,'0');
	
	r = document.getElementsByClassName('feed-w');
	for(i=0;i<r.length;i++)

	if ((r[i].getElementsByClassName('feed_pin').length<1) && (r[i].getElementsByClassName('poll_lst').length<1) && (r[i].getElementsByClassName('textWrap').length>0))
	{
	s = r[i].innerHTML;
	if (s.indexOf('Промо')<1)
		{
		btn = r[i].getElementsByTagName('button');
		wrapText = '';
		if (r[i].getElementsByClassName('textWrap')[0]) wrapText = r[i].getElementsByClassName('textWrap')[0].innerText;
		console.log(wrapText);
		localStorage.setItem('currentText',wrapText);
		if(localStorage.getItem(groupid))
			if (localStorage.getItem(groupid)!=btn[0].dataset.id1)
				{
				if (r[i].getElementsByClassName('gif-add_item invisiblocked h-mod').length<1)
					{
					r[i].getElementsByClassName('media-text_a')[0].click();
					await wait(5000);
					if (document.getElementById('mtLayerMain')) 
						{
						mainid = document.getElementById('mtLayerMain');
						if (mainid.getElementsByClassName('textWrap')[0])
							{
							//sta = mainid.getElementsByClassName('textWrap')[0].innerText;
							wrapText = mainid.getElementsByClassName('textWrap')[0].innerText;
							localStorage.setItem('currentText',wrapText);
							}
						}
					
					img = document.getElementsByClassName('media-photos_img');
					imglist = [];
					for(j=0;j<img.length;j++)
					{
					imglist.push(img[j].src);
					}
					imglistJ = JSON.stringify(imglist);
					localStorage.setItem('imglist',imglistJ);
					localStorage.setItem(groupid,btn[0].dataset.id1);
					localStorage.setItem('step','4');
					if (localStorage.getItem('switch')==0) location.href="https://ok.ru/planetworld/topics";
					if (localStorage.getItem('switch')==1) location.href="https://ok.ru/gifsy/topics";
					if (localStorage.getItem('switch')==2) location.href="https://ok.ru/interesnogo/topics";
					break;
					}
				else
					{
					localStorage.setItem(groupid,btn[0].dataset.id1);
					if(r[i].getElementsByClassName('gif-add_item invisiblocked h-mod')[0]) r[i].getElementsByClassName('gif-add_item invisiblocked h-mod')[0].click();
					localStorage.setItem('step','3');
					if (localStorage.getItem('switch')==0) location.href="https://ok.ru/planetworld/topics";
					if (localStorage.getItem('switch')==1) location.href="https://ok.ru/gifsy/topics";
					if (localStorage.getItem('switch')==2) location.href="https://ok.ru/interesnogo/topics";
					break;
					}
				}
			else 
				{
				localStorage.setItem('step','1');
				if (localStorage.getItem('groups').length<3)
					{
					if (localStorage.getItem('switch')==0) localStorage.setItem('switch','1')
					else if (localStorage.getItem('switch')==1) localStorage.setItem('switch','2')
						else if (localStorage.getItem('switch')==2) localStorage.setItem('switch','0');		
					}
				await wait(30000);
				console.log('post published');
				location.href = 'https://ok.ru';
				}
		break;
		}
	}	
}

function redirectToGroups()
{
	if ((!localStorage.getItem('groups')) || (localStorage.getItem('groups').length<3)) 
		{
		if (localStorage.getItem('switch')==0) localStorage.setItem('groups',JSON.stringify(groups));
		if (localStorage.getItem('switch')==1) localStorage.setItem('groups',JSON.stringify(groupsGIF));
		if (localStorage.getItem('switch')==2) localStorage.setItem('groups',JSON.stringify(groupsMAIN));		
		
		}
	groupsL = JSON.parse(localStorage.getItem('groups'));
	groupid = groupsL[0];
	groupsL.splice(0,1);
	if (localStorage.getItem('switch')==0) localStorage.setItem('currentGroup','P'+groupid);
	if (localStorage.getItem('switch')==1) localStorage.setItem('currentGroup','G'+groupid);
	if (localStorage.getItem('switch')==2) localStorage.setItem('currentGroup','M'+groupid);
	localStorage.setItem('groups',JSON.stringify(groupsL));
	localStorage.setItem('step','2');
	
	location.href = 'https://ok.ru/group/'+groupid;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == 'getLocalStorage') {
    localStorage.setItem('step','1');

    sendResponse({data: objectString});
  } else {
    sendResponse({}); // snub them.
  }
});

async function addtogroupPIC()
{
	await wait(3000);
	if (document.getElementsByClassName('input_placeholder').length>0) document.getElementsByClassName('input_placeholder')[0].click();
	await wait(3000);
	document.getElementsByClassName('posting_s mr-2x')[0].children[0].children[1].click();	
	await wait(3000);


	if ((document.getElementsByClassName('lstp-t')[1]) && (parseInt(document.getElementsByClassName('lstp-t')[1].textContent,10)<399))
		{	
		var dt = new Date();
		if (!localStorage.getItem(curg+'lastDate')) 
			{
			dt.setHours(dt.getHours() + 1);
			dt.setMinutes(0);
			localStorage.setItem(curg+'lastDate',dt.getTime());
			}
		var fd = new Date(parseInt(localStorage.getItem(curg+'lastDate'), 10));
		fd.setHours(fd.getHours() + 1);		
		//$("input[name='st.layer.date']").trigger('select');
		h = addZero(fd.getHours());
		m = addZero(fd.getMinutes());
		day = addZero(fd.getDate());
		month = addZero(fd.getMonth()+1);
		year = addZero(fd.getFullYear());
		fulldate = day+'.'+month+'.'+year;	

		document.getElementsByName('st.layer.date')[0].value = fulldate;
		setUpValue(h,'st.layer.hours');
		setUpValue('00','st.layer.mins');	
		$("input[name='st.layer.date']").trigger('change');
		localStorage.setItem(curg+'lastDate',fd.getTime());
		}
	
	
	if (document.getElementsByClassName('modal_buttons_no button-pro __sec h-mod')[0]) document.getElementsByClassName('modal_buttons_no button-pro __sec h-mod')[0].click();
	imglist = JSON.parse(localStorage.getItem('imglist'));
	for(i=0;i<imglist.length;i++)
		{
		copyToClipboard(imglist[i]);
		await wait(4000);
		document.getElementsByClassName('ok-posting-handler')[0].focus();
		document.execCommand('paste');
		await wait(4000);
		}
	document.getElementsByClassName('ok-posting-handler')[0].innerHTML = '<div>'+localStorage.getItem('currentText')+'</div>';		
	document.getElementsByClassName('posting_submit button-pro')[0].click();	
	localStorage.setItem('step','1');
	console.log('waiting 1 minute');
	if (localStorage.getItem('groups').length<3)
		{
					if (localStorage.getItem('switch')==0) localStorage.setItem('switch','1')
					else if (localStorage.getItem('switch')==1) localStorage.setItem('switch','2')
						else if (localStorage.getItem('switch')==2) localStorage.setItem('switch','0');		
		}	
	await wait(60000);
	location.href="https://ok.ru";
}


async function addtogroup()
{
	await wait(3000);
	if (document.getElementsByClassName('input_placeholder').length>0) document.getElementsByClassName('input_placeholder')[0].click();
	await wait(3000);
	document.getElementsByClassName('posting_s mr-2x')[0].children[0].children[1].click();	
	await wait(3000);

	if ((document.getElementsByClassName('lstp-t')[1]) && (parseInt(document.getElementsByClassName('lstp-t')[1].textContent,10)<399))
		{	
		var dt = new Date();
		if (!localStorage.getItem(curg+'lastDate')) 
			{
			dt.setHours(dt.getHours() + 1);
			dt.setMinutes(0);
			localStorage.setItem(curg+'lastDate',dt.getTime());
			}
		var fd = new Date(parseInt(localStorage.getItem(curg+'lastDate'), 10));
		fd.setHours(fd.getHours() + 1);		
		//$("input[name='st.layer.date']").trigger('select');
		h = addZero(fd.getHours());
		m = addZero(fd.getMinutes());
		day = addZero(fd.getDate());
		month = addZero(fd.getMonth()+1);
		year = addZero(fd.getFullYear());
		fulldate = day+'.'+month+'.'+year;	

		document.getElementsByName('st.layer.date')[0].value = fulldate;
		setUpValue(h,'st.layer.hours');
		setUpValue('00','st.layer.mins');	
		$("input[name='st.layer.date']").trigger('change');
		localStorage.setItem(curg+'lastDate',fd.getTime());
		}
	
	await wait(2000);
	if (document.getElementsByClassName('modal_buttons_no button-pro __sec h-mod')[0]) document.getElementsByClassName('modal_buttons_no button-pro __sec h-mod')[0].click();
	await wait(2000);
	document.getElementsByClassName('posting_ac_i h-mod')[0].click();
	await wait(2000);
	$(".filter_i.curPointer")[1].click();
	await wait(2000);
	document.getElementsByClassName('photo-crop_cnt selectable-card')[0].click();
	await wait(2000);
	document.getElementsByClassName('button-pro attachButton')[0].click();
	await wait(2000);
	document.getElementsByClassName('ok-posting-handler')[0].innerHTML = '<div>'+localStorage.getItem('currentText')+'</div>';
	await wait(2000);
	document.getElementsByClassName('posting_submit button-pro')[0].click();	
	localStorage.setItem('step','5');
	if (localStorage.getItem('groups').length<3)
		{
					if (localStorage.getItem('switch')==0) localStorage.setItem('switch','1')
					else if (localStorage.getItem('switch')==1) localStorage.setItem('switch','2')
						else if (localStorage.getItem('switch')==2) localStorage.setItem('switch','0');		
		}		
	await wait(2000);
	nexturl = document.getElementsByClassName('toolbar_nav_a toolbar_nav_a__friends')[0].href;
	nexturl = nexturl.replace('friends','photos');
	location.href = nexturl;
}

async function deleteGIF()
	{
	await wait(10000);
	if (document.getElementsByClassName('photo-card_cnt')[0])
		{
		document.getElementsByClassName('photo-card_cnt')[0].click();
		await wait(5000);
		document.getElementById('hook_Block_DeleteRestorePhoto').children[0].click();
		}
	console.log('waiting 1 minute');
	localStorage.setItem('step','1');
	if (localStorage.getItem('groups').length<3)
		{
					if (localStorage.getItem('switch')==0) localStorage.setItem('switch','1')
					else if (localStorage.getItem('switch')==1) localStorage.setItem('switch','2')
						else if (localStorage.getItem('switch')==2) localStorage.setItem('switch','0');		
		}
	await wait(60000);
	location.href="https://ok.ru";
	}


document.addEventListener('DOMContentLoaded', function(){
	window.addEventListener('load',function(){
		lh = 'test'+location.href;
		if (lh.indexOf('ok.ru')>0)
			{
			if (!localStorage.getItem('switch')) localStorage.setItem('switch','0');		
			curg = localStorage.getItem('switch');
			if (!localStorage.getItem('step')) localStorage.setItem('step','1');
			if (localStorage.getItem('step')==1) redirectToGroups();	
			if (localStorage.getItem('step')==2) checkGroups();
			if (localStorage.getItem('step')==3) addtogroup();
			if (localStorage.getItem('step')==4) addtogroupPIC();
			if (localStorage.getItem('step')==5) deleteGIF();
			}
	});
}, false);