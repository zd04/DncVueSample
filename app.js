
	init()

	//处理返回数据
	window.onpopstate = function(){
		init()
	}


	//(function(){
		if(document.querySelector('.menus')){
			document.querySelector('.menus').onclick = function(e){
				var r = e.target.getAttribute('data-r')
				if(r){  //如果没点到li上 page 是null
					//getAndRender(r)
					ifreamRender(r);
				}
			}
		}
	//})();

	function ifreamRender(r){
		try{  
		   var iframe = document.createElement('<iframe name="ifr"></iframe>');  
		  }catch(e){ 
		    var iframe = document.createElement('iframe');  
		    iframe.name = 'ifr';  
		 }

		iframe.src = r;  
		document.body.appendChild(iframe);
	}



	//初始化，根据 url 中 page 的值定位到对应页面，如果没设置展示第1页
	function init(){
		var serach = location.search.replace(/^\?/,'').split('=');
		if(serach[0] === 'r'){
			// initGetAndRender(serach[1])
			ifreamRender(serach[1]);
		}else{
			initGetAndRender('')
		}
	}


	function getPages(r,callback){
		fetch(r).then(function(res){
			callback(res)
		})
	}

	function renderPages(data){

		console.log(data);
		document.querySelector('#content').innerHTML  = data;
	}


	// 获取数据，并且渲染页面
	function getAndRender(r){
		
		if(!!r){
			getPages(r,function(ret){
				ret.text().then(function(text){
					renderPages(text);
				})
				setUrl(r);
			})
		}else{
			renderPages("");
		}
	}

	//初始化从url解析加载数据时不需要设置url了，否则返回会出错
	function initGetAndRender(r){
		if(!!r){
			getPages(r,function(ret){
				ret.text().then(function(text){
					renderPages(text);
				})				
			})
		}else{
			renderPages("");
		}	
	}


function setUrl(tourl){
	var url = location.pathname + '?r=' +  tourl
	history.pushState({url: url, title: document.title}, document.title, url)
}


        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', {scope: '/'})
              .then(function (registration) {
                  // Registration was successful
                  console.log(
                      'ServiceWorker registration successful with scope: ',
                      registration.scope
                  );
              })
              .catch(function (err) {
                  // registration failed :(
                  console.log('ServiceWorker registration failed: ', err);
              });
        }