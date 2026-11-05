(function(){
"use strict";
function pill(t,c){return '<span class="pill p-'+c+'">'+t+'</span>';}
function kv(rows){return '<dl class="kv">'+rows.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+r[1]+'</dd>';}).join('')+'</dl>';}
function card(t,badge,body){return '<div class="pcard"><div class="pc-h"><b>'+t+'</b>'+(badge||'')+'</div>'+body+'</div>';}
function seats(t,m){return '<span class="seats"><span class="seat-bar"><i style="width:'+Math.round(t/m*100)+'%"></i></span>'+t+' из '+m+' <em>блогер не видит</em></span>';}
function crumb(t){return '<div class="crumb">'+t+'</div>';}
function hist(a){return '<ol class="hist">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ol>';}
function vid(n,d){return {m:'video',n:n,d:d};}
function img(n,d){return {m:'img',n:n,d:d};}

/* ---------- сценарий «Товар» ---------- */
var OFFER_G='<div class="offer-img og"><span>Лаванда</span><small>уходовая косметика</small></div><b>Новое предложение</b><br>Набор уходовой косметики «Лаванда».<br>Формат: Reels + 3 сторис<br>Срок: 10 дней после получения<br>Город: Москва';
var OFFER_R='<div class="offer-img or"><span>Пенка</span><small>кафе · Патриаршие</small></div><b>Новое предложение</b><br>Ужин на двоих в кафе «Пенка».<br>Формат: Reels или пост + сторис с геометкой<br>Срок: 5 дней после визита';

function gCamp(s){return {tab:'Предложения',h:crumb('Предложения › Лаванда')+card('Лаванда · уходовая косметика',pill('Активно','ok'),kv([['Тип','Получение товара'],['Этап рассылки','2 из 3: VIP, открыт в 13:00'],['Места',seats(s.seats,10)],['Получили',s.recv+' блогеров'],['Заявок',String(s.apps)],['Согласование','Обязательно']]))};}
function gApp(s,st,c,extra){return {tab:'Заявки',h:crumb('Заявки › Лаванда')+'<div class="tbl-scroll"><table class="mini"><thead><tr><th>№</th><th>Блогер</th><th>Тариф</th><th>Статус</th></tr></thead><tbody><tr class="hl"><td>A-1042</td><td>@anna.beauty</td><td>VIP</td><td>'+pill(st,c)+'</td></tr><tr><td>A-1039</td><td>@olga_mama</td><td>VIP</td><td>'+pill('Одобрена','ok')+'</td></tr><tr><td>A-1036</td><td>@nika.daily</td><td>VIP</td><td>'+pill('Отклонена','bad')+'</td></tr></tbody></table></div>'+card('Анкета A-1042 · @anna.beauty','',kv([['Тариф, город','VIP, Москва'],['Instagram','@anna.beauty · 48,2 тыс.'],['Адрес','Москва, ул. Летняя, 5, кв. 12'],['Согласие с условиями','✓ да'],['История','6 завершённых, просрочек 0'],['Места',seats(s.seats,10)]].concat(extra||[])))};}
function gCol(s,st,c,extra){return {tab:'Публикации',h:crumb('Публикации › Сотрудничество C-311')+card('Лаванда × @anna.beauty',pill(st,c),kv([['Тип','Получение товара'],['Трек-номер',s.track||'—'],['Крайний срок',s.dl],['Плановая дата',s.pub||'—']].concat(extra||[])))};}

