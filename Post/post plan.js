const _0x15d683=_0x5e96;(function(_0x2572c3,_0x389adf){const _0x19353e=_0x5e96,_0x24a807=_0x2572c3();while(!![]){try{const _0x41aba0=parseInt(_0x19353e(0x231))/0x1+-parseInt(_0x19353e(0x1a4))/0x2+parseInt(_0x19353e(0x211))/0x3*(parseInt(_0x19353e(0x19e))/0x4)+-parseInt(_0x19353e(0x1d6))/0x5+parseInt(_0x19353e(0x1d8))/0x6+-parseInt(_0x19353e(0x259))/0x7+-parseInt(_0x19353e(0x26e))/0x8;if(_0x41aba0===_0x389adf)break;else _0x24a807['push'](_0x24a807['shift']());}catch(_0x5e772c){_0x24a807['push'](_0x24a807['shift']());}}}(_0x2648,0xce87c));import{initializeApp}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';import{getFirestore,doc,setDoc}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';import{getAuth,onAuthStateChanged}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';const firebaseConfig={'apiKey':_0x15d683(0x266),'authDomain':_0x15d683(0x25a),'projectId':_0x15d683(0x1a2),'storageBucket':_0x15d683(0x26b),'messagingSenderId':_0x15d683(0x1e2),'appId':_0x15d683(0x1ae)},app=initializeApp(firebaseConfig),firestore=getFirestore(app),auth=getAuth(app);let username='';onAuthStateChanged(auth,_0x5b4542=>{const _0x58891e=_0x15d683;_0x5b4542?username=_0x5b4542[_0x58891e(0x1fe)]||_0x5b4542[_0x58891e(0x27e)]['split']('@')[0x0]:window[_0x58891e(0x1a3)]['href']='../face/index.html';});function isValidDateTime(_0x5b9769,_0x22a53e){const _0x4b1e18=new Date(_0x5b9769+'T'+_0x22a53e),_0x21c2e8=new Date();return _0x4b1e18>=_0x21c2e8;}document[_0x15d683(0x24e)](_0x15d683(0x220))['addEventListener'](_0x15d683(0x251),async _0x11d2d8=>{const _0xf8e210=_0x15d683;_0x11d2d8[_0xf8e210(0x23c)]();const _0x3d88d4=document[_0xf8e210(0x24e)](_0xf8e210(0x22b))[_0xf8e210(0x24b)],_0x37c64a=document[_0xf8e210(0x24e)](_0xf8e210(0x216))['value'],_0xd3691a=document[_0xf8e210(0x24e)](_0xf8e210(0x225))[_0xf8e210(0x24b)],_0x19dcfb=document[_0xf8e210(0x24e)](_0xf8e210(0x1bc))[_0xf8e210(0x24b)],_0x9e3939=document[_0xf8e210(0x24e)]('toState')[_0xf8e210(0x24b)],_0x3f9066=document[_0xf8e210(0x24e)](_0xf8e210(0x20c))[_0xf8e210(0x24b)],_0x420ea3=document[_0xf8e210(0x24e)](_0xf8e210(0x21c))[_0xf8e210(0x24b)],_0x107ecb=document[_0xf8e210(0x24e)]('date')[_0xf8e210(0x24b)],_0x4af997=document[_0xf8e210(0x24e)](_0xf8e210(0x249))[_0xf8e210(0x24b)],_0x54509d=document[_0xf8e210(0x24e)](_0xf8e210(0x26f))[_0xf8e210(0x24b)];if(!isValidDateTime(_0x107ecb,_0x4af997)){alert('Please\x20select\x20a\x20valid\x20date\x20and\x20time\x20(present\x20or\x20future).');return;}if(username)try{const _0x4ac34f=Date['now']()['toString'](),_0x115484=doc(firestore,'posts',_0x4ac34f);await setDoc(_0x115484,{'username':username,'university':_0x3d88d4,'fromState':_0x37c64a,'fromCity':_0xd3691a,'fromPlace':_0x19dcfb,'toState':_0x9e3939,'toCity':_0x3f9066,'toPlace':_0x420ea3,'dateTime':_0x107ecb+'\x20'+_0x4af997,'message':_0x54509d}),showPopup(),setTimeout(()=>{const _0x5c4a83=_0xf8e210;window[_0x5c4a83(0x1a3)][_0x5c4a83(0x1fb)]=_0x5c4a83(0x1ee);},0x7d0);}catch(_0x48b1c6){console['error'](_0xf8e210(0x260),_0x48b1c6);}else alert(_0xf8e210(0x1b2)),window[_0xf8e210(0x1a3)][_0xf8e210(0x1fb)]=_0xf8e210(0x230);});function showPopup(){const _0x5ed23c=_0x15d683,_0x48ff85=document['getElementById'](_0x5ed23c(0x232));_0x48ff85[_0x5ed23c(0x1d0)][_0x5ed23c(0x278)](_0x5ed23c(0x202)),document[_0x5ed23c(0x24e)](_0x5ed23c(0x1c8))['addEventListener']('click',()=>{const _0x4a9b65=_0x5ed23c;_0x48ff85[_0x4a9b65(0x1d0)][_0x4a9b65(0x1a7)]('show');});}function _0x2648(){const _0x581722=['Patiala','Pune','Gateway\x20of\x20India','Kochi','<option\x20value=\x22\x22>Select\x20Place</option>','Shimla','Rock\x20Garden','preventDefault','Karaikal','VOC\x20Park\x20and\x20Zoo','Pobitora\x20Wildlife\x20Sanctuary','Mandore\x20Garden','Ramoji\x20Film\x20City','Haridwar','Taj-ul-Masjid','Rourkela','Jantar\x20Mantar','Margao','Pondicherry','Mahe','time','Ajmer\x20Sharif\x20Dargah','value','Dhanbad','Lake\x20Pichola','getElementById','Kanpur','Kamakhya\x20Temple','submit','Varanasi','Muzaffarpur','Gaya','Lingaraj\x20Temple','Diu','Amirthi\x20Zoological\x20Park','Charminar','1623517sShayV','easycab-71fcf.firebaseapp.com','Asansol','createElement','City\x20Palace','Sinhagad\x20Fort','Rumi\x20Darwaza','Error\x20posting\x20plan:','Red\x20Fort','Ahmedabad','change','Rajkot','Allahabad','AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ','Gangtok','toggle','Aguada\x20Fort','Shillong','easycab-71fcf.appspot.com','ISKCON\x20Temple','Coimbatore','10444496yGRZNJ','message','Jabalpur','Vellore\x20Town\x20Railway\x20Station','Victoria\x20Memorial','Shaniwar\x20Wada','Kapaleeshwarar\x20Temple','Cuttack','Panipat','Chota\x20Imambara','add','Umaid\x20Bhawan\x20Palace','Nandankanan\x20Zoo','Jalakandeswarar\x20Temple','Kullu','Dhyanalinga\x20Temple','email','Mehtab\x20Bagh','Kanaka\x20Durga\x20Temple','appendChild','6121636OdfYNh','Yanam','Gandhinagar','Panaji','easycab-71fcf','location','241194Psrlcn','Bodhi\x20Tree','Warangal','remove','Sanchi\x20Stupa','Agartala','Agra\x20Fort','Puri','Delhi','Ludhiana','1:621065707054:web:8b47875a751d361f2e09bf','Araku\x20Valley','Tawang','Ambedkar\x20Memorial\x20Park','User\x20is\x20not\x20authenticated.\x20Redirecting\x20to\x20login\x20page.','Sukhna\x20Lake','Fateh\x20Sagar\x20Lake','Vellore','Pinjore\x20Gardens','Perur\x20Pateeswarar\x20Temple','option','Rohtak','Ziro','Assam\x20State\x20Zoo','fromPlace','India\x20Gate','Rose\x20Garden','Imphal','Cubbon\x20Park','Bhubaneswar','Sabarmati\x20Ashram','Tezpur','Dibrugarh','Aizawl','Manikarnika\x20Ghat','Dharamshala','closePopup','Siddhivinayak\x20Temple','Mumbai','addEventListener','Kota','Vasco\x20da\x20Gama','<option\x20value=\x22\x22>Select\x20City</option>','Bangalore\x20Palace','classList','Hubli','innerHTML','Dimapur','Taragarh\x20Fort','Aurangabad','5942775WXuFwG','Bhavani\x20Island','3451110BtoQrw','St.\x20Philomena\x27s\x20Church','Nainital','Faridabad','Salem','Bara\x20Imambara','Madurai','Humayun\x27s\x20Tomb','Siliguri','Baga\x20Beach','621065707054','click','Sripuram\x20Golden\x20Temple','Vadodara','Ujjain','Allahabad\x20Fort','Bhojtal\x20Lake','INS\x20Kursura\x20Submarine\x20Museum','Durgapur','Fort\x20St.\x20George','Partition\x20Museum','Pataleshwar\x20Cave\x20Temple','./Dashboard/dashboard.html','Raja\x20Rani\x20Temple','Mangalore','Fatehpur\x20Sikri','Udayagiri\x20and\x20Khandagiri\x20Caves','Kashi\x20Vishwanath\x20Temple','Chennai','Lucknow','Kavaratti','Bengaluru','Bhagalpur','Hyderabad','Mehrangarh\x20Fort','href','Ana\x20Sagar\x20Lake','Kailasagiri','displayName','Katpadi\x20Junction\x20Railway\x20Station','Raipur','Kozhikode','show','Vishnupad\x20Temple','Qutub\x20Minar','Patna','Hisar','.nav-menu','Sidi\x20Saiyyed\x20Mosque','Guntur','Triveni\x20Sangam','Amritsar','toCity','Jodhpur','Kakinada','Mysore\x20Palace','Karimnagar','3jeIZVW','Port\x20Blair','Ajmer','Santhome\x20Basilica','toState','fromState','Gurgaon','Howrah\x20Bridge','Kolkata','Umananda\x20Temple','Manali','toPlace','Taj\x20Mahal','Gwalior','Dakshineswar\x20Kali\x20Temple','postPlanForm','Jallianwala\x20Bagh','Marudhamalai\x20Temple','Srinagar','Akshardham\x20Temple','fromCity','Prakasam\x20Barrage','Lalbagh\x20Botanical\x20Garden','Thiruvananthapuram','querySelector','Mahabodhi\x20Temple','university','forEach','Itanagar','Banaras\x20Hindu\x20University','Wagah\x20Border','../face/index.html','1586999qoqskf','popup','Hawa\x20Mahal','Kohima'];_0x2648=function(){return _0x581722;};return _0x2648();}function toggleMenu(){const _0xbf7979=_0x15d683,_0x2a6284=document[_0xbf7979(0x229)](_0xbf7979(0x207));_0x2a6284['classList'][_0xbf7979(0x268)]('show');}document[_0x15d683(0x229)]('.menu-toggle')[_0x15d683(0x1cb)](_0x15d683(0x1e3),toggleMenu);const citiesByState={'Andaman\x20and\x20Nicobar\x20Islands':[_0x15d683(0x212)],'Andhra\x20Pradesh':[_0x15d683(0x209),_0x15d683(0x20e),'Tirupati','Vijayawada','Visakhapatnam'],'Arunachal\x20Pradesh':[_0x15d683(0x22d),_0x15d683(0x1b0),_0x15d683(0x1ba)],'Assam':[_0x15d683(0x1c4),'Guwahati','Jorhat','Silchar',_0x15d683(0x1c3)],'Bihar':[_0x15d683(0x1f8),_0x15d683(0x254),_0x15d683(0x253),_0x15d683(0x205)],'Chandigarh':['Chandigarh'],'Chhattisgarh':['Bilaspur','Durg',_0x15d683(0x200)],'Dadra\x20and\x20Nagar\x20Haveli\x20and\x20Daman\x20and\x20Diu':['Daman',_0x15d683(0x256),'Silvassa'],'Delhi':[_0x15d683(0x1ac)],'Goa':[_0x15d683(0x246),_0x15d683(0x1a1),_0x15d683(0x1cd)],'Gujarat':[_0x15d683(0x262),_0x15d683(0x1a0),_0x15d683(0x264),'Surat',_0x15d683(0x1e5)],'Haryana':[_0x15d683(0x1db),_0x15d683(0x217),_0x15d683(0x206),_0x15d683(0x276),_0x15d683(0x1b9)],'Himachal\x20Pradesh':[_0x15d683(0x1c7),_0x15d683(0x27c),_0x15d683(0x21b),_0x15d683(0x23a)],'Jammu\x20and\x20Kashmir':['Jammu','Leh',_0x15d683(0x223)],'Jharkhand':['Bokaro',_0x15d683(0x24c),'Jamshedpur','Ranchi'],'Karnataka':[_0x15d683(0x1f7),_0x15d683(0x1d1),_0x15d683(0x1f0),'Mysore'],'Kerala':['Alappuzha',_0x15d683(0x238),_0x15d683(0x201),_0x15d683(0x228)],'Ladakh':['Kargil','Leh'],'Lakshadweep':[_0x15d683(0x1f6)],'Madhya\x20Pradesh':['Bhopal',_0x15d683(0x21e),'Indore',_0x15d683(0x270),_0x15d683(0x1e6)],'Maharashtra':[_0x15d683(0x1d5),_0x15d683(0x1ca),'Nagpur','Nashik',_0x15d683(0x236)],'Manipur':[_0x15d683(0x1bf)],'Meghalaya':[_0x15d683(0x26a)],'Mizoram':[_0x15d683(0x1c5)],'Nagaland':[_0x15d683(0x1d3),_0x15d683(0x234)],'Odisha':[_0x15d683(0x1c1),_0x15d683(0x275),_0x15d683(0x1ab),_0x15d683(0x244)],'Puducherry':[_0x15d683(0x23d),_0x15d683(0x248),_0x15d683(0x247),_0x15d683(0x19f)],'Punjab':[_0x15d683(0x20b),'Jalandhar',_0x15d683(0x1ad),_0x15d683(0x235)],'Rajasthan':[_0x15d683(0x213),'Jaipur',_0x15d683(0x20d),_0x15d683(0x1cc),'Udaipur'],'Sikkim':[_0x15d683(0x267)],'Tamil\x20Nadu':[_0x15d683(0x1f4),_0x15d683(0x26d),_0x15d683(0x1de),_0x15d683(0x1dc),'Tiruchirappalli',_0x15d683(0x1b5)],'Telangana':[_0x15d683(0x1f9),_0x15d683(0x210),'Nizamabad',_0x15d683(0x1a6)],'Tripura':[_0x15d683(0x1a9)],'Uttar\x20Pradesh':['Agra',_0x15d683(0x265),_0x15d683(0x24f),_0x15d683(0x1f5),_0x15d683(0x252)],'Uttarakhand':['Dehradun',_0x15d683(0x242),_0x15d683(0x1da),'Rishikesh'],'West\x20Bengal':[_0x15d683(0x25b),_0x15d683(0x1ea),_0x15d683(0x219),_0x15d683(0x1e0)]},placesByCity={'Agra':[_0x15d683(0x21d),_0x15d683(0x1aa),_0x15d683(0x1f1),_0x15d683(0x27f)],'Ahmedabad':[_0x15d683(0x1c2),_0x15d683(0x224),'Kankaria\x20Lake',_0x15d683(0x208)],'Ajmer':[_0x15d683(0x24a),_0x15d683(0x1fc),'Adhai\x20Din\x20Ka\x20Jhonpra',_0x15d683(0x1d4)],'Allahabad\x20(Prayagraj)':[_0x15d683(0x20a),'Anand\x20Bhavan',_0x15d683(0x1e7),'Khusro\x20Bagh'],'Amritsar':['Golden\x20Temple',_0x15d683(0x221),_0x15d683(0x22f),_0x15d683(0x1ec)],'Bangalore':[_0x15d683(0x1cf),_0x15d683(0x227),_0x15d683(0x1c0),_0x15d683(0x26c)],'Bhopal':[_0x15d683(0x1e8),_0x15d683(0x1a8),'Van\x20Vihar\x20National\x20Park',_0x15d683(0x243)],'Bhubaneswar':[_0x15d683(0x255),_0x15d683(0x1f2),_0x15d683(0x1ef),_0x15d683(0x27a),'Dhauli\x20Hill'],'Chandigarh':[_0x15d683(0x23b),_0x15d683(0x1b3),_0x15d683(0x1be),_0x15d683(0x1b6)],'Chennai':['Marina\x20Beach',_0x15d683(0x274),_0x15d683(0x1eb),_0x15d683(0x214)],'Coimbatore':[_0x15d683(0x222),_0x15d683(0x27d),_0x15d683(0x23e),_0x15d683(0x1b7)],'Delhi':[_0x15d683(0x261),_0x15d683(0x1bd),_0x15d683(0x204),'Lotus\x20Temple',_0x15d683(0x1df)],'Gaya':[_0x15d683(0x22a),_0x15d683(0x1a5),_0x15d683(0x203),'Dungeshwari\x20Cave\x20Temples'],'Goa':[_0x15d683(0x1e1),'Basilica\x20of\x20Bom\x20Jesus','Dudhsagar\x20Waterfalls',_0x15d683(0x269)],'Guwahati':[_0x15d683(0x250),_0x15d683(0x21a),_0x15d683(0x1bb),_0x15d683(0x23f)],'Hyderabad':[_0x15d683(0x258),'Golconda\x20Fort',_0x15d683(0x241),'Hussain\x20Sagar\x20Lake'],'Jaipur':[_0x15d683(0x233),'Amber\x20Fort',_0x15d683(0x25d),_0x15d683(0x245)],'Jodhpur':[_0x15d683(0x1fa),_0x15d683(0x279),'Jaswant\x20Thada',_0x15d683(0x240)],'Kolkata':[_0x15d683(0x272),_0x15d683(0x218),_0x15d683(0x21f),'Indian\x20Museum'],'Lucknow':[_0x15d683(0x1dd),_0x15d683(0x25f),_0x15d683(0x1b1),_0x15d683(0x277)],'Mumbai':[_0x15d683(0x237),'Marine\x20Drive','Elephanta\x20Caves',_0x15d683(0x1c9),'Chhatrapati\x20Shivaji\x20Maharaj\x20Terminus'],'Mysore':[_0x15d683(0x20f),'Brindavan\x20Gardens','Chamundi\x20Hill',_0x15d683(0x1d9)],'Pune':[_0x15d683(0x273),'Aga\x20Khan\x20Palace',_0x15d683(0x25e),_0x15d683(0x1ed)],'Udaipur':[_0x15d683(0x25d),_0x15d683(0x24d),'Jag\x20Mandir',_0x15d683(0x1b4)],'Varanasi':[_0x15d683(0x1f3),'Dashashwamedh\x20Ghat',_0x15d683(0x1c6),_0x15d683(0x22e)],'Vijayawada':[_0x15d683(0x19c),'Undavalli\x20Caves',_0x15d683(0x226),_0x15d683(0x1d7)],'Vellore':['VIT\x20Campus',_0x15d683(0x271),_0x15d683(0x1ff),'Vellore\x20Fort',_0x15d683(0x27b),_0x15d683(0x1e4),_0x15d683(0x257)],'Visakhapatnam':['Ramakrishna\x20Beach',_0x15d683(0x1fd),_0x15d683(0x1e9),_0x15d683(0x1af)]};function updateCities(_0x8994ea,_0x4a8d79){const _0x3cabc7=_0x15d683,_0x1f017a=document['getElementById'](_0x8994ea)['value'],_0x266657=document['getElementById'](_0x4a8d79);_0x266657[_0x3cabc7(0x1d2)]=_0x3cabc7(0x1ce),_0x1f017a&&citiesByState[_0x1f017a]&&citiesByState[_0x1f017a]['forEach'](_0x1faa50=>{const _0x4bbb1c=_0x3cabc7,_0x53a8ac=document[_0x4bbb1c(0x25c)]('option');_0x53a8ac['value']=_0x1faa50,_0x53a8ac['textContent']=_0x1faa50,_0x266657[_0x4bbb1c(0x19d)](_0x53a8ac);});}function _0x5e96(_0x472443,_0x382220){const _0x264851=_0x2648();return _0x5e96=function(_0x5e9655,_0x270f7a){_0x5e9655=_0x5e9655-0x19c;let _0x36cfb1=_0x264851[_0x5e9655];return _0x36cfb1;},_0x5e96(_0x472443,_0x382220);}function updatePlaces(_0x5f1915,_0x24d411){const _0x2562e0=_0x15d683,_0x3bf75b=document[_0x2562e0(0x24e)](_0x5f1915)[_0x2562e0(0x24b)],_0xa9055=document[_0x2562e0(0x24e)](_0x24d411);_0xa9055[_0x2562e0(0x1d2)]=_0x2562e0(0x239),_0x3bf75b&&placesByCity[_0x3bf75b]&&placesByCity[_0x3bf75b][_0x2562e0(0x22c)](_0x50aaf6=>{const _0x48972f=_0x2562e0,_0x3d36ed=document[_0x48972f(0x25c)](_0x48972f(0x1b8));_0x3d36ed[_0x48972f(0x24b)]=_0x50aaf6,_0x3d36ed['textContent']=_0x50aaf6,_0xa9055[_0x48972f(0x19d)](_0x3d36ed);});}document[_0x15d683(0x24e)](_0x15d683(0x216))[_0x15d683(0x1cb)]('change',()=>{const _0x516d5c=_0x15d683;updateCities(_0x516d5c(0x216),'fromCity');}),document[_0x15d683(0x24e)](_0x15d683(0x225))['addEventListener'](_0x15d683(0x263),()=>{const _0xb9e58f=_0x15d683;updatePlaces(_0xb9e58f(0x225),_0xb9e58f(0x1bc));}),document[_0x15d683(0x24e)](_0x15d683(0x215))[_0x15d683(0x1cb)]('change',()=>{const _0x5db3a0=_0x15d683;updateCities('toState',_0x5db3a0(0x20c));}),document['getElementById'](_0x15d683(0x20c))[_0x15d683(0x1cb)](_0x15d683(0x263),()=>{const _0xcf4714=_0x15d683;updatePlaces(_0xcf4714(0x20c),_0xcf4714(0x21c));});
