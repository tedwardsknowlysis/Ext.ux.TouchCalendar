/**
 * Ext.ux.TouchCalendarYearEvents
 */
Ext.define('Ext.ux.TouchCalendarYearEvents', {
    extend: 'Ext.ux.TouchCalendarEventsBase',

	numberOfEventRows: 4,
	numberOfMonthColumns: 3,

	constructor: function() {
		this.callParent(arguments);
		this.getCalendar().on('renderYearEvents', this.renderEventBars, this);
	},

	eventFilterFn: function(record, id, currentMonthBeginTime){
		var eventStartDate = Ext.Date.clearTime(record.get(this.getPlugin().getStartEventField()), true).getTime(),
			eventEndDate = Ext.Date.clearTime(record.get(this.getPlugin().getEndEventField()), true).getTime();

		var currentMonthBeginning = new Date(currentMonthBeginTime);
		var nextMonthBeginningTime = (new Date(currentMonthBeginning.getFullYear(), currentMonthBeginning.getMonth() + 1, 1)).getTime();
		var startsInMonth = (eventStartDate >= currentMonthBeginTime) && (eventStartDate < nextMonthBeginningTime),
			endsInMonth   = (eventEndDate   >= currentMonthBeginTime) && (eventEndDate   < nextMonthBeginningTime),
			withinMonth   = (eventStartDate < currentMonthBeginTime) && (eventEndDate >= nextMonthBeginningTime);
		var show = startsInMonth || endsInMonth || withinMonth;
		return show;
	},

	/**
	 * Returns true if the specified EventBar record will wrap and so will need square ends
	 * Compares the calculated date that the bar will end on and the actual end date of the event. If they aren't the same
	 * the bar will wrap to the next row
	 * @method
	 * @private
	 * @param {Ext.ux.CalendarEventBarModel} r The EventBar model instance to figure out if it wraps to the next row of dates
	 */
	eventBarDoesWrap: function(r){
		var barEndDate = Ext.Date.add(r.get('Date'), Ext.Date.MONTH, r.get('BarLength'));
		var eventEndDate = r.get('Record').get(this.getPlugin().getEndEventField());
		var retVal = Ext.Date.clearTime(barEndDate, true).getTime() < Ext.Date.clearTime(eventEndDate, true).getTime();
		return retVal;
	},

	/**
	 * Returns true if the specified EventBar record has been wrapped from the row before.
	 * @method
	 * @private
	 * @param {Ext.ux.CalendarEventBarModel} r The EventBar model instance to figure out if it has wrapped from the previous row of dates
	 */
	eventBarHasWrapped: function(r){
		var eventStartDate = r.get('Record').get(this.getPlugin().getStartEventField());
		var eventStartMonth = Ext.Date.clearTime(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), 1));
		var retVal = Ext.Date.clearTime(r.get('Date'), true).getTime() > eventStartMonth.getTime();
		return retVal;
	},

	/**
	 * After the Event store has been processed, this method recursively creates and positions the Event Bars
	 * @method
	 * @private
	 * @param {Ext.data.Store} store The store to process - used to then recurse into
	 */
	renderEventBars: function(store, wrapperClass, wrapperElement, eventsPlugin, calendarView, viewModeProcessor){
		var me = this;

		store.each(function(record){
			var eventRecord = this.getPlugin().getEventRecord(record.get('EventID')),
				monthEl = this.getCalendar().getMonthCell(record.get('Date')),
				dayEl = this.getCalendar().getDateCell(record.get('Date')),
				doesWrap = this.eventBarDoesWrap(record),
				hasWrapped = this.eventBarHasWrapped(record),
				cssClasses  = [
					this.getPlugin().getEventBarCls(),
					'e-' + record.get('EventID'),
					(doesWrap ? ' wrap-end' : ''),
					(hasWrapped ? ' wrap-start' : ''),
					eventRecord.get(this.getPlugin().getCssClassField())
				];

			// create the event bar
			var eventBar = Ext.DomHelper.append(this.getPlugin().getEventWrapperEl(), {
				tag: 'div',
				style: {
					'background-color': eventRecord.get(this.getPlugin().colourField)
				},
				html: this.getPlugin().getEventBarTpl().apply(eventRecord.data),
				eventID: record.get('EventID'),
				cls: cssClasses.join(' ')
			}, true);

			if (this.allowEventDragAndDrop) {
				new Ext.util.Draggable(eventBar, {
					revert: true,

					/**
					 * Override for Ext.util.Draggable's onStart method to process the Event Bar's element before dragging
					 * and raise the 'eventdragstart' event
					 * @method
					 * @private
					 * @param {Event} e
					 */
					onStart: function(e){

						var draggable = this, eventID = draggable.el.getAttribute('eventID'), eventRecord = me.getPlugin().getEventRecord(eventID), eventBarRecord = me.getEventBarRecord(eventID);

						// Resize dragged Event Bar so it is 1 cell wide
						draggable.el.setWidth(draggable.el.getWidth() / eventBarRecord.get('BarLength'));
						// Reposition dragged Event Bar so it is in the middle of the User's finger.
						draggable.el.setLeft(e.startX - (draggable.el.getWidth() / 2));

						// hide all linked Event Bars
						me.calendar.element.select('div.' + eventRecord.internalId, me.calendar.element.dom).each(function(eventBar){
							if (eventBar.dom !== draggable.el.dom) {
								eventBar.hide();
							}
						}, this);

						Ext.util.Draggable.prototype.onStart.apply(this, arguments);

						me.calendar.fireEvent('eventdragstart', draggable, eventRecord, e);

						return true;
					}
				});
			}

			var headerHeight = this.getCalendar().element.select('thead', this.getCalendar().element.dom).first().getHeight();
			var bodyHeight = this.getCalendar().element.select('tbody', this.getCalendar().element.dom).first().getHeight();
			var monthRows = this.getCalendar().element.select('tbody > tr', this.getCalendar().element.dom);
			var rowCount = monthRows.getCount();
			var titleHeight = monthRows.first().select('thead').first().getHeight();
			var rowHeight = bodyHeight/rowCount;

			var dateIndex = this.getCalendar().getStore().findBy(function(dateRec){
				return dateRec.get('date').getTime() === Ext.Date.clearTime(record.get('Date'), true).getTime();
			}, this);

			var rowIndex = Math.floor(dateIndex / this.numberOfMonthColumns);
			var eventY = (rowHeight * rowIndex) + headerHeight + titleHeight;

			var barPosition = record.get('BarPosition'),
				barLength = record.get('BarLength'),
				monthCellX = (this.getCalendar().element.getWidth() / this.numberOfMonthColumns) * monthEl.dom.cellIndex,
				monthCellWidth = monthEl.getWidth(),
				eventBarHeight = eventBar.getHeight(),
				spacing = this.getPlugin().getEventBarSpacing();

			// set sizes and positions
			var left = monthCellX + (hasWrapped ? 0 : spacing),
				//top = eventY - eventBarHeight - (barPosition * (eventBarHeight + spacing)) - spacing,
				top = (barPosition * (eventBarHeight + spacing)) + spacing + eventY,
				width = (monthCellWidth * barLength) - (spacing * (doesWrap ? (doesWrap && hasWrapped ? 0 : 1) : 2))
			;

			eventBar.setLeft(left);
			eventBar.setTop(top);
			eventBar.setWidth(width);

			if (record.linked().getCount() > 0) {
				this.renderEventBars(record.linked());
			}
		}, this);
	}

});