var G={
 g0:{st:0,bot:[OFFER_G],kb:[['Подробнее','g0d'],['Подать заявку','g1']],pn:gCamp,hint:'Вы блогер @anna.beauty, тариф VIP. Предложение пришло в Telegram. Нажмите кнопку под ним.'},
 g0d:{st:0,bot:['<b>Техническое задание</b><br>• Reels 30–60 секунд с распаковкой<br>• 3 сторис с отметкой @lavanda<br>• Публикация в течение 10 дней после получения<br>• Черновик Reels — на согласование менеджеру'],kb:[['Подать заявку','g1',1]],pn:gCamp,hint:'Подробности открываются в том же чате. Сколько всего мест, блогер не видит.'},
 g1:{st:1,set:{apps:10},bot:['Проверила ✅ тариф VIP, город Москва, просрочек нет.','<b>Анкета · шаг 1 из 3</b><br>Ваш Instagram: <b>@anna.beauty</b>, 48,2 тыс. подписчиков. Всё верно?'],kb:[['Да, верно','g2'],['Изменить','g2']],pn:gCamp,hint:'Бот проверил, можно ли подать заявку, и сам подставил сохранённые данные. Блогер только подтверждает.'},
 g2:{st:1,bot:['<b>Шаг 2 из 3</b><br>Адрес доставки: <b>Москва, ул. Летняя, 5, кв. 12</b>. Актуален?'],kb:[['Да, актуален','g3'],['Изменить','g3']],pn:gCamp,hint:'Адрес меняется, поэтому блогер подтверждает его для каждой заявки.'},
 g3:{st:1,bot:['<b>Шаг 3 из 3</b><br>Подтвердите условия: Reels + 3 сторис, публикация в течение 10 дней после получения, черновик на согласование.'],kb:[['Согласна, отправить','g4',1]],pn:gCamp,hint:'Перед отправкой обязательные поля проверены.'},
 g4:{st:2,bot:['Заявка <b>№A-1042</b> отправлена.<br>Статус: на рассмотрении. Ответ придёт сюда.'],pn:function(s){return gApp(s,'На рассмотрении','new');},pa:[['Одобрить','g5','ok'],['Запросить уточнение','g4q',''],['Отклонить','gx','bad']],hint:'Теперь вы менеджер. Заявка с анкетой уже в панели. Нажмите «Одобрить» или попробуйте «Запросить уточнение».'},
 g4q:{st:2,bot:['Менеджер просит уточнить:<br><i>«Пришлите, пожалуйста, скриншот охватов сторис за неделю»</i>'],kb:[['📎 Отправить скриншот','g4r',1]],pn:function(s){return gApp(s,'Требуются уточнения','wait');},hint:'Вопрос менеджера пришёл блогеру. Ответьте за блогера.'},
 g4r:{st:2,me:img('stats_week.png','скриншот охватов'),bot:['Спасибо, передала менеджеру.'],pn:function(s){return gApp(s,'На рассмотрении','new',[['Уточнение','📎 stats_week.png · охваты сторис 9 800']]);},pa:[['Одобрить','g5','ok'],['Отклонить','gx','bad']],hint:'Скриншот попал прямо в карточку заявки. Теперь одобрите.'},
 gx:{st:2,end:1,bot:['В этот раз заявка не одобрена. Новые предложения будут приходить сюда.'],pn:function(s){return gApp(s,'Отклонена','bad');},hint:'Это путь отказа. Место и лимиты не тратятся. Нажмите «Начать заново», чтобы пройти путь до конца.'},
 g5:{st:3,set:{seats:8},bot:['<b>Заявка одобрена 🎉</b><br>Вы участвуете в «Лаванде». Как только набор отправят, пришлю трек-номер.'],pn:function(s){return gCol(s,'Ожидается отправка товара','wait',[['Внести трек-номер','<span class="input">RU123456789 · СДЭК</span>'],['Места кампании',seats(s.seats,10)]]);},pa:[['Сохранить трек-номер','g6','ok']],hint:'Место занято: 8 из 10. Если два менеджера одобрят одновременно, система всё равно не даст превысить лимит. Внесите трек-номер.'},
 g6:{st:3,set:{track:'RU123456789'},bot:['Набор отправлен 📦<br>Трек-номер: <b>RU123456789</b>. Когда получите, нажмите кнопку.'],kb:[['Посылка получена','g7',1]],pn:function(s){return gCol(s,'Товар отправлен','new');},hint:'Снова вы блогер. Посылка пришла.'},
 g7:{st:4,bot:[function(s){return 'Отлично! Когда опубликуете?<br>Крайний срок — <b>'+s.dl+'</b>.';}],kb:[['28.10','g8'],['30.10','g8'],['02.11','g8'],['Нужен перенос','g7p']],pn:function(s){return gCol(s,'Товар получен','ok');},hint:'Блогер выбирает дату сам, но только в пределах срока. Можно попробовать «Нужен перенос».'},
 g7p:{st:4,bot:['Запрос на перенос отправлен менеджеру.<br>Причина: «уезжаю до 03.11». Пока срок прежний — <b>02.11</b>.'],pn:function(s){return gCol(s,'Товар получен','ok',[['Запрос на перенос',pill('02.11 → 06.11','wait')+' «уезжаю до 03.11»']]);},pa:[['Перенести на 06.11','g7a','ok'],['Отказать','g7n','bad']],hint:'Сам блогер срок не меняет, решает менеджер.'},
 g7a:{st:4,set:{dl:'06.11'},bot:['Менеджер одобрил перенос. Новый крайний срок — <b>06.11</b>.<br>Когда опубликуете?'],kb:[['04.11','g8'],['06.11','g8']],pn:function(s){return gCol(s,'Товар получен','ok',[['История сроков',hist(['02.11 → 06.11 · одобрила Мария · «уезжает до 03.11»'])]]);},hint:'Срок и напоминания пересчитаны, история изменений сохранена.'},
 g7n:{st:4,bot:['Перенос не одобрен, срок остаётся <b>02.11</b>. Когда опубликуете?'],kb:[['30.10','g8'],['02.11','g8']],pn:function(s){return gCol(s,'Товар получен','ok');},hint:'Отказ в переносе тоже записан в историю.'},
 g8:{st:5,pubFromLabel:1,bot:[function(s){return 'Записала дату публикации: <b>'+s.pub+'</b>.<br>Сначала пришлите черновик Reels на согласование.';}],kb:[['☁️ Отправить ссылку на черновик','g9',1]],pn:function(s){return gCol(s,'Ожидается контент','wait',[['Напоминания','за 3 дня, за 1 день и в день срока'],['Согласование','обязательно']]);},hint:'Система сама поставила напоминания. Видео тяжёлое, поэтому блогер присылает ссылку на облако. Отправьте её за блогера.'},
 g9:{st:5,me:'☁️ disk.yandex.ru/i/lavanda_v1',bot:['Черновик <b>v1</b> у менеджера. Ответ пришлю сюда.'],pn:function(){return {tab:'Согласования',h:crumb('Согласования › Лаванда × @anna.beauty')+card('Контент на согласовании',pill('v1','wait'),'<div class="vers"><div class="ver"><div class="thumb">▶</div>v1 · ссылка на облако</div></div><div class="note">Комментарий для правок: «Добавьте отметку @lavanda в первые 3 секунды»</div>')};},pa:[['Нужны правки','g10','warn'],['Согласовать','g11','ok']],hint:'Вы менеджер. Попробуйте вернуть черновик на правки.'},
 g10:{st:5,bot:['Нужны правки ✏️<br><i>«Добавьте отметку @lavanda в первые 3 секунды»</i>'],kb:[['☁️ Отправить исправленный','g10b',1]],pn:function(){return {tab:'Согласования',h:crumb('Согласования › Лаванда × @anna.beauty')+card('Требуются исправления',pill('ждём v2','bad'),'<div class="vers"><div class="ver old"><div class="thumb">▶</div>v1 · правки отправлены</div></div>')};},hint:'Блогер получил комментарий. Отправьте новую версию.'},
 g10b:{st:5,me:'☁️ disk.yandex.ru/i/lavanda_v2',bot:['Версия <b>v2</b> у менеджера.'],pn:function(){return {tab:'Согласования',h:crumb('Согласования › Лаванда × @anna.beauty')+card('Контент на согласовании',pill('v2','wait'),'<div class="vers"><div class="ver"><div class="thumb">▶</div>v2 · новая</div><div class="ver old"><div class="thumb">▶</div>v1 · «отметка в первые 3 с»</div></div>')};},pa:[['Согласовать','g11','ok']],hint:'Обе версии и комментарий сохранены. Согласуйте.'},
 g11:{st:6,bot:['<b>Контент согласован ✅</b><br>Можно публиковать. После публикации пришлите ссылку.','~ через 2 дня',function(s){return '🔔 Напоминание: публикация <b>'+s.pub+'</b>. Не забудьте прислать ссылку.';}],kb:[['🔗 Отправить ссылку','g12',1]],pn:function(s){return gCol(s,'Ожидается публикация','new',[['Контент','согласован, v2']]);},hint:'Бот сам напоминает о дате. Блогер публикует и присылает ссылку.'},
 g12:{st:7,me:'instagram.com/reel/Cx7Lav…',bot:['Ссылка получена. Отчёт у менеджера.'],pn:function(s){return gCol(s,'Отчёт на проверке','wait',[['Ссылка','instagram.com/reel/Cx7Lav…'],['Опубликовано',s.pub]]);},pa:[['Принять отчёт','g13','ok'],['Вернуть на исправление','g12r','bad']],hint:'Менеджер открывает ссылку и проверяет публикацию.'},
 g12r:{st:7,bot:['Менеджер просит дополнить отчёт:<br><i>«Пришлите скриншот статистики Reels через сутки»</i>'],kb:[['📎 Отправить скриншот','g12s',1]],pn:function(s){return gCol(s,'Требуются исправления отчёта','bad');},hint:'Отчёт вернулся блогеру с комментарием.'},
 g12s:{st:7,me:img('reels_stats.png','статистика Reels'),bot:['Скриншот передан менеджеру.'],pn:function(s){return gCol(s,'Отчёт на проверке','wait',[['Ссылка','instagram.com/reel/Cx7Lav…'],['Статистика','📎 reels_stats.png']]);},pa:[['Принять отчёт','g13','ok']],hint:'Теперь примите отчёт.'},
 g13:{st:8,end:1,bot:['<b>Сотрудничество «Лаванда» завершено</b> 🙌<br>Спасибо! Новые предложения будут приходить сюда.'],pn:function(s){return gCol(s,'Завершено','ok',[['История',hist(['19.10 заявка одобрена','20.10 товар отправлен','23.10 товар получен','25.10 черновик v1, правки','26.10 v2 согласован',s.pub+' опубликовано','отчёт принят'])]]);},hint:'Путь пройден. Все даты сохранены для отчёта бренду. Попробуйте второй сценарий — ресторан.'}
};

