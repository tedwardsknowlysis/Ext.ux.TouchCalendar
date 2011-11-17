Ext.data.JsonP.Ext_ux_TouchCalendarView({"mixedInto":[],"static":false,"html_filename":"Ext.ux.TouchCalendar-min-debug.html","xtypes":[],"tagname":"class","inheritable":false,"allMixins":[],"extends":"Ext.DataView","statics":{"css_var":[],"cfg":[],"css_mixin":[],"event":[],"method":[],"property":[]},"uses":[],"members":{"css_var":[],"css_mixin":[],"cfg":[{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"dayTimeSlotSize"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"mode"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"nextMonthCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"nextPeriodCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"prevMonthCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"prevPeriodCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"selectedItemCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"todayCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"unselectableCls"},{"static":false,"required":null,"tagname":"cfg","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"weekendCls"}],"event":[{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"periodchange"},{"static":false,"required":null,"tagname":"event","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"selectionchange"}],"method":[{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"getCellDate"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"getDateCell"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"getDateRecord"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"getNextIterationDate"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"refresh"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"refreshDelta"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"selectDate"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"setMode"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"setValue"},{"static":false,"required":null,"tagname":"method","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"syncHeight"}],"property":[{"static":false,"required":null,"tagname":"property","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":""},{"static":false,"required":null,"tagname":"property","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"dateAttributeFormat"},{"static":false,"required":null,"tagname":"property","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"tpl"},{"static":false,"required":null,"tagname":"property","owner":"Ext.ux.TouchCalendarView","protected":false,"deprecated":null,"name":"weekStart"}]},"author":"Stuart Ashworth","protected":false,"linenr":258,"subclasses":[],"singleton":false,"alias":null,"deprecated":null,"docauthor":null,"private":false,"superclasses":[],"mixins":[],"name":"Ext.ux.TouchCalendarView","filename":"Ext.ux.Calendar/min/Ext.ux.TouchCalendar-min-debug.js","component":false,"code_type":"assignment","html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.DataView<div class='subclass '><strong>Ext.ux.TouchCalendarView</strong></div></div></pre><div class='doc-contents'><p>The main extension is contained in the root folder of the repository and can be included in your project (along with its CSS file located within\nthe resources/css folder) and will give you a basic calendar view (either showing a month, week or day) that can be configured with various options.</p>\n\n<p><img src=\"http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendarView-month-ss.png\" alt=\"Ext.ux.TouchCalendarView Screenshot\" />\n<img src=\"http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendarView-week-ss.png\" alt=\"Ext.ux.TouchCalendarView Screenshot\" />\n<img src=\"http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendarView-day-ss.png\" alt=\"Ext.ux.TouchCalendarView Screenshot\" /></p>\n\n<p><a href=\"http://www.swarmonline.com/Ext.ux.TouchCalendar/examples/Ext.ux.TouchCalendar.html\">Ext.ux.TouchCalendarView Demo</a></p>\n</div><div class='members'><div id='m-cfg'><div class='definedBy'>Defined By</div><h3 class='members-title'>Config options</h3><div class='subsection'><div id='cfg-dayTimeSlotSize' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-dayTimeSlotSize' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-dayTimeSlotSize' class='name expandable'>dayTimeSlotSize</a><span> : Number</span></div><div class='description'><div class='short'>The number of minutes the Day View's time slot will increment by. ...</div><div class='long'><p>The number of minutes the Day View's time slot will increment by. Defaults to 30 minutes.</p>\n<p>Defaults to: <code>30</code></p></div></div></div><div id='cfg-mode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-mode' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-mode' class='name expandable'>mode</a><span> : String</span></div><div class='description'><div class='short'>The mode the Calendar will be displayed in. ...</div><div class='long'><p>The mode the Calendar will be displayed in. Possible values 'month', 'week' or 'day'.</p>\n<p>Defaults to: <code>&quot;month&quot;</code></p></div></div></div><div id='cfg-nextMonthCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-nextMonthCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-nextMonthCls' class='name expandable'>nextMonthCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to any date cells that are part of the next month ...</div><div class='long'><p>CSS class added to any date cells that are part of the next month</p>\n<p>Defaults to: <code>&quot;next-month&quot;</code></p></div></div></div><div id='cfg-nextPeriodCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-nextPeriodCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-nextPeriodCls' class='name expandable'>nextPeriodCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to the next period navigation cells in the calendar's header ...</div><div class='long'><p>CSS class added to the next period navigation cells in the calendar's header</p>\n<p>Defaults to: <code>&quot;goto-next&quot;</code></p></div></div></div><div id='cfg-prevMonthCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-prevMonthCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-prevMonthCls' class='name expandable'>prevMonthCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to any date cells that are part of the previous month ...</div><div class='long'><p>CSS class added to any date cells that are part of the previous month</p>\n<p>Defaults to: <code>&quot;prev-month&quot;</code></p></div></div></div><div id='cfg-prevPeriodCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-prevPeriodCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-prevPeriodCls' class='name expandable'>prevPeriodCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to the previous period navigation cell in the calendar's header ...</div><div class='long'><p>CSS class added to the previous period navigation cell in the calendar's header</p>\n<p>Defaults to: <code>&quot;goto-prev&quot;</code></p></div></div></div><div id='cfg-selectedItemCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-selectedItemCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-selectedItemCls' class='name expandable'>selectedItemCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to the date cell that is currently selected ...</div><div class='long'><p>CSS class added to the date cell that is currently selected</p>\n<p>Defaults to: <code>&quot;selected&quot;</code></p></div></div></div><div id='cfg-todayCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-todayCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-todayCls' class='name expandable'>todayCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to the today's date cell ...</div><div class='long'><p>CSS class added to the today's date cell</p>\n<p>Defaults to: <code>&quot;today&quot;</code></p></div></div></div><div id='cfg-unselectableCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-unselectableCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-unselectableCls' class='name expandable'>unselectableCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to any date cells that are unselectable ...</div><div class='long'><p>CSS class added to any date cells that are unselectable</p>\n<p>Defaults to: <code>&quot;unselectable&quot;</code></p></div></div></div><div id='cfg-weekendCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-cfg-weekendCls' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-cfg-weekendCls' class='name expandable'>weekendCls</a><span> : String</span></div><div class='description'><div class='short'>CSS class added to any date cells that are on the weekend ...</div><div class='long'><p>CSS class added to any date cells that are on the weekend</p>\n<p>Defaults to: <code>&quot;weekend&quot;</code></p></div></div></div></div></div><div id='m-property'><div class='definedBy'>Defined By</div><h3 class='members-title'>Properties</h3><div class='subsection'><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-property-' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-property-' class='name expandable'></a><span> : Object</span></div><div class='description'><div class='short'>@copyright      (c) 2011, by SwarmOnline.com\n@date           2nd November 2011\n@version        0.1\n@documentation\n@we...</div><div class='long'><p>@copyright      (c) 2011, by SwarmOnline.com\n@date           2nd November 2011\n@version        0.1\n@documentation<br/>\n@website            http://www.swarmonline.com</p>\n</div></div></div><div id='property-dateAttributeFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-property-dateAttributeFormat' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-property-dateAttributeFormat' class='name expandable'>dateAttributeFormat</a><span> : String</span></div><div class='description'><div class='short'>Date format that the 'datetime' attribute, given to each time slot, has. ...</div><div class='long'><p>Date format that the 'datetime' attribute, given to each time slot, has. Day mode needs the time in aswell so\nevents etc know what time slot it is</p>\n</div></div></div><div id='property-tpl' class='member  not-inherited'><a href='#' class='side not-expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-property-tpl' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-property-tpl' class='name not-expandable'>tpl</a><span> : Array</span></div><div class='description'><div class='short'><p>Template for the DAY view</p>\n</div><div class='long'><p>Template for the DAY view</p>\n</div></div></div><div id='property-weekStart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-property-weekStart' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-property-weekStart' class='name expandable'>weekStart</a><span> : Number</span></div><div class='description'><div class='short'>cfg {Number} weekStart Starting day of the week. ...</div><div class='long'><p>cfg {Number} weekStart Starting day of the week. (0 = Sunday, 1 = Monday ... etc)</p>\n</div></div></div></div></div><div id='m-method'><div class='definedBy'>Defined By</div><h3 class='members-title'>Methods</h3><div class='subsection'><div id='method-getCellDate' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-getCellDate' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-getCellDate' class='name expandable'>getCellDate</a>( <span class='pre'>Ext.Element dateCell</span> ) : Date</div><div class='description'><div class='short'>Returns the Date associated with the specified cell ...</div><div class='long'><p>Returns the Date associated with the specified cell</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dateCell</span> : Ext.Element<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Date</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDateCell' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-getDateCell' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-getDateCell' class='name expandable'>getDateCell</a>( <span class='pre'>Ext.Element date</span> ) : Ext.Element</div><div class='description'><div class='short'>Returns the cell representing the specified date ...</div><div class='long'><p>Returns the cell representing the specified date</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>date</span> : Ext.Element<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Ext.Element</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDateRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-getDateRecord' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-getDateRecord' class='name expandable'>getDateRecord</a>( <span class='pre'>Date date</span> )</div><div class='description'><div class='short'>Returns the TouchCalendarViewModel model instance containing the passed in date @privatee ...</div><div class='long'><p>Returns the TouchCalendarViewModel model instance containing the passed in date @privatee</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>date</span> : Date<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getNextIterationDate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-getNextIterationDate' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-getNextIterationDate' class='name expandable'>getNextIterationDate</a>( <span class='pre'>Date currentIterationDate, Number index</span> )</div><div class='description'><div class='short'>Called during the View's Store population. ...</div><div class='long'><p>Called during the View's Store population. This calculates the next date for the current period.\nThe DAY mode's version just adds another time period on.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>currentIterationDate</span> : Date<div class='sub-desc'>\n</div></li><li><span class='pre'>index</span> : Number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-refresh' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-refresh' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-refresh' class='name expandable'>refresh</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Override for the Ext.DataView's refresh method. ...</div><div class='long'><p>Override for the Ext.DataView's refresh method. Repopulates the store, calls parent then sync the height of the table</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-refreshDelta' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-refreshDelta' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-refreshDelta' class='name expandable'>refreshDelta</a>( <span class='pre'>Number delta</span> ) : void</div><div class='description'><div class='short'>Refreshes the calendar moving it forward (delta = 1) or backward (delta = -1) ...</div><div class='long'><p>Refreshes the calendar moving it forward (delta = 1) or backward (delta = -1)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>delta</span> : Number<div class='sub-desc'><ul>\n<li>integer representing direction (1 = forward, =1 = backward)</li>\n</ul>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-selectDate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-selectDate' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-selectDate' class='name expandable'>selectDate</a>( <span class='pre'>Date date</span> )</div><div class='description'><div class='short'>Selects the specified date in the DataView's selection model ...</div><div class='long'><p>Selects the specified date in the DataView's selection model</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>date</span> : Date<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setMode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-setMode' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-setMode' class='name expandable'>setMode</a>( <span class='pre'>String mode, String noRefresh</span> )</div><div class='description'><div class='short'>Sets the mode that the Calendar is displayed in. ...</div><div class='long'><p>Sets the mode that the Calendar is displayed in. Possible values are 'month', 'week' or 'day'.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mode</span> : String<div class='sub-desc'><p>Either 'month', 'week' or 'day'</p>\n</div></li><li><span class='pre'>noRefresh</span> : String<div class='sub-desc'><p>True to stop the Calendar refreshing after changing the mode</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setValue' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-setValue' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-setValue' class='name expandable'>setValue</a>( <span class='pre'>Date v</span> ) : void</div><div class='description'><div class='short'>Set selected date. ...</div><div class='long'><p>Set selected date.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Date<div class='sub-desc'><p>Date to select.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-syncHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-method-syncHeight' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-method-syncHeight' class='name expandable'>syncHeight</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Syncs the table's Ext.Element to the height of the Ext.DataView's component. ...</div><div class='long'><p>Syncs the table's Ext.Element to the height of the Ext.DataView's component. (Only if it isn't in DAY mode)</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div><div id='m-event'><div class='definedBy'>Defined By</div><h3 class='members-title'>Events</h3><div class='subsection'><div id='event-periodchange' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-event-periodchange' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-event-periodchange' class='name expandable'>periodchange</a>( <span class='pre'>Ext.ux.Calendar this, Date minDate, Date maxDate, string direction</span> )</div><div class='description'><div class='short'>Fires when the calendar changes to a different date period (i.e. ...</div><div class='long'><p>Fires when the calendar changes to a different date period (i.e. switch using the arrows)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : Ext.ux.Calendar<div class='sub-desc'>\n</div></li><li><span class='pre'>minDate</span> : Date<div class='sub-desc'><p>New view's minimum date</p>\n</div></li><li><span class='pre'>maxDate</span> : Date<div class='sub-desc'><p>New view's maximum date</p>\n</div></li><li><span class='pre'>direction</span> : string<div class='sub-desc'><p>Direction that the view moved ('forward' or 'back')</p>\n</div></li></ul></div></div></div><div id='event-selectionchange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ux.TouchCalendarView' rel='Ext.ux.TouchCalendarView' class='definedIn docClass'>Ext.ux.TouchCalendarView</a><br/><a href='source/Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView-event-selectionchange' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ux.TouchCalendarView-event-selectionchange' class='name expandable'>selectionchange</a>( <span class='pre'>Ext.ux.Calendar this, Date previousValue, Date newValue</span> )</div><div class='description'><div class='short'>Fires when the Calendar's selected date is changed ...</div><div class='long'><p>Fires when the Calendar's selected date is changed</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : Ext.ux.Calendar<div class='sub-desc'>\n</div></li><li><span class='pre'>previousValue</span> : Date<div class='sub-desc'><p>Previously selected date</p>\n</div></li><li><span class='pre'>newValue</span> : Date<div class='sub-desc'><p>Newly selected date</p>\n</div></li></ul></div></div></div></div></div></div></div>","requires":[],"alternateClassNames":[],"href":"Ext.ux.TouchCalendar-min-debug.html#Ext-ux-TouchCalendarView"});