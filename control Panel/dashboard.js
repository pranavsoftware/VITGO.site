const _0x54441e=_0x5af9;function _0x5af9(_0x295f43,_0x31e9ce){const _0x13f7c5=_0x13f7();return _0x5af9=function(_0x5af993,_0x2d2e33){_0x5af993=_0x5af993-0x84;let _0x75c128=_0x13f7c5[_0x5af993];return _0x75c128;},_0x5af9(_0x295f43,_0x31e9ce);}(function(_0x535fa0,_0x48a934){const _0x4b2fc4=_0x5af9,_0x5725f6=_0x535fa0();while(!![]){try{const _0x5d8d42=parseInt(_0x4b2fc4(0xc3))/0x1+parseInt(_0x4b2fc4(0x93))/0x2+parseInt(_0x4b2fc4(0xa2))/0x3*(parseInt(_0x4b2fc4(0x87))/0x4)+-parseInt(_0x4b2fc4(0x97))/0x5*(parseInt(_0x4b2fc4(0x88))/0x6)+parseInt(_0x4b2fc4(0xbc))/0x7*(-parseInt(_0x4b2fc4(0x9a))/0x8)+parseInt(_0x4b2fc4(0xa9))/0x9*(parseInt(_0x4b2fc4(0xbb))/0xa)+-parseInt(_0x4b2fc4(0xb0))/0xb*(parseInt(_0x4b2fc4(0xb3))/0xc);if(_0x5d8d42===_0x48a934)break;else _0x5725f6['push'](_0x5725f6['shift']());}catch(_0x127e9a){_0x5725f6['push'](_0x5725f6['shift']());}}}(_0x13f7,0xd9c10));function _0x13f7(){const _0x4f6df8=['visibility','uid','2945310cWtcAJ','242207WyXnGI','div','../control\x20Panel/login.html','add','faceScan','akshay.mattoo2023@vitstudent.ac.in','email','319803CyeWzm','appendChild','createdAt','includes','then','username','click','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22edit-btn\x22\x20data-id=\x22','users','spinner','hidden','textContent','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h4>Posted\x20by:\x20','</em></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>','edit-btn','Are\x20you\x20sure\x20you\x20want\x20to\x20delete\x20this\x20notice?','notice','split','data','621065707054','editedAt','submit','12068XjhBlj','1704tWUEfV','arye.chauhan2023@vitstudent.ac.in','raybanpranav.mahesh2023@vitstudent.ac.in','delete-btn','target','style','createElement','</em>','AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ','addEventListener','contains','3430616hfZXfB','You\x20do\x20not\x20have\x20access\x20to\x20this\x20page.','profile-pic','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','28970sHlVSv','classList','</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','392aijbpL','innerHTML','location','Edited\x20on:\x20<em>','</h4>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p><strong>Notice:</strong>\x20','padmapriya.r@vit.ac.in','notices','\x22>Edit</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22delete-btn\x22\x20data-id=\x22','1071xbIKhD','easycab-71fcf.appspot.com','name','data-id','exists','\x22>Delete</button>','notice-text','45mfokxF','Edit\x20your\x20notice:','</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>Posted\x20on:\x20<em>','forEach','easycab-71fcf','Error\x20adding\x20notice:\x20','toLocaleString','3355KZgtcV','easycab-71fcf.firebaseapp.com','seconds','13848DYMYqi','default-profile.png','error','getElementById','visible','getAttribute'];_0x13f7=function(){return _0x4f6df8;};return _0x13f7();}import{initializeApp}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';import{getFirestore,collection,addDoc,getDocs,updateDoc,doc,getDoc,serverTimestamp,orderBy,deleteDoc}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';import{getAuth,onAuthStateChanged,signOut}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';const firebaseConfig={'apiKey':_0x54441e(0x90),'authDomain':_0x54441e(0xb1),'projectId':_0x54441e(0xad),'storageBucket':_0x54441e(0xa3),'messagingSenderId':_0x54441e(0x84),'appId':'1:621065707054:web:8b47875a751d361f2e09bf'},app=initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(),allowedEmails=[_0x54441e(0x9f),_0x54441e(0x8a),_0x54441e(0x89),_0x54441e(0xc1),'atharva.mahesh2022@vitstudent.ac.in'],noticeForm=document[_0x54441e(0xb6)]('notice-form'),spinner=document[_0x54441e(0xb6)](_0x54441e(0xcc));onAuthStateChanged(auth,async _0x23f28c=>{const _0x355ece=_0x54441e;if(_0x23f28c){if(!allowedEmails[_0x355ece(0xc6)](_0x23f28c['email'])){alert(_0x355ece(0x94)),window['location']='../control\x20Panel/login.html';return;}const _0x15ad0a=doc(db,_0x355ece(0xcb),_0x23f28c[_0x355ece(0xba)]),_0x510984=await getDoc(_0x15ad0a);if(_0x510984[_0x355ece(0xa6)]()){const _0x419166=_0x510984[_0x355ece(0xd5)]();document[_0x355ece(0xb6)](_0x355ece(0xa4))[_0x355ece(0xce)]=_0x419166[_0x355ece(0xa4)]||_0x23f28c[_0x355ece(0xc2)][_0x355ece(0xd4)]('@')[0x0],document[_0x355ece(0xb6)](_0x355ece(0x95))['src']=_0x419166[_0x355ece(0xc0)]||'default-profile.png';}else console[_0x355ece(0xb5)]('No\x20such\x20user\x20document!'),document['getElementById'](_0x355ece(0x95))['src']=_0x355ece(0xb4);}else window[_0x355ece(0x9c)]=_0x355ece(0xbe);}),document[_0x54441e(0xb6)]('logout-btn')[_0x54441e(0x91)](_0x54441e(0xc9),()=>{const _0x4e0554=_0x54441e;signOut(auth)[_0x4e0554(0xc7)](()=>{const _0x10d46a=_0x4e0554;window[_0x10d46a(0x9c)]=_0x10d46a(0xbe);});}),noticeForm[_0x54441e(0x91)](_0x54441e(0x86),async _0x391c9d=>{const _0x117d57=_0x54441e;_0x391c9d['preventDefault']();const _0xedebd6=document['getElementById'](_0x117d57(0xa8))['value'],_0x4cebd4=document['getElementById'](_0x117d57(0xa4))[_0x117d57(0xce)];try{await addDoc(collection(db,_0x117d57(0xa0)),{'text':_0xedebd6,'username':_0x4cebd4,'createdAt':serverTimestamp(),'editedAt':null}),noticeForm['reset'](),loadNotices();}catch(_0x2c9e7d){console['error'](_0x117d57(0xae),_0x2c9e7d);}});async function loadNotices(){const _0x483ed6=_0x54441e,_0x181150=document[_0x483ed6(0xb6)](_0x483ed6(0xa0));_0x181150[_0x483ed6(0x9b)]='',spinner['style']['visibility']=_0x483ed6(0xb7);try{const _0x21d4bd=await getDocs(collection(db,_0x483ed6(0xa0)),orderBy(_0x483ed6(0xc5),'desc'));_0x21d4bd[_0x483ed6(0xac)](_0x518a41=>{const _0x2326ec=_0x483ed6,_0x185428=_0x518a41['data'](),_0x29506f=document[_0x2326ec(0x8e)](_0x2326ec(0xbd));_0x29506f[_0x2326ec(0x98)][_0x2326ec(0xbf)](_0x2326ec(0xd3)),_0x29506f[_0x2326ec(0x9b)]=_0x2326ec(0xcf)+_0x185428[_0x2326ec(0xc8)]+_0x2326ec(0x9e)+_0x185428['text']+_0x2326ec(0xab)+(_0x185428['createdAt']?new Date(_0x185428[_0x2326ec(0xc5)]['seconds']*0x3e8)['toLocaleString']():'Unknown')+_0x2326ec(0xd0)+(_0x185428[_0x2326ec(0x85)]?_0x2326ec(0x9d)+new Date(_0x185428['editedAt'][_0x2326ec(0xb2)]*0x3e8)[_0x2326ec(0xaf)]()+_0x2326ec(0x8f):'')+_0x2326ec(0x99)+(_0x185428[_0x2326ec(0xc8)]===document['getElementById'](_0x2326ec(0xa4))[_0x2326ec(0xce)]?_0x2326ec(0xca)+_0x518a41['id']+_0x2326ec(0xa1)+_0x518a41['id']+_0x2326ec(0xa7):'')+_0x2326ec(0x96),_0x181150[_0x2326ec(0xc4)](_0x29506f);});}catch(_0x38bb07){console[_0x483ed6(0xb5)]('Error\x20loading\x20notices:\x20',_0x38bb07);}finally{spinner[_0x483ed6(0x8d)][_0x483ed6(0xb9)]=_0x483ed6(0xcd);}}document[_0x54441e(0x91)](_0x54441e(0xc9),async _0x27c291=>{const _0x7544f8=_0x54441e;if(_0x27c291[_0x7544f8(0x8c)]['classList'][_0x7544f8(0x92)](_0x7544f8(0xd1))){const _0x53d364=_0x27c291['target'][_0x7544f8(0xb8)]('data-id'),_0x100099=prompt(_0x7544f8(0xaa),'');_0x100099&&(await updateDoc(doc(db,'notices',_0x53d364),{'text':_0x100099,'editedAt':serverTimestamp()}),loadNotices());}if(_0x27c291[_0x7544f8(0x8c)]['classList'][_0x7544f8(0x92)](_0x7544f8(0x8b))){const _0x40b73d=_0x27c291[_0x7544f8(0x8c)][_0x7544f8(0xb8)](_0x7544f8(0xa5)),_0x2a99cd=confirm(_0x7544f8(0xd2));_0x2a99cd&&(await deleteDoc(doc(db,'notices',_0x40b73d)),loadNotices());}}),loadNotices();