/* ---------- сценарий «Ресторан» ---------- */
function rCamp(s){return {tab:'Предложения',h:crumb('Предложения › Кафе «Пенка»')+card('Кафе «Пенка» · ужин на двоих',pill('Активно','ok'),kv([['Тип','Посещение заведения'],['Этап рассылки','1 из 3: Любимки'],['Места',seats(s.seats,8)],['Лист ожидания','включён · 2 человека'],['Согласование','не нужно']]))};}
function rApp(s,st,c){return {tab:'Заявки',h:crumb('Заявки › Кафе «Пенка»')+card('Анкета A-1057 · @kate_food',pill(st,c),kv([['Тариф, город','Любимки, Москва'],['Когда удобно',s.when||'—'],['Гостей',s.guests||'—'],['Записи в заведения','в октябре: '+s.lim+' из 2'],['Места',seats(s.seats,8)]]))+'<div class="note">Лимит записей тратится только при одобрении. Подача заявки его не трогает.</div>'};}
function rCol(s,st,c,extra){return {tab:'Публикации',h:crumb('Публикации › Сотрудничество C-318')+card('Кафе «Пенка» × @kate_food',pill(st,c),kv([['Тип','Посещение заведения'],['Визит','24.10, 19:00'],['Крайний срок',s.dl],['Плановая дата',s.pub||'—'],['Записи в октябре',s.lim+' из 2']].concat(extra||[])))};}
var R={
 r0:{st:0,bot:[OFFER_R],kb:[['Подробнее','r0d'],['Подать заявку','r1']],pn:rCamp,hint:'Вы блогер @kate_food, тариф Любимки. У тарифа лимит: 2 записи в заведения в месяц.'},
 r0d:{st:0,bot:['<b>Условия</b><br>• Ужин на двоих за счёт заведения<br>• Reels или пост + сторис с геометкой<br>• Публикация в течение 5 дней после визита<br>• Согласование не нужно'],kb:[['Подать заявку','r1',1]],pn:rCamp,hint:'Для этого предложения согласование контента выключено.'},
 r1:{st:1,bot:['Проверила ✅ тариф Любимки, Москва, просрочек нет.<br>Записи в заведения в октябре: <b>1 из 2</b>.','<b>Анкета · шаг 1 из 2</b><br>Когда вам удобно прийти?'],kb:[['Будни вечером','r2'],['Выходные днём','r2']],pn:rCamp,hint:'Если бы лимит был исчерпан, бот сразу сказал бы об этом и не принял заявку.'},
 r2:{st:1,whenFromLabel:1,bot:['<b>Шаг 2 из 2</b><br>Сколько будет гостей?'],kb:[['1','r3'],['2','r3']],pn:rCamp,hint:'Анкета короткая, поэтому бот спрашивает прямо в чате.'},
 r3:{st:2,guestsFromLabel:1,bot:['Заявка <b>№A-1057</b> отправлена. Статус: на рассмотрении.'],pn:function(s){return rApp(s,'На рассмотрении','new');},pa:[['Одобрить','r4','ok'],['Отклонить','rx','bad']],hint:'Вы менеджер. Лимит записей пока 1 из 2. Одобрите заявку.'},
 rx:{st:2,end:1,bot:['В этот раз заявка не одобрена. Лимит записей не изменился: <b>1 из 2</b>.'],pn:function(s){return rApp(s,'Отклонена','bad');},hint:'Отказ до одобрения лимит не тратит.'},
 r4:{st:3,set:{lim:2,seats:4},bot:['<b>Заявка одобрена 🎉</b><br>Вас ждут <b>24.10 в 19:00</b>.<br>Записи в октябре: <b>2 из 2</b>.'],kb:[['Запись подтверждена','r5'],['Не смогу прийти','rc']],pn:function(s){return rCol(s,'Ожидается посещение','wait');},hint:'Лимит списался только сейчас, при одобрении. Можно попробовать «Не смогу прийти».'},
 rc:{st:3,end:1,set:{lim:1,seats:3},bot:['Участие отменено. Лимит записей восстановлен: <b>1 из 2</b>.'],pn:function(s){return {tab:'Публикации',h:rCol(s,'Отменено блогером','bad',[['Лимит','списан 19.10 → возвращён 19.10']]).h+card('Лист ожидания',pill('авто','new'),'<div class="tbl-scroll"><table class="mini"><thead><tr><th>#</th><th>Блогер</th><th>Статус</th></tr></thead><tbody><tr class="hl"><td>1</td><td>@lena_eats</td><td>'+pill('Приглашена · ответ до 21:00','wait')+'</td></tr><tr><td>2</td><td>@max.food</td><td>'+pill('В очереди','mut')+'</td></tr></tbody></table></div>')};},hint:'Место вернулось, и система сама предложила его следующему из листа ожидания. Менеджер может поменять порядок вручную.'},
 r5:{st:3,bot:['Ждём вас 24.10 в 19:00. После визита нажмите кнопку.'],kb:[['Посещение состоялось','r6',1]],pn:function(s){return rCol(s,'Запись подтверждена','new');},hint:'Блогер сходил в кафе.'},
 r6:{st:4,bot:['Как прошло? Когда опубликуете?<br>Крайний срок — <b>29.10</b>.'],kb:[['26.10','r7'],['29.10','r7']],pn:function(s){return rCol(s,'Посещение подтверждено','ok');},hint:'Срок считается от даты визита.'},
 r7:{st:6,pubFromLabel:1,bot:[function(s){return 'Записала: <b>'+s.pub+'</b>. Согласование не нужно. Публикуйте и присылайте ссылку.';}],kb:[['🔗 Отправить ссылку','r9'],['⏩ Пропустить срок (демо)','r8']],pn:function(s){return rCol(s,'Ожидается публикация','new',[['Напоминания','за 3 дня, за 1 день и в день срока']]);},hint:'Шаг «Контент» пропущен. Чтобы увидеть, как работает просрочка, нажмите «Пропустить срок».'},
 r8:{st:6,bot:['~ 26.10','🔔 До крайнего срока 3 дня. Не забудьте прислать ссылку.','~ 28.10','🔔 Завтра крайний срок публикации.','~ 30.10','⚠️ <b>Срок публикации прошёл.</b><br>Новые заявки закрыты, пока вы не пришлёте ссылку на обзор «Пенки».'],kb:[['🔗 Отправить ссылку','r9',1]],pn:function(s){return {tab:'Публикации',h:rCol(s,'Ожидается публикация','new',[['Просрочка',pill('Просрочено на 1 день','bad')],['Блогер','новые заявки закрыты автоматически']]).h};},pa:[['Снять ограничение с причиной','r8m','']],hint:'Система сама напомнила, отметила просрочку и закрыла новые заявки. Этап сотрудничества сохранился: «ожидается публикация».'},
 r8m:{st:6,bot:['Менеджер снял ограничение. Пришлите ссылку до <b>01.11</b>.'],kb:[['🔗 Отправить ссылку','r9',1]],pn:function(s){return rCol(s,'Ожидается публикация','new',[['Просрочка',pill('Ограничение снято','mut')],['Журнал','Мария, 30.10: «болела, договорились до 01.11»']]);},hint:'Снять ограничение можно только с причиной, действие попадает в журнал.'},
 r9:{st:7,me:'instagram.com/p/Penka24…',bot:['Ссылка получена. Отчёт у менеджера.'],pn:function(s){return rCol(s,'Отчёт на проверке','wait',[['Ссылка','instagram.com/p/Penka24…']]);},pa:[['Принять отчёт','r10','ok']],hint:'Менеджер проверяет публикацию по ссылке.'},
 r10:{st:8,end:1,bot:['<b>Сотрудничество с «Пенкой» завершено</b> 🙌<br>Новые заявки снова открыты.'],pn:function(s){return rCol(s,'Завершено','ok');},hint:'Сотрудничество ушло из счётчиков неопубликованных и просроченных.'}
};

