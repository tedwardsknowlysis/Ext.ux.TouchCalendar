Ext.data.JsonP.Ext_ux_CalendarEvents({"mixedInto":[],"static":false,"html_filename":"Ext.ux.CalendarEvents2.html","xtypes":[],"tagname":"class","inheritable":false,"allMixins":[],"extends":"Ext.util.Observable","statics":{"css_var":[],"cfg":[],"css_mixin":[],"event":[],"method":[],"property":[]},"uses":[],"members":{"css_var":[],"css_mixin":[],"cfg":[{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"autoUpdateEvent"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"cellHoverCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"endEventField"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventBarCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventBarSelectedCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventBarSpacing"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventWrapperCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"startEventField"}],"event":[{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"beforeeventdrop"},{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventdrag"},{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventdragstart"},{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventdrop"},{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"eventtap"}],"method":[{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"deselectEvents"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"refreshEvents"}],"property":[{"static":false,"required":null,"tagname":"property","owner":"Ext.ux.CalendarEvents","protected":false,"deprecated":null,"name":"droppable"}]},"author":null,"protected":false,"linenr":1,"subclasses":[],"singleton":false,"alias":null,"deprecated":null,"docauthor":null,"private":false,"superclasses":[],"mixins":[],"name":"Ext.ux.CalendarEvents","filename":"Ext.ux.Calendar/Ext.ux.CalendarEvents/Ext.ux.CalendarEvents.js","component":false,"code_type":"assignment","html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.util.Observable<div class='subclass '><strong>Ext.ux.CalendarEvents</strong></div></div></pre><div class='doc-contents'>\n</div><div class='members'><div id='m-cfg'><div class='definedBy'>Defined By</div><h3 class='members-title'>Config options</h3><div class='subsection'><div id='cfg-autoUpdateEvent' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-autoUpdateEvent' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-autoUpdateEvent' class='name expandable'>autoUpdateEvent</a><span> : Boolean</span></div><div class='description'><div class='short'>Decides whether the configured startEventField and endEventField\ndates are updated after an event is dragged and dropped ...</div><div class='long'><p>Decides whether the configured startEventField and endEventField\ndates are updated after an event is dragged and dropped</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-cellHoverCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-cellHoverCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-cellHoverCls' class='name expandable'>cellHoverCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class given to date cells when an event is dragged over ...</div><div class='long'><p>CSS class given to date cells when an event is dragged over</p>\n<p>Defaults to: <code>&quot;date-cell-hover&quot;</code></p></div></div></div><div id='cfg-endEventField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-endEventField' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-endEventField' class='name expandable'>endEventField</a><span> : Stirng</span></div><div class='description'><div class='short'>Name of the Model field which contains the Event's End date ...</div><div class='long'><p>Name of the Model field which contains the Event's End date</p>\n<p>Defaults to: <code>&quot;end&quot;</code></p></div></div></div><div id='cfg-eventBarCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-eventBarCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-eventBarCls' class='name expandable'>eventBarCls</a><span> : String</span></div><div class='description'><div class='short'>Base CSS class given to each EventBar ...</div><div class='long'><p>Base CSS class given to each EventBar</p>\n<p>Defaults to: <code>&quot;event-bar&quot;</code></p></div></div></div><div id='cfg-eventBarSelectedCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-eventBarSelectedCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-eventBarSelectedCls' class='name expandable'>eventBarSelectedCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class given to the EventBar after it has been selected ...</div><div class='long'><p>CSS class given to the EventBar after it has been selected</p>\n<p>Defaults to: <code>&quot;event-bar-selected&quot;</code></p></div></div></div><div id='cfg-eventBarSpacing' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-eventBarSpacing' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-eventBarSpacing' class='name expandable'>eventBarSpacing</a><span> : Number</span></div><div class='description'><div class='short'>Space (in pixels) between EventBars ...</div><div class='long'><p>Space (in pixels) between EventBars</p>\n<p>Defaults to: <code>4</code></p></div></div></div><div id='cfg-eventWrapperCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-eventWrapperCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-eventWrapperCls' class='name expandable'>eventWrapperCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class given to the EventBars' wrapping element ...</div><div class='long'><p>CSS class given to the EventBars' wrapping element</p>\n<p>Defaults to: <code>&quot;event-wrapper&quot;</code></p></div></div></div><div id='cfg-startEventField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-cfg-startEventField' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-cfg-startEventField' class='name expandable'>startEventField</a><span> : String</span></div><div class='description'><div class='short'>Name of the Model field which contains the Event's Start date ...</div><div class='long'><p>Name of the Model field which contains the Event's Start date</p>\n<p>Defaults to: <code>&quot;start&quot;</code></p></div></div></div></div></div><div id='m-property'><div class='definedBy'>Defined By</div><h3 class='members-title'>Properties</h3><div class='subsection'><div id='property-droppable' class='member first-child not-inherited'><a href='#' class='side not-expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-property-droppable' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-property-droppable' class='name not-expandable'>droppable</a><span> : Ext.util.Droppable</span></div><div class='description'><div class='short'><p>Contains the Ext.util.Droppable instance on the Calendar's body element</p>\n</div><div class='long'><p>Contains the Ext.util.Droppable instance on the Calendar's body element</p>\n</div></div></div></div></div><div id='m-method'><div class='definedBy'>Defined By</div><h3 class='members-title'>Methods</h3><div class='subsection'><div id='method-deselectEvents' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-method-deselectEvents' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-method-deselectEvents' class='name expandable'>deselectEvents</a>( <span class='pre'></span> ) : void</div><div class='description'><div class='short'>Remove the selected CSS class from all selected Event Bars ...</div><div class='long'><p>Remove the selected CSS class from all selected Event Bars</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-refreshEvents' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-method-refreshEvents' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-method-refreshEvents' class='name expandable'>refreshEvents</a>( <span class='pre'></span> ) : void</div><div class='description'><div class='short'>Regenerates the Event Bars ...</div><div class='long'><p>Regenerates the Event Bars</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div><div id='m-event'><div class='definedBy'>Defined By</div><h3 class='members-title'>Events</h3><div class='subsection'><div id='event-beforeeventdrop' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-event-beforeeventdrop' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-event-beforeeventdrop' class='name expandable'>beforeeventdrop</a>( <span class='pre'>Ext.util.Draggable draggable, Ext.util.Droppable droppable, Ext.data.Model eventRecord, Event e, Object eOpts</span> )</div><div class='description'><div class='short'>Fires before an Event Bar drop is accepted. ...</div><div class='long'><p>Fires before an Event Bar drop is accepted. Return false to prevent the drop from\nhappening. This event can be used to add additional validation for Event moves</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>draggable</span> : Ext.util.Draggable<div class='sub-desc'><p>The Event Bar's Ext.util.Draggable instance</p>\n</div></li><li><span class='pre'>droppable</span> : Ext.util.Droppable<div class='sub-desc'><p>The Calendar's Ext.util.Droppable instance</p>\n</div></li><li><span class='pre'>eventRecord</span> : Ext.data.Model<div class='sub-desc'><p>The model that the dragged Event Bar represents</p>\n</div></li><li><span class='pre'>e</span> : Event<div class='sub-desc'><p>The event object for the drag operation</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-eventdrag' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-event-eventdrag' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-event-eventdrag' class='name expandable'>eventdrag</a>( <span class='pre'>Ext.util.Draggable draggable, Ext.data.Model eventRecord, Date currentDate, Ext.Element currentDateCell, Event e, Object eOpts</span> )</div><div class='description'><div class='short'>Fires while an Event Bar is being dragged. ...</div><div class='long'><p>Fires while an Event Bar is being dragged.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>draggable</span> : Ext.util.Draggable<div class='sub-desc'><p>The Event Bar's Ext.util.Draggable instance</p>\n</div></li><li><span class='pre'>eventRecord</span> : Ext.data.Model<div class='sub-desc'><p>The model that the dragged Event Bar represents</p>\n</div></li><li><span class='pre'>currentDate</span> : Date<div class='sub-desc'><p>The date that the Event Bar is currently over</p>\n</div></li><li><span class='pre'>currentDateCell</span> : Ext.Element<div class='sub-desc'><p>The Ext.Element representing the table cell of the current date</p>\n</div></li><li><span class='pre'>e</span> : Event<div class='sub-desc'><p>The event object for the drag operation</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-eventdragstart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-event-eventdragstart' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-event-eventdragstart' class='name expandable'>eventdragstart</a>( <span class='pre'>Ext.util.Draggable draggable, Ext.data.Model eventRecord, Event e, Object eOpts</span> )</div><div class='description'><div class='short'>Fires when an Event Bar is initially dragged. ...</div><div class='long'><p>Fires when an Event Bar is initially dragged.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>draggable</span> : Ext.util.Draggable<div class='sub-desc'><p>The Event Bar's Ext.util.Draggable instance</p>\n</div></li><li><span class='pre'>eventRecord</span> : Ext.data.Model<div class='sub-desc'><p>The model that the dragged Event Bar represents</p>\n</div></li><li><span class='pre'>e</span> : Event<div class='sub-desc'><p>The event object for the drag operation</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-eventdrop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-event-eventdrop' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-event-eventdrop' class='name expandable'>eventdrop</a>( <span class='pre'>Ext.util.Draggable draggable, Ext.util.Droppable droppable, Ext.data.Model eventRecord, Event e, Object eOpts</span> )</div><div class='description'><div class='short'>Fires when an Event Bar is dragged and dropped on a date ...</div><div class='long'><p>Fires when an Event Bar is dragged and dropped on a date</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>draggable</span> : Ext.util.Draggable<div class='sub-desc'><p>The Event Bar's Ext.util.Draggable instance</p>\n</div></li><li><span class='pre'>droppable</span> : Ext.util.Droppable<div class='sub-desc'><p>The Calendar's Ext.util.Droppable instance</p>\n</div></li><li><span class='pre'>eventRecord</span> : Ext.data.Model<div class='sub-desc'><p>The model that the dragged Event Bar represents</p>\n</div></li><li><span class='pre'>e</span> : Event<div class='sub-desc'><p>The event object for the drag operation</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-eventtap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.CalendarEvents' rel='Ext.ux.CalendarEvents' class='definedIn docClass'>Ext.ux.CalendarEvents</a><br/><a href='source/Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents-event-eventtap' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.CalendarEvents-event-eventtap' class='name expandable'>eventtap</a>( <span class='pre'>Ext.data.Model eventRecord, Event e, Object eOpts</span> )</div><div class='description'><div class='short'>Fires when an Event Bar is tapped ...</div><div class='long'><p>Fires when an Event Bar is tapped</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventRecord</span> : Ext.data.Model<div class='sub-desc'><p>The model that the dragged Event Bar represents</p>\n</div></li><li><span class='pre'>e</span> : Event<div class='sub-desc'><p>The event object for the tap operation</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div></div></div></div></div>","requires":[],"alternateClassNames":[],"href":"Ext.ux.CalendarEvents2.html#Ext-ux-CalendarEvents"});