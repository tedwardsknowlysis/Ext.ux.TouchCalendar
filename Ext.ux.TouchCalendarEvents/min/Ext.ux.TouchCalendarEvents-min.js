Ext.define("Ext.ux.TouchCalendarEventsBase",{extend:"Ext.Base",config:{calendar:null,plugin:null,eventsPerTimeSlot:{},eventSortDirection:"ASC"},constructor:function(a){this.initConfig(a);this.callParent(arguments)},generateEventBars:function(){this.eventBarStore=Ext.create("Ext.data.Store",{model:"Ext.ux.CalendarEventBarModel",data:[]});this.setEventsPerTimeSlot({});var d=this.getCalendar().getStore(),b=this.getCalendar().eventStore,a,c=0;d.each(function(f){var e=f.get("date"),g=e.getTime(),h=[];b.sort(this.getPlugin().getStartEventField(),this.getEventSortDirection());b.each(function(j){if(!this.eventFilterFn.call(this,j,j.getId(),g)){return}c=c+1;var l=this.eventBarStore.findBy(function(m,n){return m.get("EventID")===j.internalId},this);if(l>-1){a=this.eventBarStore.getAt(l);while(a.linked().getCount()>0){a=a.linked().getAt(a.linked().getCount()-1)}var k=a.get("BarPosition");if((e.getDay()===this.getCalendar().getWeekStart()&&!(this.getCalendar().getViewMode()==="YEAR"))||(this.getCalendar().getViewMode()==="YEAR"&&e.getMonth()%3===0)||a.get("BarPosition")>=this.getPlugin().getMaxVisibleEvents()){k=this.getNextFreePosition(h);h.push(k);var i=Ext.create("Ext.ux.CalendarEventBarModel",{EventID:j.internalId,Date:e,BarLength:1,BarPosition:k,Colour:a.get("Colour"),Record:j});a.linked().add(i)}else{h.push(k);a.set("BarLength",a.get("BarLength")+1)}}else{var k=this.getNextFreePosition(h);h.push(k);a=Ext.create("Ext.ux.CalendarEventBarModel",{EventID:j.internalId,Date:e,BarLength:1,BarPosition:k,Colour:this.getRandomColour(),Record:j});this.eventBarStore.add(a)}},this);if(c>0){this.getEventsPerTimeSlot()[e.getTime()]=c}c=0},this)},eventBarDoesWrap:function(a){var b=Ext.Date.add(a.get("Date"),Ext.Date.DAY,(a.get("BarLength")-1));return Ext.Date.clearTime(b,true).getTime()!==Ext.Date.clearTime(a.get("Record").get(this.getPlugin().getEndEventField()),true).getTime()},eventBarHasWrapped:function(a){return Ext.Date.clearTime(a.get("Date"),true).getTime()!==Ext.Date.clearTime(a.get("Record").get(this.getPlugin().getStartEventField()),true).getTime()},getNextFreePosition:function(a){var b=0;while(a.indexOf(b)>-1){b++}return b},createEventBar:function(c,b){var a=this.eventBarDoesWrap(c),f=this.eventBarHasWrapped(c),d=[this.getPlugin().getEventBarCls(),"e-"+c.get("EventID"),(a?" wrap-end":""),(f?" wrap-start":""),b.get(this.getPlugin().getCssClassField())];var e=Ext.DomHelper.append(this.getPlugin().getEventWrapperEl(),{tag:"div",html:this.getPlugin().getEventBarTpl().apply(b.data),eventID:c.get("EventID"),cls:d.join(" ")},true);return e},getRandomColour:function(){return"#"+(Math.random()*16777215<<0).toString(16)}});Ext.define("Ext.ux.TouchCalendarDayEvents",{extend:"Ext.ux.TouchCalendarEventsBase",config:{eventSortDirection:"ASC"},eventFilterFn:function(b,e,c){var a=this.getRoundedTime(b.get(this.getPlugin().getStartEventField())).getTime(),d=this.getRoundedTime(b.get(this.getPlugin().getEndEventField())).getTime();return(a<=c)&&(d>=c)},renderEventBars:function(k){var f=this,a=k.getCount(),c=0,b;for(;c<a;c++){b=k.getAt(c);var g=b.data.Record,j=this.createEventBar(b,g),e=this.getEventBarWidth(b,50+10),d=this.getVerticalDayPosition(b),h=this.getHorizontalDayPosition(b,e),m=this.getEventBarHeight(b);j.setLeft(h);j.setTop(d-this.getCalendar().element.getY());j.setHeight(m);j.setWidth(e)}},getEventBarWidth:function(b,d){var c=this.getEventsPerTimeSlot()[b.get("Date").getTime()],a=this.getCalendar().element.getWidth();c=c||1;d=d||0;return Math.floor((a-d)/c)},getEventBarHeight:function(a){var b=this.getPlugin().getEventHeight();if(Ext.isNumeric(b)){return b}else{if(b==="duration"){return this.getEventBarHeightDuration(a)}else{return"auto"}}},getEventBarHeightDuration:function(a){var b=a.data.Record.get(this.getPlugin().getStartEventField()),d=a.data.Record.get(this.getPlugin().getEndEventField()),f=this.getRoundedTime(b),c=(d.getTime()-b.getTime())/1000/60,i=this.getCalendar().getDateCell(f),e=i.parent("tr",false),h=0;if(e){var g=i.getHeight(),j=g/30;h=c*j}return h},getVerticalDayPosition:function(a){var c=a.data.Record.get(this.getPlugin().getStartEventField()),i=this.getRoundedTime(c),k=(i.getHours()*2)+(i.getMinutes()===30?1:0),b=(c.getTime()-i.getTime())/1000/60,g=this.getCalendar().element.select("table.time-slot-table td",this.getCalendar().element.dom).first(),e=0;if(g){var d=g.getHeight(),f=g.getY(),j=d/30,h=b*j;e=f+(k*d)+h}return e},getHorizontalDayPosition:function(c,a){var d=c.get("BarPosition"),b=50,e=this.getPlugin().getEventBarSpacing();return b+(d*a)+(d*e)},getRoundedTime:function(a){a=Ext.Date.clone(a);var b=a.getMinutes();a.setMinutes(b-(b%this.getCalendar().getDayTimeSlotSize()));a.setSeconds(0);a.setMilliseconds(0);return a}});Ext.define("Ext.ux.TouchCalendarMonthEvents",{extend:"Ext.ux.TouchCalendarEventsBase",eventFilterFn:function(b,e,c){var a=Ext.Date.clearTime(b.get(this.getPlugin().getStartEventField()),true).getTime(),d=Ext.Date.clearTime(b.get(this.getPlugin().getEndEventField()),true).getTime();return(a<=c)&&(d>=c)},renderEventBars:function(a){var b=this;a.each(function(e){var k=this.getPlugin().getEventRecord(e.get("EventID")),j=this.getCalendar().getDateCell(e.get("Date")),h=this.eventBarDoesWrap(e),u=this.eventBarHasWrapped(e),f=[this.getPlugin().getEventBarCls(),"e-"+e.get("EventID"),(h?" wrap-end":""),(u?" wrap-start":""),k.get(this.getPlugin().getCssClassField())];var m=Ext.DomHelper.append(this.getPlugin().getEventWrapperEl(),{tag:"div",style:{"background-color":k.get(this.getPlugin().colourField)},html:this.getPlugin().getEventBarTpl().apply(k.data),eventID:e.get("EventID"),cls:f.join(" ")},true);if(this.allowEventDragAndDrop){new Ext.util.Draggable(m,{revert:true,onStart:function(A){var w=this,z=w.el.getAttribute("eventID"),x=b.getPlugin().getEventRecord(z),y=b.getEventBarRecord(z);w.el.setWidth(w.el.getWidth()/y.get("BarLength"));w.el.setLeft(A.startX-(w.el.getWidth()/2));b.calendar.element.select("div."+x.internalId,b.calendar.element.dom).each(function(B){if(B.dom!==w.el.dom){B.hide()}},this);Ext.util.Draggable.prototype.onStart.apply(this,arguments);b.calendar.fireEvent("eventdragstart",w,x,A);return true}})}var t=this.getCalendar().element.select("thead",this.getCalendar().element.dom).first().getHeight();var s=this.getCalendar().element.select("tbody",this.getCalendar().element.dom).first().getHeight();var o=this.getCalendar().element.select("tbody tr",this.getCalendar().element.dom).getCount();var d=s/o;var q=this.getCalendar().getStore().findBy(function(w){return w.get("date").getTime()===Ext.Date.clearTime(e.get("Date"),true).getTime()},this);var p=Math.floor(q/7)+1;var r=t+(d*p);var v=e.get("BarPosition"),l=e.get("BarLength"),c=(this.getCalendar().element.getWidth()/7)*j.dom.cellIndex,i=j.getWidth(),n=m.getHeight(),g=this.getPlugin().getEventBarSpacing();m.setLeft(c+(u?0:g));m.setTop(r-n-(v*n+(v*g)+g));m.setWidth((i*l)-(g*(h?(h&&u?0:1):2)));if(e.linked().getCount()>0){this.renderEventBars(e.linked())}},this)}});Ext.define("Ext.ux.TouchCalendarWeekEvents",{extend:"Ext.ux.TouchCalendarMonthEvents",renderEventBars:function(a){var b=this;a.each(function(d){var k=this.getPlugin().getEventRecord(d.get("EventID")),i=this.getCalendar().getDateCell(d.get("Date")),g=this.eventBarDoesWrap(d),v=this.eventBarHasWrapped(d),e=[this.getPlugin().getEventBarCls(),"e-"+d.get("EventID"),(g?" wrap-end":""),(v?" wrap-start":""),k.get(this.getPlugin().getCssClassField())];var m=Ext.DomHelper.append(this.getPlugin().getEventWrapperEl(),{tag:"div",style:{"background-color":k.get(this.getPlugin().colourField)},html:this.getPlugin().getEventBarTpl().apply(k.data),eventID:d.get("EventID"),cls:e.join(" ")},true);if(this.allowEventDragAndDrop){new Ext.util.Draggable(m,{revert:true,onStart:function(A){var w=this,z=w.el.getAttribute("eventID"),x=b.getPlugin().getEventRecord(z),y=b.getEventBarRecord(z);w.el.setWidth(w.el.getWidth()/y.get("BarLength"));w.el.setLeft(A.startX-(w.el.getWidth()/2));b.calendar.element.select("div."+x.internalId,b.calendar.element.dom).each(function(B){if(B.dom!==w.el.dom){B.hide()}},this);Ext.util.Draggable.prototype.onStart.apply(this,arguments);b.calendar.fireEvent("eventdragstart",w,x,A);return true}})}var u=this.getCalendar().element.select("thead",this.getCalendar().element.dom).first().getHeight();var t=this.getCalendar().element.select("tbody",this.getCalendar().element.dom).first().getHeight();var o=this.getCalendar().getStore().findBy(function(w){return w.get("date").getTime()===Ext.Date.clearTime(d.get("Date"),true).getTime()},this);var n=Math.floor(o/7)+1;var j=(t-20)/24;var q=j/60;var p=d.data.Record.get(this.getPlugin().getStartEventField()).getHours();var r=d.data.Record.get(this.getPlugin().getStartEventField()).getMinutes();var s=u+20+((p*j)+(r*q));var l=d.get("BarLength"),c=(this.getCalendar().element.getWidth()/7)*i.dom.cellIndex,h=i.getWidth(),f=this.getPlugin().getEventBarSpacing();m.setLeft(c);m.setTop(s);m.setWidth((h*l)-(f*(g?(g&&v?0:1):2)));if(d.linked().getCount()>0){this.renderEventBars(d.linked())}},this)}});Ext.define("Ext.ux.TouchCalendarEvents",{extend:"Ext.mixin.Observable",config:{maxVisibleEvents:4,viewModeProcessor:null,eventBarTpl:"{title}",eventBarCls:"event-bar",colourField:"colour",cssClassField:"css",eventHeight:"duration",eventWidth:"auto",startEventField:"start",endEventField:"end",eventWrapperCls:"event-wrapper",eventBarSelectedCls:"event-bar-selected",cellHoverCls:"date-cell-hover",autoUpdateEvent:true,allowEventDragAndDrop:false,eventBarSpacing:1,eventWrapperEl:null},init:function(b){var a=this;this.calendar=b;this.calendar.eventsPlugin=this;this.calendar.refresh=Ext.Function.createSequence(this.calendar.refresh,this.refreshEvents,this);this.calendar.setViewMode=this.createPreSequence(this.calendar.setViewMode,this.onViewModeUpdate,this);this.calendar.onComponentResize=Ext.Function.createSequence(this.calendar.onComponentResize,this.onComponentResize,this);this.onViewModeUpdate(this.calendar.getViewMode())},onComponentResize:function(){var a=this;setTimeout(function(){a.refreshEvents()},200)},createPreSequence:function(b,c,a){if(!c){return b}else{return function(){c.apply(a||this,arguments);var d=b.apply(this,arguments);return d}}},onViewModeUpdate:function(a){this.setViewModeProcessor(Ext.create(this.getViewModeProcessorClass(a),{calendar:this.calendar,plugin:this}))},getViewModeProcessorClass:function(a){var b="";switch(a.toLowerCase()){case"year":b="Ext.ux.TouchCalendarYearEvents";break;case"month":b="Ext.ux.TouchCalendarMonthEvents";break;case"week":b="Ext.ux.TouchCalendarWeekEvents";break;case"day":b="Ext.ux.TouchCalendarDayEvents";break}return b},refreshEvents:function(){if(this.calendar.getScrollable()){this.calendar.getScrollable().getScroller().scrollTo(0,0)}this.removeEvents();this.getViewModeProcessor().generateEventBars();this.createEventWrapper();if(this.getAllowEventDragAndDrop()){this.createDroppableRegion()}},createDroppableRegion:function(){var b=this;var a=0},onEventDropDeactivate:function(f,a,d,c){if(a.el.hasCls(this.eventBarCls)){var b=this.getEventRecord(a.el.getAttribute("eventID"));this.calendar.element.select("div."+b.internalId,this.calendar.element.dom).each(function(e){e.show()},this)}},onEventDrop:function(f,a,d,c){var b=false;if(a.el.hasCls(this.eventBarCls)){this.calendar.all.each(function(e){var j=e.getPageBox(true);var k=a.el.getPageBox(true);if(j.partial(k)&&this.calendar.fireEvent("beforeeventdrop",a,f,g,d)){b=true;var g=this.getEventRecord(a.el.getAttribute("eventID")),h=this.calendar.getCellDate(e),i=this.getDaysDifference(g.get(this.getStartEventField()),h);if(this.getAutoUpdateEvent()){g.set(this.getStartEventField(),h);g.set(this.getEndEventField(),g.get(this.getEndEventField()).add(Date.DAY,i))}this.refreshEvents();this.calendar.fireEvent("eventdrop",a,f,g,d);return}},this);this.calendar.all.removeCls(this.getCellHoverCls());if(!b){a.setOffset(a.startOffset,true)}}},onEventDragStart:function(a,f){var d=a.el.getAttribute("eventID"),b=this.getEventRecord(d),c=this.getEventBarRecord(d);a.el.setWidth(a.el.getWidth()/c.get("BarLength"));a.updateBoundary(true);this.calendar.element.select("div."+b.internalId,this.calendar.element.dom).each(function(e){if(e.dom!==a.el.dom){e.hide()}},this);this.calendar.fireEvent("eventdragstart",a,b,f)},createEventWrapper:function(){if(this.calendar.rendered&&!this.getEventWrapperEl()){this.setEventWrapperEl(Ext.DomHelper.append(this.getEventsWrapperContainer(),{tag:"div",cls:this.getEventWrapperCls()},true));this.getEventWrapperEl().on("tap",this.onEventWrapperTap,this,{delegate:"div."+this.getEventBarCls()});if(this.getViewModeProcessor().eventBarStore){if(this.calendar.getViewMode()==="YEAR"){this.calendar.fireEvent("renderYearEvents",this.getViewModeProcessor().eventBarStore,this.getEventWrapperCls(),this.getEventsWrapperContainer(),this,this.calendar,this.getViewModeProcessor())}else{this.getViewModeProcessor().renderEventBars(this.getViewModeProcessor().eventBarStore)}}}else{this.calendar.on("painted",this.createEventWrapper,this)}},onEventWrapperTap:function(g,f){g.stopPropagation();var d=g.getTarget("div."+this.getEventBarCls());if(d){var c=d.getAttribute("eventID"),b=Ext.fly(d);if(c){var a=this.getEventRecord(c);this.deselectEvents();b.addCls(this.getEventBarSelectedCls());this.calendar.fireEvent("eventtap",a,g)}}},getEventsWrapperContainer:function(){return this.calendar.element.select("thead th",this.calendar.element.dom).first()||this.calendar.element.select("tr td",this.calendar.element.dom).first()},getEventRecord:function(a){var b=this.calendar.eventStore.findBy(function(c){return c.internalId===a},this);return this.calendar.eventStore.getAt(b)},getEventBarRecord:function(a){var b=this.eventBarStore.findBy(function(c){return c.get("EventID")===a},this);return this.eventBarStore.getAt(b)},deselectEvents:function(){this.calendar.element.select("."+this.getEventBarSelectedCls(),this.calendar.element.dom).removeCls(this.getEventBarSelectedCls())},getDaysDifference:function(b,a){b=b.clearTime(true).getTime();a=a.clearTime(true).getTime();return(a-b)/1000/60/60/24},removeEvents:function(){if(this.getEventWrapperEl()){this.getEventWrapperEl().dom.innerHTML="";this.getEventWrapperEl().destroy();this.setEventWrapperEl(null)}if(this.eventBarStore){this.eventBarStore.remove(this.eventBarStore.getRange());this.eventBarStore=null}if(this.droppable){this.droppable=null}},applyEventBarTpl:function(a){if(Ext.isString(a)||Ext.isArray(a)){a=Ext.create("Ext.XTemplate",a)}return a}});Ext.define("Ext.ux.CalendarEventBarModel",{extend:"Ext.data.Model",config:{fields:[{name:"EventID",type:"string"},{name:"Date",type:"date"},{name:"BarLength",type:"int"},{name:"BarPosition",type:"int"},{name:"Colour",type:"string"},"Record"],hasMany:[{model:"Ext.ux.CalendarEventBarModel",name:"linked"}]}});