var SC={g:{nodes:G,start:'g0',who:'Блогер @anna.beauty · VIP',skip:[],s3:'Товар',init:{seats:7,recv:46,apps:9,dl:'02.11'}},
        r:{nodes:R,start:'r0',who:'Блогер @kate_food · Любимки',skip:[5],s3:'Визит',init:{seats:3,lim:1,dl:'29.10'}}};
var STAGES=['Предложение','Заявка','Решение','Получение','Дата','Контент','Публикация','Отчёт','Готово'];

// The presentation has no backend. Each persona keeps its own local session.
var TABS=['Главная','Предложения','Заявки','Согласования','Публикации','Блогеры','Отчёты'];
var chat=document.getElementById('chat'), view=document.getElementById('phone-view');
var pnside=document.getElementById('pnside'),pnmain=document.getElementById('pnmain');
var prog=document.getElementById('progress'),hint=document.getElementById('hint');
var turn=document.getElementById('turn'),who=document.getElementById('who');
var input=document.getElementById('message-input'),menu=document.getElementById('bot-menu');
var sessions={},cur,st,currentNode,panelTab,viewName='chat',viewStack=[];
var activeEdit=null,contactMode=false;
var MENU=[['offers','Доступные предложения','01'],['applications','Мои заявки','02'],
 ['active','Активные сотрудничества','03'],['unpublished','Текущие неопубликованные','04'],
 ['overdue','Просроченные','05'],['todo','Ожидают моего действия','06'],
 ['completed','Завершённые сотрудничества','07'],['profile','Мои данные','08'],
 ['limits','Мой тариф и лимиты','09'],['contact','Связь с менеджером','10']];
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function announce(t){document.getElementById('demo-status').textContent=t;}
function button(label,attrs,cls){return '<button type="button" class="'+(cls||'demo-button')+'" '+attrs+'>'+label+'</button>';}
function title(){return cur==='g'?'Лаванда · уходовая косметика':'Кафе «Пенка» · ужин на двоих';}
function person(){return cur==='g'?'@anna.beauty':'@kate_food';}
function node(){return SC[cur].nodes[currentNode];}
function rejected(){return currentNode==='gx'||currentNode==='rx';}
function cancelled(){return currentNode==='rc';}
function completed(){return node().st===8;}
function hasCooperation(){return node().st>=3&&!cancelled()&&!completed();}
function overdue(){return cur==='r'&&['r8','r8m'].indexOf(currentNode)>-1;}
function status(){
 if(rejected())return 'Заявка отклонена';
 if(cancelled())return 'Участие отменено';
 if(completed())return 'Завершено';
 if(node().st===0)return 'Предложение доступно';
 if(node().st===1)return 'Анкета не закончена';
 var p=node().pn(st), s=document.createElement('div');s.innerHTML=p.h;
 var label=s.querySelector('.pill');return label?label.textContent:STAGES[node().st];
}
function tm(){st.clock=(st.clock||0)+1;return '12:'+String(st.clock%60).padStart(2,'0');}
function scrollChat(){chat.scrollTop=chat.scrollHeight;}
function addBubble(cls,html){
 var d=document.createElement('div');d.className='bb '+cls;
 d.innerHTML=html+'<span class="tm">'+tm()+(cls==='me'?' ✓✓':'')+'</span>';
 chat.appendChild(d);scrollChat();
}
function addMe(me){
 if(typeof me==='string'){addBubble('me',me);return;}
 addBubble('me','<div class="thumb img">'+esc(me.d)+'</div><div class="fname">'+esc(me.n)+' · демоматериал</div>');
}
function renderProgress(){
 var sc=SC[cur],i=node().st;
 prog.innerHTML=STAGES.map(function(n,k){var cls=sc.skip.indexOf(k)>-1?'skip':k<i?'done':k===i?'cur':'';
  return '<div class="pg '+cls+'"><i>'+(k<i?'✓':k+1)+'</i>'+(k===3?sc.s3:n)+'</div>';}).join('');
}
function renderTurn(){
 var n=node();turn.className='turn '+(n.end?'e':n.pa&&n.pa.length?'m':'b');
 turn.textContent=n.end?'Готово':n.pa&&n.pa.length?'Ход менеджера':'Ход блогера';hint.textContent=n.hint;
 if(overdue())hint.textContent+=' Это пример: окончательное правило блокировки ещё уточняется.';
}
function actions(){return node().pa?'<div class="pacts live">'+node().pa.map(function(a){
 return button(esc(a[0]),'data-go="'+a[1]+'"','a-'+(a[2]||'n'));}).join('')+'</div>':'';}
function currentPanel(){
 var h=node().pn(st).h;
 if(currentNode==='g5')h=h.replace('<span class="input">RU123456789 · СДЭК</span>',
  '<label class="sr-only" for="track-input">Трек-номер</label><input id="track-input" class="demo-field" value="'+esc(st.track||'RU123456789')+'" maxlength="60">');
 if(st.address)h=h.replace('Москва, ул. Летняя, 5, кв. 12',esc(st.address));
 if(st.social)h=h.replace('@anna.beauty · 48,2 тыс.',esc(st.social)+' · 48,2 тыс.');
 if(st.draftUrl)h=h.replace(/ссылка на облако/g,esc(st.draftUrl));
 if(st.reportUrl)h=h.replace(/instagram.com\/(reel\/Cx7Lav…|p\/Penka24…)/g,esc(st.reportUrl));
 if(cur==='g'&&st.draftVersion===1)h=h.replace(/согласован, v2/g,'согласован, v1');
 return h+actions();
}
function resumeButton(){return button('К текущему действию →','data-panel-current="1"');}
function summaryCard(){return card(esc(title()),pill(esc(status()),completed()?'ok':'new'),
 kv([['Блогер',person()],['Срок',node().st>=3?st.dl:'после получения / визита'],['Следующий шаг',node().end?'Можно изучить другие разделы':node().pa?'Решение менеджера':'Ответ блогера']])+resumeButton());}
function renderPanel(tab,focus){
 panelTab=tab||node().pn(st).tab;
 pnside.innerHTML='<div class="me"><span class="av m">М</span><div>Мария<small>Менеджер · Москва</small></div></div>'+TABS.map(function(t){
 return button(esc(t),'data-panel="'+t+'"'+(t===panelTab?' aria-current="page"':''),'t'+(t===panelTab?' on':''));}).join('');
 var natural=node().pn(st).tab,h='';
 if(panelTab===natural){h=currentPanel();}
 else if(panelTab==='Главная'){
  h='<h3>Сегодня в агентстве</h3><p class="demo-caption">Сводка по выбранному демонстрационному сценарию</p><div class="demo-metrics">'+
   button('<b>'+((node().st===2&&!rejected())?'1':'0')+'</b> Заявки','data-panel="Заявки"')+
   button('<b>'+(node().st===5?'1':'0')+'</b> Согласования','data-panel="Согласования"')+
   button('<b>'+(overdue()?'1':'0')+'</b> Просрочки','data-panel="Публикации"')+'</div>'+summaryCard();
 }else if(panelTab==='Предложения'){
  h=(cur==='g'?gCamp(st):rCamp(st)).h+resumeButton();
 }else if(panelTab==='Блогеры'){
  h=card(person(),pill('Подключён к боту','ok'),kv([['Город','Москва'],['Тариф',cur==='g'?'VIP':'Любимки'],
   ['Соцсеть',esc(st.social)],['Адрес',esc(st.address)],['Сотрудничество',esc(status())],['Телефон','Не обязателен']]))+resumeButton();
 }else if(panelTab==='Отчёты'){
  h='<h3>Отчёт по кампании</h3>'+summaryCard()+card('Публикация',pill('Демо','mut'),kv([
   ['Ссылка',st.reportUrl?esc(st.reportUrl):node().st>=7?'Пример ссылки из сценария':'Ещё не прислана'],['Плановая дата',st.pub||'Не выбрана'],
   ['Результат',completed()?'Отчёт принят':'Сотрудничество ещё не завершено']]))+
   button('Скачать демотаблицу CSV','data-export="1"')+'<p class="demo-caption">Пример таблицы для Excel. Только вымышленные данные выбранного сценария.</p>';
 }else{
  var labels={'Заявки':'Заявка появится после отправки анкеты блогером.', 'Согласования':cur==='r'?'Для этого предложения согласование контента не требуется.':'Черновик появится после получения товара и выбора даты.', 'Публикации':'Здесь видны получение товара или визит, сроки и публикации после одобрения.'};
  h='<h3>'+esc(panelTab)+'</h3><p>'+labels[panelTab]+'</p>'+summaryCard();
 }
 pnmain.innerHTML='<div class="demo-panel-caption">Демо · '+esc(panelTab)+'</div>'+h;
 if(focus)pnmain.focus({preventScroll:true});
}
function renderView(name){
 var h='',n=node(), entry=button('<b>'+esc(title())+'</b><small>'+esc(status())+'</small><span>Открыть →</span>','data-resume="1"','bot-list-item');
 if(name==='menu'){
  h='<p class="view-kicker">Личный кабинет блогера</p><h3>Главное меню</h3><p>Здравствуйте, '+(cur==='g'?'Анна':'Катя')+'!</p>'+button('Продолжить сотрудничество →','data-resume="1"','bot-primary')+
   '<div class="bot-menu-list">'+MENU.map(function(m){return button('<span class="menu-index">'+m[2]+'</span>'+m[1]+'<span class="chevron">›</span>','data-view="'+m[0]+'"','bot-menu-row');}).join('')+'</div>'+button('Помощь по демо','data-view="help"','bot-link');
 }else if(name==='offers'){
  h='<h3>Доступные предложения</h3>'+(n.st<2?entry:'<p>По этому предложению у вас уже есть '+(rejected()?'решение':cancelled()?'отмена':'заявка')+'. Повторно подавать её не нужно.</p>'+entry);
 }else if(name==='applications'){
  h='<h3>Мои заявки</h3>'+(n.st>=2?entry:'<p>Отправленных заявок пока нет. '+(n.st===1?'Анкета сохранена, её можно закончить.':'Выберите предложение и заполните короткую анкету.')+'</p>'+button(n.st===1?'Продолжить анкету':'Смотреть предложения','data-'+(n.st===1?'resume="1"':'view="offers"')));
 }else if(['active','unpublished','overdue','todo','completed'].indexOf(name)>-1){
  var headings={active:'Активные сотрудничества',unpublished:'Текущие неопубликованные',overdue:'Просроченные',todo:'Ожидают моего действия',completed:'Завершённые сотрудничества'};
  var matches=name==='active'?hasCooperation():name==='unpublished'?hasCooperation()&&!overdue()&&n.st<7:name==='overdue'?overdue():name==='todo'?!n.end&&n.kb&&n.kb.length:completed();
  h='<h3>'+headings[name]+'</h3>'+(matches?entry:'<p>В этом разделе пока пусто.</p>'+button('К текущему сотрудничеству','data-resume="1"'));
  if(name==='overdue')h+='<p class="demo-caption">В ресторанном сценарии можно показать просрочку. Условия блокировки по одной просрочке или количеству неопубликованных ещё уточняются с агентством.</p>';
 }else if(name==='profile'){
  h='<h3>Мои данные</h3>'+kv([['Имя',cur==='g'?'Анна Белова':'Екатерина Соколова'],['Telegram',person()],['Город','Москва'],['Соцсеть',esc(st.social)],['Адрес',esc(st.address)]])+
   '<p class="demo-caption">Город и тариф назначает менеджер. Статистику соцсетей вносит блогер, проверяет менеджер.</p>'+button('Изменить соцсеть','data-edit="social"')+button('Изменить адрес','data-edit="address"');
 }else if(name==='limits'){
  h='<h3>Мой тариф и лимиты</h3>'+kv([['Тариф',cur==='g'?'VIP':'Любимки'],['Город','Москва'],['Записи в заведения',cur==='r'?st.lim+' из 2 за октябрь':'Условия — в карточке предложения'],['Неопубликованных в этом демо',hasCooperation()&&n.st<7?'1':'0'],['Просрочено в этом демо',overdue()?'1':'0']])+
   '<div class="bot-note">Лимит посещений расходуется при одобрении, а не при подаче заявки. При отмене до визита он возвращается.</div><p>Правило «больше 3 неопубликованных» и влияние одной просрочки ещё уточняются. Здесь показан пример, а не окончательные условия.</p>';
 }else if(name==='contact'){
  h='<h3>Связь с менеджером</h3><div class="contact-avatar">М</div><b>Мария · Москва</b><p>Вопрос по заявке, доставке или публикации можно передать ответственному менеджеру.</p>'+button('Написать в демо','data-contact="1"','bot-primary')+'<p class="demo-caption">Сообщение появится только в этой демонстрации. Реальному человеку ничего не отправляется.</p>';
 }else if(name==='help'){
  h='<h3>Как попробовать систему</h3><ol><li>Откройте предложение и подайте заявку.</li><li>Примите решение за менеджера в панели справа (на телефоне — ниже).</li><li>Вернитесь в чат и пройдите сотрудничество до отчёта.</li></ol><p>В меню можно заглянуть на любом шаге: переписка и прогресс сохраняются. Товар и ресторан — два независимых сценария.</p>'+button('К сотрудничеству','data-resume="1"','bot-primary')+button('Связь с менеджером','data-view="contact"');
 }else if(name==='about'){
  h='<div class="contact-avatar">К</div><h3>Коллаборации</h3><p>Бот рекламного агентства</p><p>Предложения вашего тарифа, заявки, согласование контента и отчёты — в одном чате.</p><div class="bot-note">Интерактивный макет Telegram на iPhone. Настоящего подключения к Telegram нет.</div>'+button('Открыть главное меню','data-view="menu"','bot-primary')+button('Помощь','data-view="help"');
 }else if(name==='chats'){
  h='<h3>Чаты</h3>'+button('<span class="contact-avatar">К</span><b>Коллаборации</b><small>'+esc(status())+'</small><span>Открыть чат →</span>','data-resume="1"','bot-list-item')+'<p class="demo-caption">В демо доступен один чат агентства.</p>';
 }else if(name==='attach'){
  h='<h3>Прикрепить материал</h3><p>Выберите пример материала для демонстрации.</p>'+button('▧ Скриншот статистики','data-attachment="image"')+button('↗ Ссылка на видео в облаке','data-attachment="cloud"')+'<p class="demo-caption">Личные файлы не загружаются. Используем образцы из сценария.</p>';
 }else if(name==='edit'){
  h='<h3>'+ (activeEdit.field==='address'?'Адрес доставки':'Соцсеть')+'</h3><form id="profile-form"><label for="profile-value">'+(activeEdit.field==='address'?'Актуальный адрес':'Ссылка или имя профиля')+'</label><input class="demo-field" id="profile-value" name="value" maxlength="160" value="'+esc(st[activeEdit.field])+'" required><button type="submit" class="bot-primary">Сохранить в демо</button></form><p class="demo-caption">Изменение останется в этой вкладке.</p>';
 }
 view.innerHTML='<div class="view-nav">'+(name!=='menu'?button('‹ Назад','data-back="1"','bot-link'):'<span>Меню бота</span>')+button('В чат ↗','data-resume="1"','bot-link')+'</div><div class="view-body">'+h+'</div>';
}
function openView(name,push){
 if(name==='chat'){closeView();return;}
 if(push!==false)viewStack.push(viewName);
 viewName=name;renderView(name);view.hidden=false;chat.hidden=true;view.scrollTop=0;
 menu.setAttribute('aria-expanded',name==='menu'?'true':'false');
 document.getElementById('phone-back').setAttribute('aria-label','Назад');
 var heading=view.querySelector('h3');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 announce('Открыт раздел: '+(heading?heading.textContent:name));
}
function closeView(focus){
 viewName='chat';viewStack=[];view.hidden=true;chat.hidden=false;menu.setAttribute('aria-expanded','false');
 document.getElementById('phone-back').setAttribute('aria-label','Назад к чатам');
 if(focus!==false)menu.focus({preventScroll:true});scrollChat();
}
function back(){var previous=viewStack.pop()||'chat';if(previous==='chat')closeView();else openView(previous,false);}
function edit(field,next){activeEdit={field:field,next:next||null};openView('edit');}
function updateTranscript(html){
 return html.replace(/Москва, ул\. Летняя, 5, кв\. 12/g,esc(st.address)).replace(/@anna\.beauty<\/b>/g,esc(st.social)+'</b>').replace(/RU123456789/g,esc(st.track||'RU123456789'));
}
function go(id,label){
 var n=SC[cur].nodes[id];if(!n)return;
 closeView(false);currentNode=id;
 chat.querySelectorAll('.ikb').forEach(function(k){k.classList.add('used');k.classList.remove('live');k.querySelectorAll('button').forEach(function(b){b.disabled=true;});});
 if(n.set)Object.assign(st,n.set);
 if(id==='g9')st.draftVersion=1;
 if(id==='g10b')st.draftVersion=2;
 if(id==='g6'&&st.customTrack)st.track=st.customTrack;
 if(n.pubFromLabel&&label)st.pub=label;
 if(n.whenFromLabel&&label)st.when=label;
 if(n.guestsFromLabel&&label)st.guests=label;
 var message=n.me;
 if(['g9','g10b'].indexOf(id)>-1&&st.draftUrl)message='☁ '+esc(st.draftUrl);
 if(['g12','r9'].indexOf(id)>-1&&st.reportUrl)message=esc(st.reportUrl);
 if(label!==null)addMe(message!==undefined?message:esc(label));else if(message!==undefined)addMe(message);
 n.bot.forEach(function(m){m=typeof m==='function'?m(st):m;
  if(m.charAt(0)==='~'){var sep=document.createElement('div');sep.className='sep';sep.textContent=m.slice(1).trim();chat.appendChild(sep);}
  else addBubble('bot',updateTranscript(m));
 });
 if(n.kb){var kb=document.createElement('div');kb.className='ikb live';kb.innerHTML=n.kb.map(function(b){return button(esc(b[0]),'data-go="'+b[1]+'"',b[2]||n.kb.length===1||b[0].length>16?'full':'');}).join('');chat.appendChild(kb);}
 if(n.end){var end=document.createElement('div');end.className='ikb';end.innerHTML=button('↺ Пройти ещё раз','data-restart="1"','full');chat.appendChild(end);}
 renderProgress();renderTurn();renderPanel();scrollChat();announce(status()+'. '+turn.textContent);
 if(label!==null){var nextButton=chat.querySelector('.ikb.live button');(nextButton||chat).focus({preventScroll:true});}
}
function saveSession(){
 if(!cur)return;sessions[cur]={state:st,node:currentNode,html:chat.innerHTML,tab:panelTab,draft:input.value,scroll:chat.scrollTop,contact:contactMode};
}
function start(sc,reset){
 saveSession();cur=sc;var saved=!reset&&sessions[sc];
 if(saved){st=saved.state;currentNode=saved.node;chat.innerHTML=saved.html;input.value=saved.draft;contactMode=saved.contact;closeView(false);renderProgress();renderTurn();renderPanel(saved.tab);chat.scrollTop=saved.scroll;}
 else{st=Object.assign({clock:0,address:'Москва, ул. Летняя, 5, кв. 12',social:sc==='g'?'@anna.beauty':'@kate_food'},SC[sc].init);input.value='';contactMode=false;chat.innerHTML='<div class="sep">сегодня · демонстрация</div>';go(SC[sc].start,null);}
 who.textContent=SC[sc].who;
 document.querySelectorAll('#try [data-sc]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.sc===sc?'true':'false');});
 announce((reset?'Сценарий начат заново. ':'Сценарий открыт. ')+title());
}
function sendText(text){
 if(!text.trim()){announce('Введите сообщение.');input.focus();return;}
 closeView(false);
 if(/^\/(start|menu)$/i.test(text.trim())){openView('menu');return;}
 if(/^\/help$/i.test(text.trim())){openView('help');return;}
 if(/^\/offers$/i.test(text.trim())){openView('offers');return;}
 var link=/^https?:\/\/\S+$/i.test(text.trim());
 if(link&&['g8','g10'].indexOf(currentNode)>-1){st.draftUrl=text.trim();go(currentNode==='g8'?'g9':'g10b',null);input.focus({preventScroll:true});return;}
 if(link&&['g11','r7','r8','r8m'].indexOf(currentNode)>-1){st.reportUrl=text.trim();go(cur==='g'?'g12':'r9',null);input.focus({preventScroll:true});return;}
 addMe(esc(text));
 if(contactMode){addBubble('bot','Демо: сообщение для Марии записано в этой переписке. Реальному менеджеру ничего не отправлено.');contactMode=false;}
 else addBubble('bot','В демо можно пройти сценарий кнопками, прислать ссылку на черновик или публикацию на соответствующем шаге. Откройте «Меню», чтобы посмотреть разделы. Сообщение осталось только здесь.');
 announce('Демонстрационный ответ добавлен в чат.');
}
function attach(kind){
 var routes={g4q:'g4r',g12r:'g12s',g8:'g9',g10:'g10b'};
 var dest=routes[currentNode],expected=['g8','g10'].indexOf(currentNode)>-1?'cloud':'image';
 if(dest&&kind===expected){go(dest,null);return;}
 if(kind==='cloud'){closeView();input.value='https://disk.yandex.ru/i/demo-draft';input.focus();announce('Вставлена демонстрационная ссылка. Нажмите отправить.');}
 else{closeView(false);addMe(img('demo-statistics.png','пример статистики'));addBubble('bot','Демообразец добавлен в переписку. Сейчас файл не запрошен сценарием; этап сотрудничества не изменён.');}
}
document.querySelector('.tgp').addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;
 if(b.dataset.view){openView(b.dataset.view);return;}
 if(b.dataset.resume){closeView();return;}
 if(b.dataset.back){back();return;}
 if(b.dataset.edit){edit(b.dataset.edit);return;}
 if(b.dataset.contact){contactMode=true;closeView(false);addBubble('bot','Напишите вопрос Марии. Это локальный пример обращения: отправки реальному человеку не будет.');input.focus();return;}
 if(b.dataset.attachment){attach(b.dataset.attachment);return;}
 if(b.dataset.restart){start(cur,true);return;}
 if(b.dataset.go){
  if(b.closest('.used'))return;
  if(b.textContent==='Изменить'){edit(currentNode==='g1'?'social':'address',b.dataset.go);return;}
  go(b.dataset.go,b.textContent);
 }
});
view.addEventListener('submit',function(e){
 if(e.target.id!=='profile-form')return;e.preventDefault();var val=document.getElementById('profile-value').value.trim();
 if(!val)return;st[activeEdit.field]=val;var next=activeEdit.next;activeEdit=null;
 if(next)go(next,'Данные обновлены');else{back();renderPanel(panelTab);announce('Данные изменены только в демо.');}
});
menu.addEventListener('click',function(){if(viewName==='menu')closeView();else{viewStack=[];openView('menu');}});
document.getElementById('phone-back').addEventListener('click',function(){if(viewName==='chat')openView('chats');else back();});
document.querySelector('.tgp').addEventListener('keydown',function(e){if(e.key==='Escape'&&viewName!=='chat'){e.preventDefault();closeView();}});
document.getElementById('composer').addEventListener('submit',function(e){e.preventDefault();var text=input.value;input.value='';sendText(text);});
pnside.addEventListener('click',function(e){var b=e.target.closest('[data-panel]');if(b){renderPanel(b.dataset.panel,true);announce('Открыт раздел панели: '+b.dataset.panel);}});
pnmain.addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;
 if(b.dataset.panel){renderPanel(b.dataset.panel,true);return;}
 if(b.dataset.panelCurrent){renderPanel();closeView(false);pnmain.focus({preventScroll:true});return;}
 if(b.dataset.go){
  var track=document.getElementById('track-input');if(track)st.customTrack=track.value.trim()||'RU123456789';
  go(b.dataset.go,null);pnmain.focus({preventScroll:true});return;
 }
 if(b.dataset.export){
  var rows=[['Кампания','Блогер','Статус','Плановая дата'],[title(),person(),status(),st.pub||'']];
  var csv='\ufeff'+rows.map(function(r){return r.map(function(v){return '"'+v.replace(/"/g,'""')+'"';}).join(';');}).join('\r\n');
  var url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));var a=document.createElement('a');a.href=url;a.download='agency-demo-report.csv';a.click();URL.revokeObjectURL(url);announce('Скачана таблица с вымышленными данными.');
 }
});
document.querySelectorAll('#try [data-sc]').forEach(function(b){b.addEventListener('click',function(){start(b.dataset.sc);});});
document.getElementById('restart').addEventListener('click',function(){start(cur,true);});
start('g',true);
})();
