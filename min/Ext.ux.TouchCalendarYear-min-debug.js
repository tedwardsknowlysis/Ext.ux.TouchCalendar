/**
 * @copyright     (c) 2012, by SwarmOnline.com
 * @date          29th May 2012
 * @version       0.1
 * @documentation  
 * @website        http://www.swarmonline.com
 */
/**
 * @class Ext.ux.TouchCalendar
 * @author Stuart Ashworth
 *
 * For use with Sencha Touch 2
 * 
 * This extension wraps the Ext.ux.TouchCalendarView in a Ext.Carousel component and allows the calendar to respond to swipe
 * gestures to switch the displayed period. It works by creating 3 Ext.ux.TouchCalendarViews and dynamically creating/removing
 * views as the user moves back/forward through time. 
 * 
 * ![Ext.ux.TouchCalendar Screenshot](http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendar-month-ss.png)
 * 
 * [Ext.ux.TouchCalendar Demo](http://www.swarmonline.com/Ext.ux.TouchCalendar/examples/Ext.ux.TouchCalendar.html)
 * 
 */
Ext.define('Ext.ux.TouchCalendar',{
	extend: 'Ext.carousel.Carousel',

	xtype: 'calendar',

	config: {

		/**
		 * @cfg {String} viewMode This config should not be used directly, instead the 'viewMode' config should be added to the 'viewConfig' config object. Use the setViewMode method to change the viewMode of the calendar at runtime.
		 * @accessor
		 */
		viewMode: 'month',

		/**
		* @cfg {Boolean} enableSwipeNavigate True to allow the calendar's period to be change by swiping across it.
		*/
		enableSwipeNavigate: true,

		/**
		* @cfg {Boolean/Object} enableSimpleEvents True to enable the Ext.ux.TouchCalendarSimpleEvents plugin. When true the Ext.ux.TouchCalendarSimpleEvents JS and CSS files
		* must be included and an eventStore option, containing an Ext.data.Store instance, be given to the viewConfig. If an object is passed in this is used as the config for the plugin.
		*/
		enableSimpleEvents: false,

		/**
		* @cfg {Boolean/Object} enableEventBars True to enable the Ext.ux.TouchCalendarEvents plugin. When true the Ext.ux.TouchCalendarEvents JS and CSS files
		* must be included and an eventStore option, containing an Ext.data.Store instance, be given to the viewConfig.  If an object is passed in this is used as the config for the plugin.
		*/
		enableEventBars: false,

		/**
		* @cfg {Object} viewConfig A set of configuration options that will be applied to the TouchCalendarView component
		*/
		viewConfig: {

		}
	},

	defaultViewConfig: {
		viewMode: 'MONTH',
		weekStart: 1,
		bubbleEvents: ['selectionchange']
	},

	indicator: false,

	initialize: function(){

		this.viewConfig = Ext.applyIf(this.viewConfig || {}, this.defaultViewConfig);

		this.viewConfig.currentDate = this.viewConfig.currentDate || this.viewConfig.value || new Date();

		this.setViewMode(this.viewConfig.viewMode.toUpperCase());

		this.initViews();

		Ext.apply(this, {
			cls: 'touch-calendar',
			activeItem: (this.getEnableSwipeNavigate() ? 1: 0),
			direction: 'horizontal'
		});

		this.setIndicator(false); // for some reason, indicator: false is not being applied unless explicitly set.
		this.setActiveItem(1); // for some reason, activeItem: 1 is not being applied unless explicitly set.

		this.on('selectionchange', this.onSelectionChange);
		this.on('activeitemchange', this.onActiveItemChange);

		if (this.getEnableSwipeNavigate()) {
			// Bind the required listeners
			this.on(this.element, {
				drag: this.onDrag,
				dragThreshold: 5,
				dragend: this.onDragEnd,
				direction: this.direction,
				scope: this
			});

			this.element.addCls(this.baseCls + '-' + this.direction);
		}
	},

	/**
	* Builds the necessary configuration object for the creation of the TouchCalendarView.
	* @param {Date} viewValue The date Value that the new TouchCalendarView will have
	* @method
	* @private
	* @return {Object} The new config object for the view
	*/
	getViewConfig: function(viewValue){
		var plugins = [];

		if(this.getEnableSimpleEvents()){
			var config = Ext.isObject(this.getEnableSimpleEvents()) ? this.getEnableSimpleEvents() : {};
			plugins.push(Ext.create('Ext.ux.TouchCalendarSimpleEvents', config));
		} else if (this.getEnableEventBars()){
			var config = Ext.isObject(this.getEnableEventBars()) ? this.getEnableEventBars() : {};
			plugins.push(Ext.create('Ext.ux.TouchCalendarEvents', config));
		}

		Ext.apply(this._viewConfig, {
			plugins: plugins,
			currentDate: viewValue,
			viewMode: this.getViewMode(),
			onTableHeaderTap: Ext.bind(this.onTableHeaderTap, this),
			bubbleEvents: ['periodchange', 'eventtap', 'selectionchange']
		});

		return this._viewConfig;
	},

	getViewDate: function(date, i){
		var scale = (this.getViewMode() === 'WEEK' ? 'DAY' : this.getViewMode().toUpperCase()),
		  number = (this.getViewMode() === 'WEEK' ? (8 * i) : i);

		return Ext.Date.add(date, Ext.Date[scale], number)
	},

	/**
	 * Creates all the TouchCalendarView instances needed for the Calendar
	 * @method
	 * @private
	 * @return {void}
	 */
	initViews: function(){
		var items = [];
		var origCurrentDate = Ext.Date.clone(this.viewConfig.currentDate),
		  i = (this.getEnableSwipeNavigate() ? -1 : 0),
		  iMax = (this.getEnableSwipeNavigate() ? 1 : 0),
		  plugins = [];

		// first out of view
		var viewValue = this.getViewDate(origCurrentDate, -1);
		items.push(
		    Ext.create('Ext.ux.TouchCalendarView', Ext.applyIf({
		        currentDate: viewValue
		      }, this.getViewConfig(viewValue)))
		);

		// active view
		items.push(
			Ext.create('Ext.ux.TouchCalendarView', Ext.ux.TouchCalendarView(this.getViewConfig(origCurrentDate)))
		);

		// second out of view (i.e. third)
		viewValue = this.getViewDate(origCurrentDate, 1);
		items.push(
			Ext.create('Ext.ux.TouchCalendarView', Ext.ux.TouchCalendarView(Ext.applyIf({
		        currentDate: viewValue
		    }, this.getViewConfig(viewValue))))
		);

		this.setItems(items);
		this.view = items[(this.getEnableSwipeNavigate() ? 1: 0)];
	},

	/**
	* Override for the TouchCalendarView's onTableHeaderTap method which is executed when the view's header (specificly the arrows) is tapped.
	* When using the TouchCalendar wrapper we must intercept it and use the carousel's prev/next methods to do the switching.
	*/
	onTableHeaderTap: function(e, el){
		el = Ext.fly(el);

		if (el.hasCls(this.view.getPrevPeriodCls()) || el.hasCls(this.view.getNextPeriodCls())) {
			this[(el.hasCls(this.view.getPrevPeriodCls()) ? 'previous' : 'next')]();
		}
	},

	applyViewMode: function(mode){
		return mode.toUpperCase();
	},

	/**
	* Changes the mode of the calendar to the specified string's value. Possible values are 'month', 'week' and 'day'.
	* @method
	* @returns {void}
	*/
	updateViewMode: function(mode){
		this.viewConfig = this.viewConfig || {};
		this.viewConfig.viewMode = mode;

		if(this.view){
			Ext.each(this.getInnerItems(), function(view, index){
				view.currentDate = this.getViewDate(Ext.Date.clone(this.view.currentDate), index-1);

				view.setViewMode(mode, true);
				view.refresh();
			}, this);
		}
	},

	/**
	* Returns the Date that is selected.
	* @method
	* @returns {Date} The selected date
	*/
	getValue: function(){
		var selectedDates = this.view.getSelected();

		return (selectedDates.length > 0) ? selectedDates : null;
	},

	/**
	* Set selected date.
	* @method
	* @param {Date} v Date to select.
	* @return {void}
	*/
	setValue: function(v) {
		this.view.setValue(v)
	},

	/**
	 * Override of the onCardSwitch method which adds a new card to the end/beginning of the carousel depending on the direction configured with the next period's
	 * dates.
	 * @method
	 * @private
	 */
	onActiveItemChange: function(container, newCard, oldCard){
		if (this.getEnableSwipeNavigate()) {
			var items = this.getItems();
			var newIndex = items.indexOf(newCard), oldIndex = items.indexOf(oldCard), direction = (newIndex > oldIndex) ? 'forward' : 'backward';

			this.counter = (this.counter || 0) + 1;

			if (direction === 'forward') {
				this.remove(items.get(0));
				var newCalendar = new Ext.ux.TouchCalendarView(this.getViewConfig(this.getViewDate(newCard.currentDate, 1)));
				this.add(newCalendar);
			}
			else {
				this.remove(items.get(items.getCount() - 1));
				var newCalendar = new Ext.ux.TouchCalendarView(this.getViewConfig(this.getViewDate(newCard.currentDate, -1)));
				this.insert(0, newCalendar);
			}

			this.view = newCard;

			var dateRange = this.view.getPeriodMinMaxDate();
			this.fireEvent('periodchange', this.view, dateRange.min.get('date'), dateRange.max.get('date'), direction);
		}
	}
    
    
});
/**
 * @copyright     (c) 2012, by SwarmOnline.com
 * @date          29th May 2012
 * @version       0.1
 * @documentation
 * @website        http://www.swarmonline.com
 */
/**
 * @class Ext.ux.TouchCalendarView
 * @author Stuart Ashworth
 *
 * For use with Sencha Touch 2
 *
 */
Ext.define('Ext.ux.TouchCalendarView', {
	xtype: 'TouchCalendarView',
	extend: 'Ext.Container',

	alias: 'widget.touchcalendarview',

    config: {
        /**
         * @cfg {String} viewMode The mode the Calendar will be displayed in. Possible values 'month', 'week' or 'day'.
         */
        viewMode: 'month',

        /**
         * cfg {Number} weekStart Starting day of the week. (0 = Sunday, 1 = Monday ... etc)
         */
        weekStart: 1,

        /**
         * @cfg {String} todayCls CSS class added to the today's date cell
         */
        todayCls: 'today',

        /**
         * @cfg {String} selectedItemCls CSS class added to the date cell that is currently selected
         */
        selectedItemCls: 'selected',

        /**
         * @cfg {String} unselectableCls CSS class added to any date cells that are unselectable
         */
        unselectableCls: 'unselectable',

        /**
         * @cfg {String} prevMonthCls CSS class added to any date cells that are part of the previous month
         */
        prevMonthCls: 'prev-month',

        /**
         * @cfg {String} nextMonthCls CSS class added to any date cells that are part of the next month
         */
        nextMonthCls: 'next-month',

        /**
         * @cfg {String} weekendCls CSS class added to any date cells that are on the weekend
         */
        weekendCls: 'weekend',

        /**
         * @cfg {String} prevPeriodCls CSS class added to the previous period navigation cell in the calendar's header
         */
        prevPeriodCls: 'goto-prev',

        /**
         * @cfg {String} nextPeriodCls CSS class added to the next period navigation cells in the calendar's header
         */
        nextPeriodCls: 'goto-next',

        /**
         * @cfg {Number} dayTimeSlotSize The number of minutes the Day View's time slot will increment by. Defaults to 30 minutes.
         */
        dayTimeSlotSize: 30,

	    /**
	     * @cfg {Object} timeSlotDateTpls The templates to be used for the rendering of the Date labels. This should be supplied as an object with
	     * a key relating to the template for each View Mode. For example:
	     * {
	     *     day: '<template>',
	     *     month: '<template>',
	     *     week: '<template>'
	     * }
	     *
	     * The values can be either strings (which will be used to create an Ext.XTemplate) or an Ext.XTemplate instance.
	     *
	     * Defaults to:
	     * {
	     *    day   : '<span class="hour">{date:date("g")}</span><span class="am-pm">{date:date("A")}</span>',
	     *    month : '{date:date("j")}',
	     *    week  : '{date:date("j")}'
	     * }
	     */
	    timeSlotDateTpls: {},
	    
	    /**
	     * @cfg {Ext.data.Store} eventStore This config is used when the CalendarView is combined with
	     * the TouchCalendarEvents or TouchCalendarSimpleEvents plugins and is used as the source of
	     * events to render onto the calendar. The Model used in this store should have at the least a Start Date and End Date field
	     * that can be customised from the default values using the 'startEventField' and 'endEventField' config options of the Event plugin.
	     */
		eventStore: null,

	    /**
	     * @cfg {Boolean} hideHalfHourTimeSlotLabels Determines if the half-hour time slot labels are hidden in the Day View.
	     * Defaults to true
	     */
	    hideHalfHourTimeSlotLabels: true,

        value: null,

        store: null,

        baseTpl: [
                    '<table class="{[this.me.getViewMode().toLowerCase()]}">',
                        '<thead>',
                            '<tr>',
                                '<tpl for="this.getDaysArray(values)">',
                                    '<th class="{[this.getHeaderClass(xindex)]}">',
                                        '<tpl if="xindex === 4">',
                                            '<span>{[Ext.Date.format(this.me.currentDate, "F")]} {[Ext.Date.format(this.me.currentDate, "Y")]}</span>',
                                        '</tpl>',
                                        '{date:date("D")}',
                                    '</th>',
                                '</tpl>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tr class="time-block-row">',
                            '<tpl for=".">',

                                '<td class="time-block {[this.getClasses(values)]}" datetime="{[this.me.getDateAttribute(values.date)]}">',
                                    '{date:this.formatDate()}',
                                '</td>',

                                '<tpl if="this.isEndOfRow(xindex)">',
                                    '</tr>',
                                    '<tpl if="!this.isEndOfPeriod(xindex)">',
                                        '<tr>',
                                    '</tpl>',
                                '</tpl>',

                            '</tpl>',
                            '</tr>',
                        '</tbody>',
                    '</table>'],

        cls: 'touch-calendar-view',

		timeBlockCls: 'time-block',
		timeBlockName: 'time-block',
        itemSelector: 'td.time-block'

    },

	applyEventStore: function (value) {
		if (typeof value === "string") {
			value = Ext.getStore(value);
		}
		if (!(value instanceof Ext.data.Store)) {
			throw "Value must be an instance of 'Ext.data.Store'!";
			return null;
		}
		this.eventStore = value;
		return value;
	},

	// default TimeSlot date templates that are merged with the supplied config
	timeSlotDateTplsDefaults: {
		day     : '<span class="hour">{date:date("g")}</span><span class="am-pm">{date:date("A")}</span>',
		month   : '{date:date("j")}',
		week    : '{date:date("j")}'
	},

    /**
   	 * Object containing common functions to be passed to XTemplate for internal use
   	 * @property {Object} commonTemplateFunctions
   	 * @private
   	 */
   	commonTemplateFunctions: {

	    /**
	     * Returns a string of CSS classes to be applied to the time slot's TR tags.
	     * This is only used in the Day View template.
	     * @method
	     * @private
	     * @param {Date} date The date for the current time slot
	     * @return {String} A string of CSS classes
	     */
	    getTimeSlotRowCls: function(date){
		    var classes         = [],
			    isHalfHourly    = date.getMinutes() !== 0;

		    if(isHalfHourly){
			    classes.push('half-hour');
		    }

		    return classes.join(' ');
	    },

	    /**
	     * Returns true determining if the date is a half-hour slot. Only used in the Day View.
	     * @method
	     * @private
	     * @param {Date} date The date for the current time slot.
	     * @return {Boolean}
	     */
	    isHalfHour: function(date){
		    return date.getMinutes() !== 0;
	    },

	    /**
	     * Uses the templates defined in the 'timeSlotDateTpls' config to format the date HTML.
	     * @method
	     * @private
	     * @param {Date} date The date for the current time slot.
	     * @return {String} HTML output from date template
	     */
	    formatDate: function(date){
			return this.getTimeSlotDateTpl().apply({date: date});
	    },

	    /**
	     * Returns the appropriate TimeSlotDateTpl for the current View Mode.
	     * @method
	     * @private
	     * @return {Ext.XTemplate}
	     */
	    getTimeSlotDateTpl: function(){
			var mode = this.me.getViewMode().toLowerCase();

		    return this.me.getTimeSlotDateTpls()[mode];
	    },

   		/**
   		 * Gets the classes that should be applied to the current day's cell
   		 * @method
   		 * @private
   		 * @param {Object} values
   		 * @return {String}
   		 */
   		getClasses: function(values){
   			var classes = [];

   			if(values.selected){
   				classes.push(this.me.getSelectedItemCls());
   			}
   			if(values.unselectable){
   				classes.push(this.me.getUnselectableCls());
   			}
   			if(values.prevMonth){
   				classes.push(this.me.getPrevMonthCls());
   			}
   			if(values.nextMonth){
   				classes.push(this.me.getNextMonthCls());
   			}
   			if(values.weekend){
   				classes.push(this.me.getWeekendCls());
   			}
   			if(values.today){
   				classes.push(this.me.getTodayCls());
   			}

   			return classes.join(' ');
   		},

   		/**
		 * Returns true if the specific index is at the end of the row
		 * Used to determine if a row terminating tag is needed
		 * @method
		 * @private
		 * @param {Number} currentIndex
		 * @return {Boolean}
		 */
		isEndOfRow: function(currentIndex){
			return (currentIndex % 7) === 0 && (currentIndex > 0);
		},

		/**
   		 * Returns true if the specific index is at the start of the row.
   		 * USed to determine whether if a row opening tag is needed
   		 * @method
   		 * @private
   		 * @param {Number} currentIndex
   		 * @return {Boolean}
   		 */
   		isStartOfRow: function(currentIndex){
   			return ((currentIndex-1) % 7) === 0 && (currentIndex-1 >= 0);
   		},

	    isEndOfPeriod: function(currentIndex){
			return currentIndex % this.me.periodRowDayCount === 0;
	    },

   		/**
   		 * Gets an array containing the first 7 dates to be used in headings
   		 * @method
   		 * @private
   		 * @param {Object} values
   		 * @return {Date[]}
   		 */
   		getDaysArray: function(values){
   			var daysArray = [],
   				i;

   			for(i = 0; i < this.me.periodRowDayCount; i++){
   				daysArray.push(values[i]);
   			}

   			return daysArray;
   		},

   		/**
   		 * Gets the class to be added to the header cells
   		 * @method
   		 * @private
   		 * @param {Number} currentIndex
   		 * @return {Boolean}
   		 */
   		getHeaderClass: function(currentIndex){
   			return currentIndex === 1 ? this.me.getPrevPeriodCls() : currentIndex === 7 ? this.me.getNextPeriodCls() : '';
   		}
   	},

	constructor: function(config){
		
		this.initModel();
		
		var store = Ext.create('Ext.data.Store', {
	        model: 'TouchCalendarViewModel'
	    });

	    this.setStore(store);

		// merge the supplied TimeSlot Date tpls with the defaults
		config.timeSlotDateTpls = config.timeSlotDateTpls || {};
		Ext.applyIf(config.timeSlotDateTpls, this.timeSlotDateTplsDefaults);

		Ext.apply(this, config || {
		});
		
        /**
         * @event selectionchange Fires when the Calendar's selected date is changed
         * @param {Ext.ux.TouchCalendarView} this
         * @param {Date} newDate The new selected date
         * @param {Date} oldDate The previously selected date
         */

        /**
         * @event periodchange Fires when the calendar changes to a different date period (i.e. switch using the arrows)
         * @param {Ext.ux.TouchCalendarView} this
         * @param {Date} minDate New view's minimum date
         * @param {Date} maxDate New view's maximum date
         * @param {string} direction Direction that the view moved ('forward' or 'back')
         */
		
		this.callParent(arguments);

		this.minDate = this.minDate ? Ext.Date.clearTime(this.minDate, true) : null;
		this.maxDate = this.maxDate ? Ext.Date.clearTime(this.maxDate, true) : null;

        this.refresh();
    },
    
	/**
	 * Override of onRender method. Attaches event handlers to the element to handler
	 * day taps and period switch taps
	 * @method
	 * @private
	 * @return {void}
	 */
	initialize: function() {

		this.element.on({
			tap: this.onTableHeaderTap,
			scope: this,
			delegate: 'th'
		});

        this.element.on({
            tap: this.onTimeSlotTap,
            scope: this,
            delegate: this.getItemSelector()
        });

        this.on({
            painted: this.syncHeight,
            resize: this.onComponentResize,
		    scope: this
        });

        this.callParent();
	},

	/**
	 * Creates the Calendar's Model if it doesn't already exist
	 * @method
	 * @private
	 */
	initModel: function(){
		if(!Ext.ModelManager.isRegistered('TouchCalendarViewModel')) // TODO: Throws an error in opening Ext.ux.TouchCalendar.html example?? 
		{
			Ext.define('TouchCalendarViewModel', {
				extend: 'Ext.data.Model',
                config: {
                    fields: [
                        {name: 'date', type: 'date'},
                        {name: 'today', type: 'boolean'},
                        {name: 'unselectable', type: 'boolean'},
                        {name: 'selected', type: 'boolean'},
                        {name: 'prevMonth', type: 'boolean'},
                        {name: 'nextMonth', type: 'boolean'},
                        {name: 'weekend', type: 'boolean'},
                        'timeSlots'
                    ]
                }
			});
		}
	},

    /**
     * Updater for the viewMode configuration option.
     * Refreshes the calendar once the new viewMode is applied and set.
     * @param viewMode
     * @param oldViewMode
     */
    updateViewMode: function(viewMode, oldViewMode){
        this.refresh();

	    // fire periodchange event
	    var minMaxDate = this.getPeriodMinMaxDate();

	    this.fireEvent('periodchange', this, minMaxDate.min.get('date'), minMaxDate.max.get('date'), 'none');
    },
	
	/**
	 * Applies the view mode change requested to the Calendar. Possible values are 'month', 'week' or 'day'.
	 * @param {String} viewMode Either 'month', 'week' or 'day'
	 */
	applyViewMode: function(viewMode){
		viewMode = viewMode.toUpperCase();

        var viewModeFns = Ext.ux.TouchCalendarView[viewMode.toUpperCase()];

		// Update the mode specific functions/values
        this.getStartDate = viewModeFns.getStartDate;
        this.getTotalDays = viewModeFns.getTotalDays;
        this.dateAttributeFormat = viewModeFns.dateAttributeFormat;
        this.getNextIterationDate = viewModeFns.getNextIterationDate;
        this.getDeltaDate = viewModeFns.getDeltaDate;
        this.periodRowDayCount = viewModeFns.periodRowDayCount;

        Ext.apply(this.commonTemplateFunctions, {me: this})

		// Create the template
		this.setTpl(new Ext.XTemplate((viewModeFns.tpl || this.getBaseTpl()).join(''), this.commonTemplateFunctions));

		this.setScrollable({
			direction: viewMode.toUpperCase() === 'DAY' ? 'vertical' : false,
			directionLock: true
		});

        return viewMode;
	},

    collectData: function(records){
        var data = [];

        Ext.each(records, function(record, index){
            data.push(record.data);
        }, this);

        return data;
    },

	setCurrentDate: function(date) {
		if (this.getCurrentDate() !== date) {
			this.currentDate = date;
			this.refresh();
		}
	},
	getCurrentDate: function() {
		return this.currentDate;
	},

	/**
	 * Builds a collection of dates that need to be rendered in the current configuration
	 * @method
	 * @private
	 * @return {void}
	 */
	populateStore: function(){
		this.currentDate = this.currentDate || this.value || new Date();

		var unselectable = true, // variable used to indicate whether a day is allowed to be selected
			baseDate = this.currentDate, // date to use as base
			iterDate = this.getStartDate(baseDate), // date current mode will start at
			totalDays = this.getTotalDays(baseDate), // total days to be rendered in current mode
            record;

		this.getStore().suspendEvents();
		this.getStore().data.clear();

		// create dates based on startDate and number of days to render
		for(var i = 0; i < totalDays; i++){

			// increment the date by one day (except on first run)
			iterDate = this.getNextIterationDate(iterDate, (i===0?0:1));

			unselectable = (this.minDate && iterDate < this.minDate) || (this.maxDate && iterDate > this.maxDate);

            record = Ext.create('TouchCalendarViewModel', {
                today: this.isSameDay(iterDate, new Date()),
                unselectable: unselectable,
                selected: this.isSameDay(iterDate, this.value) && !unselectable,
                prevMonth: (iterDate.getMonth() < baseDate.getMonth()),
                nextMonth: (iterDate.getMonth() > baseDate.getMonth()),
                weekend: this.isWeekend(iterDate),
                date: iterDate
            });

			this.getStore().add(record);
		}

		this.getStore().resumeEvents();
	},

	/**
	 * Refreshes the calendar moving it forward (delta = 1) or backward (delta = -1)
	 * @method
	 * @param {Number} delta - integer representing direction (1 = forward, =1 = backward)
	 * @return {void}
	 */
	refreshDelta: function(delta) {
		var v = this.currentDate || new Date();

		var newDate = this.getDeltaDate(v, delta);

		// don't move if we've reached the min/max dates
		if (this.isOutsideMinMax(newDate)) {
			return;
		}

		this.currentDate = newDate;

		this.refresh();

		var minMaxDate = this.getPeriodMinMaxDate();

		this.fireEvent('periodchange', this, minMaxDate.min.get('date'), minMaxDate.max.get('date'), (delta > 0 ? 'forward' : 'back'));
	},

	/**
	 * Returns the current view's minimum and maximum date collection objects
	 * @method
	 * @private
	 * @return {Object} Object in the format {min: {}, max: {}}
	 */
	getPeriodMinMaxDate: function(){
		return {
			min: this.getStore().data.first(),
			max: this.getStore().data.last()
		};
	},

	/**
	 * Returns true or false depending on whether the view that is currently on display is outside or inside the min/max dates set
	 * @method
	 * @private
	 * @param {Date} date A date within the current period, generally the selected date
	 * @return {Boolean}
	 */
	isOutsideMinMax: function(date){
		var outside = false;

		if(this.getViewMode() === 'YEAR'){
			outside = date.getUTCFullYear() < 2014;
		} else if(this.getViewMode() === 'MONTH'){
			outside = ((this.minDate && Ext.Date.getLastDateOfMonth(date) < this.minDate) || (this.maxDate && Ext.Date.getFirstDateOfMonth(date) > this.maxDate));
		} else {
			outside = ((this.minDate && this.getWeekendDate(date) < this.minDate) || (this.maxDate && this.getStartDate(date) > this.maxDate));
		}

		return outside;
	},

	/**
	 * Handler for a tap on the table header
	 * @method
	 * @private
	 * @param {Object} e
	 * @param {Object} el
	 * @return {void}
	 */
	onTableHeaderTap: function(e, el){
		el = Ext.fly(el);

		if (el.hasCls(this.getPrevPeriodCls()) || el.hasCls(this.getNextPeriodCls())) {
			this.refreshDelta(el.hasCls(this.getPrevPeriodCls()) ? -1 : 1);
		}
	},

    /**
     * Handler for taps on the Calendar's timeslot elements.
     * Processes the tapped element and selects it visually then fires the selectionchange event
     * @method
     * @private
     * @param {Ext.EventObject} e The taps event object
     * @return {void}
     */
    onTimeSlotTap: function(e){
	    if(!e.getTarget('.' + this.getUnselectableCls())){ // don't do selection if the cell has 'unselectable' class
		    var target = Ext.fly(e.getTarget());

	        this.selectCell(target);

	        var newDate = this.getCellDate(target);

	        var previousValue = this.getValue() || this.currentDate;

		    // don't fire the event if the values are the same
		    if(newDate.getTime() !== previousValue.getTime()){
	            this.setValue(newDate);

	            this.fireEvent('selectionchange', this, newDate, previousValue, e);
		    }
			this.fireEvent('timeslottap', this, newDate, previousValue, e);
	    }
    },

	/**
	 * Handler for the component's resize event.
	 * This is required to sync the height of the calendar's table so it keeps filling the screen.
	 * @method
	 * @private
	 * @param comp
	 */
	onComponentResize: function(comp){
		this.syncHeight();
	},

	/**
	 * Override for the Ext.DataView's refresh method. Repopulates the store, calls parent then sync the height of the table
	 * @method
	 */
	refresh: function(){
		this.populateStore();

        var records = this.getStore().getRange();

        this.setData(this.collectData(records));

        this.syncHeight();
	},

    /**
   	 * Syncs the table's Ext.Element to the height of the Ext.DataView's component. (Only if it isn't in DAY mode)
   	 */
   	syncHeight: function(){
        if (this.getViewMode().toUpperCase() !== 'DAY') {
   			var tableEl = this.element.select('table', this.element.dom).first();

            if(tableEl){
                tableEl.setHeight(this.element.getHeight());
            }
   		}
   	},

	/**
	 * Selects the specified cell
	 * @method
	 * @param {Ext.Element} cell
	 */
	selectCell: function(cell){
        var selCls = this.getSelectedItemCls();

        var selectedEl = this.element.select('.' + selCls, this.element.dom);

        if(selectedEl){
            selectedEl.removeCls(selCls);
        }

        cell.addCls(selCls);

		cell.up('tr').addCls(selCls);
	},

	/**
	 * Returns the TouchCalendarViewModel model instance containing the passed in date
	 * @method
	 * @private
	 * @param {Date} date
	 */
	getDateRecord: function(date){
		return this.getStore().findBy(function(record){
			var recordDate = Ext.Date.clearTime(record.get('date'), true).getTime();

            return recordDate === Ext.Date.clearTime(date, true).getTime();
		}, this);
	},

	/**
	 * Returns the same day
	 * @method
	 * @private
	 * @param {Date} date
	 * @return {Date}
	 */
	getDayStartDate: function(date){
		return date;
	},

	/**
	 * Returns true if the two dates are the same date (ignores time)
	 * @method
	 * @private
	 * @param {Date} date1
	 * @param {Date} date2
	 * @return {Boolean}
	 */
	isSameDay: function(date1, date2){
		if(!date1 || !date2){
			return false;
		}
		return Ext.Date.clearTime(date1, true).getTime() === Ext.Date.clearTime(date2, true).getTime();
	},

	/**
	 * Returns true if the specified date is a Saturday/Sunday
	 * @method
	 * @private
	 * @param {Object} date
	 * @return {Boolean}
	 */
	isWeekend: function(date){
		return date.getDay() === 0 || date.getDay() === 6;
	},

	/**
	 * Returns the last day of the week based on the specified date.
	 * @method
	 * @private
	 * @param {Date} date
	 * @return {Date}
	 */
	getWeekendDate: function(date){
		var dayOffset = date.getDay() - this.getWeekStart();
		dayOffset = dayOffset < 0 ? 6 : dayOffset;

		return new Date(date.getFullYear(), date.getMonth(), date.getDate()+0+dayOffset);
	},

	/**
	 * Returns the Date associated with the specified cell
	 * @method
	 * @param {Ext.Element} dateCell
	 * @return {Date}
	 */
	getCellDate: function(dateCell) {
		var date = dateCell.dom.getAttribute('datetime');
		return this.stringToDate(date);
	},

	/**
	 * Returns the cell representing the specified date
	 * @method
	 * @param {Ext.Element} date
	 * @return {Ext.Element}
	 */
	getDateCell: function(date){
		return this.element.select('td[datetime="' + this.getDateAttribute(date) + '"]', this.element.dom).first();
	},

	/**
	 * Returns the cell representing the specified date
	 * @method
	 * @param {Ext.Element} date
	 * @return {Ext.Element}
	 */
	getMonthCell: function(date){
		var monthDate = new Date(date.getFullYear(), date.getMonth(), 1);
		return this.element.select('td[datetime="' + this.getDateAttribute(monthDate) + '"]', this.element.dom).first();
	},

	/**
	 * Returns a string format of the specified date
	 * Used when assigning the datetime attribute to a table cell
	 * @method
	 * @private
	 * @param {Date} date
	 * @return {String}
	 */
	getDateAttribute: function(date){
		return Ext.Date.format(date, this.dateAttributeFormat);
	},

	/**
	 * Returns an array of Dates that are selected in the current TouchCalendarView.
	 * @method
	 * @public
	 * @returns {Date[]}
	 */
	getSelected: function(){
		var selectedCells = this.element.select('td.' + this.getSelectedItemCls(), this.element.dom),
			dates = [];

		selectedCells.each(function(cell){
			dates.push(this.getCellDate(cell));
		}, this);

		return dates;
	},

	/**
	 * Converts a string date (used to add to table cells) to a Date object
	 * @method
	 * @private
	 * @param {String} dateString
	 * @return {Date}
	 */
	stringToDate: function(dateString) {
		return Ext.Date.parseDate(dateString, this.dateAttributeFormat);
	},

	/**
	 * Creates an Ext.XTemplate instance for any TimeSlotDateTpls that are defined as strings.
	 * @method
	 * @private
	 * @param {Object} value
	 * @return {Object}
	 */
	applyTimeSlotDateTpls: function(value){
		Ext.Object.each(value, function(key, val){
			if(Ext.isString){
				value[key] = Ext.create('Ext.XTemplate', val);
			}
		}, this)

		return value;
	},

	statics: {
		YEAR: {
			dateAttributeFormat: 'd-m-Y',

			/**
			 * Called during the View's Store population. This calculates the next date for the current period.
			 * The YEAR mode's version just adds 1 (or 0 on the first iteration) to the specified date.
			 * @param {Date} d Current Iteration date
			 * @param {Number} index
			 */
			getNextIterationDate: function(d, index){
				return new Date(d.getFullYear(), d.getMonth()+ (index===0?0:1), d.getDate());
			},

			/**
			 * Returns the total number of days to be shown in this view.
			 * @method
			 * @private
			 * @param {Date} date
			 */
			getTotalDays: function(date){
				//return 365 + Ext.Date.isLeapYear(date) ? 1 : 0;
				return 12;
			},

			/**
			 * Returns the first day that should be visible for a year view
			 * @method
			 * @private
			 * @param {Date} date
			 * @return {Date}
			 */
			getStartDate: function(date){
				return new Date(date.getFullYear(), 0, 1);
			},

			/**
			 * Returns a new date based on the date passed and the delta value for YEAR view.
			 * @method
			 * @private
			 * @param {Date} date
			 * @param {Number} delta
			 * @return {Date}
			 */
			getDeltaDate: function(date, delta){
				var newYear = date.getFullYear() + delta,
					newDate = new Date(newYear, 0, 1);
				return newDate;
			},

			periodRowDayCount: 90,
			tpl: [
				'<table class="{[this.me.getViewMode().toLowerCase()]}">',
					'<thead>',
						'<tr>',
							'<th class="year {[this.me.getPrevPeriodCls()]}" style="display: block;"></th>',
							'<th><span class="YearTitle">{[Ext.Date.format(values[0].date, "Y")]}</span></th>',
							'<th class="year {[this.me.getNextPeriodCls()]}" style="display: block;"></th>',
						'</tr>',
					'</thead>',
					'<tbody>',
				'<tpl for=".">',
					'<tpl if="xindex % 3 === 1">',
						'<tr class="time-block-row calendarrow quarter{[Math.floor(xindex / 3) + 1]}">',
					'</tpl>',
					'<td datetime="{[this.me.getDateAttribute(values.date)]}" class="{[this.me.getTimeBlockName()]} {[this.me.getTimeBlockCls()]}">',
						'<table>',
							'<thead>',
								'<tr><th class="MonthTitleBar"><span class="MonthTitle">{[Ext.Date.format(values.date, "M")]}</span></th></tr></tr>',
							'</thead>',
							'<tbody>',
							'</tbody>',
						'</table>',
					'</td>',
					'<tpl if="xindex % 3 === 0">',
						'</tr>',
					'</tpl>',
				'</tpl>',
					'</tbody>',
				'</table>'
			]
		},

		MONTH: {

				dateAttributeFormat: 'd-m-Y',

				/**
				 * Called during the View's Store population. This calculates the next date for the current period.
				 * The MONTH mode's version just adds 1 (or 0 on the first iteration) to the specified date.
				 * @param {Date} d Current Iteration date
				 * @param {Number} index
				 */
				getNextIterationDate: function(d, index){
					return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (index===0?0:1));
				},

				/**
				 * Returns the total number of days to be shown in this view.
				 * @method
				 * @private
				 * @param {Date} date
				 */
				getTotalDays: function(date){
					var firstDate = Ext.Date.getFirstDateOfMonth(date);

					return this.isWeekend(firstDate) ? 42 : 35;
				},

				/**
				 * Returns the first day that should be visible for a month view (may not be in the same month)
				 * Gets the first day of the week that the 1st of the month falls on.
				 * @method
				 * @private
				 * @param {Date} date
				 * @return {Date}
				 */
				getStartDate: function(date){
					return Ext.bind(Ext.ux.TouchCalendarView.WEEK.getStartDate, this)(new Date(date.getFullYear(), date.getMonth(), 1));
				},

				/**
				 * Returns a new date based on the date passed and the delta value for MONTH view.
				 * @method
				 * @private
				 * @param {Date} date
				 * @param {Number} delta
				 * @return {Date}
				 */
				getDeltaDate: function(date, delta){
					var newMonth = date.getMonth() + delta,
						newDate = new Date(date.getFullYear(), newMonth, 1);

					newDate.setDate(Ext.Date.getDaysInMonth(newDate) < date.getDate() ? Ext.Date.getDaysInMonth(newDate) : date.getDate());

					return newDate;
				},

				periodRowDayCount: 7
			},

			WEEK: {

				dateAttributeFormat: 'd-m-Y',

				/**
				 * Called during the View's Store population. This calculates the next date for the current period.
				 * The WEEK mode's version just adds 1 (or 0 on the first iteration) to the specified date.
				 * @param {Date} d Current Iteration date
				 * @param {Number} index
				 */
				getNextIterationDate: function(d, index){
					return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (index===0?0:1));
				},

				/**
				 * Returns the total number of days to be shown in this view.
				 * As it is the WEEK view it is always 7
				 * @method
				 * @private
				 * @param {Date} date
				 */
				getTotalDays: function(date){
					return 7;
				},

				/**
				 * Returns the first day of the week based on the specified date.
				 * @method
				 * @private
				 * @param {Date} date
				 * @return {Date}
				 */
				getStartDate: function(date){
					var dayOffset = date.getDay() - this.getWeekStart();
					dayOffset = dayOffset < 0 ? 6 : dayOffset;

					return new Date(date.getFullYear(), date.getMonth(), date.getDate()-0-dayOffset);
				},

				/**
				 * Returns a new date based on the date passed and the delta value for WEEK view.
				 * @method
				 * @private
				 * @param {Date} date
				 * @param {Number} delta
				 * @return {Date}
				 */
				getDeltaDate: function(date, delta){
					return new Date(date.getFullYear(), date.getMonth(), date.getDate() + (delta * 7));
				},

				periodRowDayCount: 7
			},

			DAY: {
					/**
					 * Date format that the 'datetime' attribute, given to each time slot, has. Day mode needs the time in as well so
					 * events etc know what time slot it is
					 */
					dateAttributeFormat: 'd-m-Y H:i',

					/**
					 * Template for the DAY view
					 */
					tpl: [
						'<table class="{[this.me.getViewMode().toLowerCase()]}">',
                            '<thead>',
                                '<tr>',
                                    '<th class="{[this.me.getPrevPeriodCls()]}" style="display: block;">',
                                    '</th>',
                                    '<th>',
                                        '<span>{[Ext.Date.format(values[0].date, "D jS M Y")]}</span>',
                                    '</th>',
                                    '<th class="{[this.me.getNextPeriodCls()]}" style="display: block;">',
                                    '</th>',
                                '</tr>',
                            '</thead>',
							'<tbody>',
								'<tr>',
									'<td colspan="3">',
										'<table class="time-slot-table">',
											'<tpl for=".">',
												'<tr class="{[this.getTimeSlotRowCls(values.date)]}">',

													'<td class="label">',

														'<tpl if="!this.me.getHideHalfHourTimeSlotLabels() || !this.isHalfHour(values.date)">',
															'{date:this.formatDate()}',
														'</tpl>',

													'</td>',
													'<td class="time-block" colspan="2" datetime="{[this.me.getDateAttribute(values.date)]}">',
													'</td>',
												'</tr>',
											'</tpl>',
										'</table>',
									'</td>',
								'</tr>',
							'</tbody>',
						'</table>'],
						
					/**
					 * Called during the View's Store population. This calculates the next date for the current period.
					 * The DAY mode's version just adds another time period on.
					 * @param {Date} currentIterationDate
					 * @param {Number} index
					 */
					getNextIterationDate: function(currentIterationDate, index){
						var d = currentIterationDate.getTime() + ((index===0?0:1) * (this.getDayTimeSlotSize() * 60 * 1000));
						
						return new Date(d);
					},
	
					/**
					 * Returns the total number of time slots to be shown in this view.
					 * This is derived from the dayTimeSlotSize property
					 * @method
					 * @private
					 * @param {Date} date
					 */
					getTotalDays: function(date){
						return 1440 / this.getDayTimeSlotSize();
					},
					
					/**
					 * Returns the same date as passed in because there is only one date visible
					 * @method
					 * @private
					 * @param {Date} date
					 * @return {Date}
					 */
					getStartDate: function(date){
						return Ext.Date.clearTime(date, true);
					},
					
					/**
					 * Returns a new date based on the date passed and the delta value for DAY view.
					 * @method
					 * @private
					 * @param {Date} date
					 * @param {Number} delta
					 * @return {Date}
					 */
					getDeltaDate: function(date, delta){
						return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);
					},

					periodRowDayCount: 1
				}
	}
});

/**
 * Ext.ux.TouchCalendarEventsBase
 */
Ext.define('Ext.ux.TouchCalendarEventsBase', {

    extend: 'Ext.Base',

	config: {
		calendar: null,
		plugin: null,

		/**
		 * @accessor {Object} eventsPerTimeSlot Tracks the number of events that occur in specified time slots so it can be used to calculate widths
		 * when rendering. The counts are only stored if 1 or more events exist. The numeric value of the time slot's date (i.e. date.getTime()) is used
		 * as the key with the count as the value.
		 * @private
		 */
		eventsPerTimeSlot: {},

		/**
		 * @accessor {String} eventSortDirection Used to define the sort direction the Event Store is sorted in while generating the Event models.
		 * This is required to be configurable because Month/Week modes work from bottom to top, whereas Day view works from left to right so we want the ordering to be different.
		 * Default to 'DESC' for the Month and Week views.
		 */
		eventSortDirection: 'ASC'
	},

	constructor: function(config){
		this.initConfig(config);

		this.callParent(arguments);
	},

	/**
	 * Processes the Events store and generates the EventBar records needed to create the markup
	 * @method
	 * @private
	 */
	generateEventBars: function(){
		/**
		 * @property {Ext.data.Store} eventBarStore Store to store the Event Bar definitions. It is defined
		 * with the Ext.ux.CalendarEventBarModel model.
		 * @private
		 */
		this.eventBarStore = Ext.create('Ext.data.Store', {
			model: 'Ext.ux.CalendarEventBarModel',
			data: []
		});

		this.setEventsPerTimeSlot({});

		var dates = this.getCalendar().getStore(),
			eventStore = this.getCalendar().eventStore,
			eventBarRecord,
			eventsPerTimeSlotCount = 0;

		// Loop through Calendar's date collection of visible dates
		dates.each(function(dateObj){
			var currentDate = dateObj.get('date'),
				currentDateTime = currentDate.getTime(),
				takenDatePositions = []; // stores 'row positions' that are taken on current date

			// sort the Events Store so we have a consistent ordering to ensure no overlaps
			eventStore.sort(this.getPlugin().getStartEventField(), this.getEventSortDirection());

			// Loop through currentDate's Events
			eventStore.each(function(event){

				// If the Event doesn't match the filter for events that are happening on the currentDate then we skip the Event Record
				// we do this rather than a real filterBy call is so that if the store is part of an association we don't lose the original filter
				if(!this.eventFilterFn.call(this, event, event.getId(), currentDateTime)){
					return;
				}
				eventsPerTimeSlotCount = eventsPerTimeSlotCount + 1;

				// Find any Event Bar record in the EventBarStore for the current Event's record (using internalID)
				var eventBarIndex = this.eventBarStore.findBy(function(record, id){
					return record.get('EventID') === event.internalId;
				}, this);

				// if an EventBarRecord was found then it is a multiple day Event so we must link them
				if (eventBarIndex > -1) {
					eventBarRecord = this.eventBarStore.getAt(eventBarIndex); // get the actual EventBarRecord

					// recurse down the linked EventBarRecords to get the last record in the chain for
					// wrapping Events
					while (eventBarRecord.linked().getCount() > 0) {
						eventBarRecord = eventBarRecord.linked().getAt(eventBarRecord.linked().getCount() - 1);
					}

					var barPos = eventBarRecord.get('BarPosition');

					// if currentDate is at the start of the week then we must create a new EventBarRecord
					// to represent the new bar on the next row.
					if (   (currentDate.getDay() === this.getCalendar().getWeekStart() && !(this.getCalendar().getViewMode() === 'YEAR'))
						|| (this.getCalendar().getViewMode() === 'YEAR' && currentDate.getMonth() % 3 === 0)
						|| eventBarRecord.get('BarPosition') >= this.getPlugin().getMaxVisibleEvents()) {
						// push the inherited BarPosition of the parent
						// EventBarRecord onto the takenDatePositions array
						barPos = this.getNextFreePosition(takenDatePositions);
						takenDatePositions.push(barPos);

						// create a new EventBar record
						var wrappedEventBarRecord = Ext.create('Ext.ux.CalendarEventBarModel', {
							EventID: event.internalId,
							Date: currentDate,
							BarLength: 1,
							BarPosition: barPos,
							Colour: eventBarRecord.get('Colour'),
							Record: event
						});

						// add it as a linked EventBar of the parent
						eventBarRecord.linked().add(wrappedEventBarRecord);
					}
					else {
						// add the inherited BarPosition to the takenDatePositions array
						takenDatePositions.push(barPos);

						// increment the BarLength value for this day
						eventBarRecord.set('BarLength', eventBarRecord.get('BarLength') + 1);
					}
				}
				else {
					// get the next free bar position
					var barPos = this.getNextFreePosition(takenDatePositions);

					// push it onto array so it isn't reused
					takenDatePositions.push(barPos);

					// create new EventBar record
					eventBarRecord = Ext.create('Ext.ux.CalendarEventBarModel', {
						EventID: event.internalId,
						Date: currentDate,
						BarLength: 1,
						BarPosition: barPos,
						Colour: this.getRandomColour(),
						Record: event
					});

					// add EventBar record to main store
					this.eventBarStore.add(eventBarRecord);
				}

			}, this);

			// keep track of the number of Events per time
			if(eventsPerTimeSlotCount > 0){
				this.getEventsPerTimeSlot()[currentDate.getTime()] = eventsPerTimeSlotCount;
			}

			eventsPerTimeSlotCount = 0;
		}, this);
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
		var barEndDate = Ext.Date.add(r.get('Date'), Ext.Date.DAY, (r.get('BarLength') - 1));
		return Ext.Date.clearTime(barEndDate, true).getTime() !== Ext.Date.clearTime(r.get('Record').get(this.getPlugin().getEndEventField()), true).getTime();
	},
	/**
	 * Returns true if the specified EventBar record has been wrapped from the row before.
	 * @method
	 * @private
	 * @param {Ext.ux.CalendarEventBarModel} r The EventBar model instance to figure out if it has wrapped from the previous row of dates
	 */
	eventBarHasWrapped: function(r){
		return Ext.Date.clearTime(r.get('Date'), true).getTime() !== Ext.Date.clearTime(r.get('Record').get(this.getPlugin().getStartEventField()), true).getTime();
	},

	/**
	 * Returns the first index number that isn't in the specified array
	 * @method
	 * @private
	 * @param {Aarray[Numbers]} datePositions An array of numbers representing the current date cell's taken positions
	 */
	getNextFreePosition: function(datePositions){
		var i = 0;

		// loop until the i value isn't present in the array
		while (datePositions.indexOf(i) > -1) {
			i++;
		}
		return i;
	},


	createEventBar: function(record, eventRecord){
		var doesWrap    = this.eventBarDoesWrap(record),
			hasWrapped  = this.eventBarHasWrapped(record),
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
			html: this.getPlugin().getEventBarTpl().apply(eventRecord.data),
			eventID: record.get('EventID'),
			cls: cssClasses.join(' ')
		}, true);

		return eventBar;
	},

	getRandomColour: function(){
		return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	}

});/**
 * Ext.ux.TouchCalendarYearEvents
 */
Ext.define('Ext.ux.TouchCalendarYearEvents', {
    extend: 'Ext.ux.TouchCalendarEventsBase',

	numberOfEventRows: 4,
	numberOfMonthColumns: 3,

	constructor: function() {
		this.callParent(arguments);
		//this.getCalendar().on('renderYearEvents', this.renderEventBars, this);
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

});/**
 * Ext.ux.TouchCalendarMonthEvents
 */
Ext.define('Ext.ux.TouchCalendarMonthEvents', {
    extend: 'Ext.ux.TouchCalendarEventsBase',

	eventFilterFn: function(record, id, currentDateTime){
		var startDate = Ext.Date.clearTime(record.get(this.getPlugin().getStartEventField()), true).getTime(),
			endDate = Ext.Date.clearTime(record.get(this.getPlugin().getEndEventField()), true).getTime();

		return (startDate <= currentDateTime) && (endDate >= currentDateTime);
	},

	/**
	 * After the Event store has been processed, this method recursively creates and positions the Event Bars
	 * @method
	 * @private
	 * @param {Ext.data.Store} store The store to process - used to then recurse into
	 */
	renderEventBars: function(store){
		var me = this;

		store.each(function(record){
			var eventRecord = this.getPlugin().getEventRecord(record.get('EventID')),
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
			var rowCount = this.getCalendar().element.select('tbody tr', this.getCalendar().element.dom).getCount();
			var rowHeight = bodyHeight/rowCount;

			var dateIndex = this.getCalendar().getStore().findBy(function(dateRec){
				return dateRec.get('date').getTime() === Ext.Date.clearTime(record.get('Date'), true).getTime();
			}, this);

			var rowIndex = Math.floor(dateIndex / 7) + 1;

			var eventY = headerHeight + (rowHeight * rowIndex);

			var barPosition = record.get('BarPosition'),
				barLength = record.get('BarLength'),
				dayCellX = (this.getCalendar().element.getWidth() / 7) * dayEl.dom.cellIndex,
				dayCellWidth = dayEl.getWidth(),
				eventBarHeight = eventBar.getHeight(),
				spacing = this.getPlugin().getEventBarSpacing();

			// set sizes and positions
			eventBar.setLeft(dayCellX + (hasWrapped ? 0 : spacing));
			eventBar.setTop(eventY - eventBarHeight - (barPosition * eventBarHeight + (barPosition * spacing) + spacing));
			eventBar.setWidth((dayCellWidth * barLength) - (spacing * (doesWrap ? (doesWrap && hasWrapped ? 0 : 1) : 2)));

			if (record.linked().getCount() > 0) {
				this.renderEventBars(record.linked());
			}
		}, this);
	}

});/**
 * @copyright     (c) 2012, by SwarmOnline.com
 * @date          29th May 2012
 * @version       0.1
 * @documentation  
 * @website        http://www.swarmonline.com
 */
/**
 * @class Ext.ux.TouchCalendarEvents
 * @author Stuart Ashworth
 *
 * For use with Sencha Touch 2
 * 
 * This plugin also allows a store to be bound to the Ext.ux.TouchCalendar and will display the store's events as bars spanning its relevant days. 
 * 
 * ![Ext.ux.TouchCalendarEvents Screenshot](http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendarEvents--month-ss.png)
 * 
 * [Ext.ux.TouchCalendarEvents Demo](http://www.swarmonline.com/Ext.ux.TouchCalendar/examples/Ext.ux.TouchCalendarEvents.html)
 * 
 */
Ext.define('Ext.ux.TouchCalendarEvents', {
	extend: 'Ext.mixin.Observable',
	config: {

		/**
		 * @cfg {Number} maxVisibleEvents Number of events that will be shown per view segment (day, month, week view)
		 */
		maxVisibleEvents: 4,

		viewModeProcessor: null,

		/**
		 * @cfg {String} eventBarTpl Template that will be used to fill the Event Bar
		 */
		eventBarTpl : '{title}', // make this an internal set-able property

		/**
		 * @cfg {String} eventBarCls Base CSS class given to each EventBar
		 */
		eventBarCls: 'event-bar',

		/**
		 * @cfg {String} colourField Name of the Model field which contains a colour to be applied to the
		 * event bar
		 */
		colourField: 'colour',

		/**
		 * @cfg {String} cssClassField Name of the Model field which contains a CSS class to be applied to the
		 * event bar
		 */
		cssClassField: 'css',

		/**
		 * @cfg {String/Number} eventHeight How the height of an event bar will be calculated in Day View.
		 * Possible values:
		 * auto: This will expand the event bar to contain it's content.
		 * duration: (default) This will set the event bar to be the height equivalent of its duration
		 * <number>: This will make the event bars to this explicit height
		 */
	    eventHeight: 'duration',

		/**
		 * @cfg {String/Number} eventWidth How the width of an event bar will be calculated in Day View
		 * Possible values:
		 * auto: This will expand the bar to fill the space
		 * <number>: This will make the event bars this explicit width
		 */
		eventWidth: 'auto',

		/**
		 * @cfg {String} startEventField Name of the Model field which contains the Event's Start date
		 */
		startEventField: 'start',

		/**
		 * @cfg {String} endEventField Name of the Model field which contains the Event's End date
		 */
		endEventField: 'end',

		/**
		 * @cfg {String} eventWrapperCls CSS class given to the EventBars' wrapping element
		 */
		eventWrapperCls: 'event-wrapper',

		/**
		 * @cfg {String} eventBarSelectedCls CSS class given to the EventBar after it has been selected
		 */
		eventBarSelectedCls: 'event-bar-selected',

		/**
		 * @cfg {String} cellHoverCls CSS class given to date cells when an event is dragged over
		 */
		cellHoverCls: 'date-cell-hover',

		/**
		 * @cfg {Boolean} autoUpdateEvent Decides whether the configured startEventField and endEventField
		 * dates are updated after an event is dragged and dropped
		 */
		autoUpdateEvent: true,

		/**
		 * @cfg {Boolean} allowEventDragAndDrop Decides whether the Event Bars can be dragged and dropped
		 */
		allowEventDragAndDrop: false,

		/**
		 * @cfg {Number} eventBarSpacing Space (in pixels) between EventBars
		 */
		eventBarSpacing: 1,

		/**
		 * {Ext.Element} eventWrapperEl The Ext.Element that contains all of the Event Bar elements
		 * @accessor
		 */
		eventWrapperEl: null

	},
    
    init: function(calendar){
	    var me = this;

        this.calendar = calendar; // cache the parent calendar
        this.calendar.eventsPlugin = this; // cache the plugin instance on the calendar itself  
        

	      /**
	       * @event eventtap
	       * Fires when an Event Bar is tapped
	       * @param {Ext.data.Model} eventRecord The model that the dragged Event Bar represents
	       * @param {Event} e The event object for the tap operation
	       */

	      /**
	       * @event eventdragstart
	       * Fires when an Event Bar is initially dragged.
	       * @param {Ext.util.Draggable} draggable The Event Bar's Ext.util.Draggable instance
	       * @param {Ext.data.Model} eventRecord The model that the dragged Event Bar represents
	       * @param {Event} e The event object for the drag operation
	       */

	      /**
	       * @event beforeeventdrop
	       * Fires before an Event Bar drop is accepted. Return false to prevent the drop from
	       * happening. This event can be used to add additional validation for Event moves
	       * @param {Ext.util.Draggable} draggable The Event Bar's Ext.util.Draggable instance
	       * @param {Ext.util.Droppable} droppable The Calendar's Ext.util.Droppable instance
	       * @param {Ext.data.Model} eventRecord The model that the dragged Event Bar represents
	       * @param {Event} e The event object for the drag operation
	       */

	      /**
	       * @event eventdrop
	       * Fires when an Event Bar is dragged and dropped on a date
	       * @param {Ext.util.Draggable} draggable The Event Bar's Ext.util.Draggable instance
	       * @param {Ext.util.Droppable} droppable The Calendar's Ext.util.Droppable instance
	       * @param {Ext.data.Model} eventRecord The model that the dragged Event Bar represents
	       * @param {Event} e The event object for the drag operation
	       */

	      /**
	       * @event eventdrag
	       * Fires while an Event Bar is being dragged.
	       * @param {Ext.util.Draggable} draggable The Event Bar's Ext.util.Draggable instance
	       * @param {Ext.data.Model} eventRecord The model that the dragged Event Bar represents
	       * @param {Date} currentDate The date that the Event Bar is currently over
	       * @param {Ext.Element} currentDateCell The Ext.Element representing the table cell of the current date
	       * @param {Event} e The event object for the drag operation
	       */

	    // create a sequence to refresh the Event Bars when the calendar either refreshes or has a component layout happen
	    this.calendar.refresh = Ext.Function.createSequence(this.calendar.refresh, this.refreshEvents, this);
	    this.calendar.setViewMode = this.createPreSequence(this.calendar.setViewMode, this.onViewModeUpdate, this);
	    this.calendar.onComponentResize = Ext.Function.createSequence(this.calendar.onComponentResize, this.onComponentResize, this);

	    // default to Day mode processor
		this.onViewModeUpdate(this.calendar.getViewMode());
    },

	/**
	 * Method that is executed after the parent calendar's onComponentResize event handler has completed.
	 * We want to refresh the event bars we're displaying but we must delay the refresh so the resize (mainly a
	 * orientation change) to take place so the calculations are using figures from final positions (i.e. the underlying table cells are
	 * where they are going to be, if we do it too soon the bars are in the wrong place.)
	 * @method
	 * @private
	 */
	onComponentResize: function(){
		var me = this;

		setTimeout(function(){
			me.refreshEvents();
		}, 200);
	},

	/**
	 * Creates a "Pre-Sequence" function.
	 * Identical to the Ext.Function.createSequence function but reverses the order the functions are executed in.
	 * This calls the newFn first and then the originalFn
	 * @method
	 * @private
	 * @param originalFn
	 * @param newFn
	 * @param scope
	 * @return {*}
	 */
	createPreSequence: function(originalFn, newFn, scope){
		if (!newFn) {
			return originalFn;
		}
		else {
			return function() {
				newFn.apply(scope || this, arguments);

				var result = originalFn.apply(this, arguments);

				return result;
			};
		}
	},

	/**
	 * Called BEFORE the parent calendar's setViewMode method is executed.
	 * This is because we need to have the new processor in place so the calendar refresh can use it.
	 * @method
	 * @private
	 * @param {String} viewMode
	 */
	onViewModeUpdate: function(viewMode){
		this.setViewModeProcessor(Ext.create(this.getViewModeProcessorClass(viewMode), {
			calendar: this.calendar,
			plugin: this
		}));
	},

	/**
	 * Returns the appropriate ViewMode Processor class based on the ViewMode
	 * passed in
	 * @method
	 * @private
	 * @param {String} viewMode The viewMode to get the processor class for
	 * @return {String} The Processor class name
	 */
	getViewModeProcessorClass: function(viewMode){
		var processorCls    = '';

		switch(viewMode.toLowerCase()){

			case 'year':
				processorCls = 'Ext.ux.TouchCalendarYearEvents';
				break;

			case 'month':
				processorCls = 'Ext.ux.TouchCalendarMonthEvents';
				break;

			case 'week':
				processorCls = 'Ext.ux.TouchCalendarWeekEvents';
				break;

			case 'day':
				processorCls = 'Ext.ux.TouchCalendarDayEvents';
				break;
		}

		return processorCls;
	},
    
    /**
     * Regenerates the Event Bars
     * @method
     * @return {void}
     */
    refreshEvents: function(){

	    // scroll the parent calendar to the top so we're calculating positions from the base line.
	    if(this.calendar.getScrollable()){
		    this.calendar.getScrollable().getScroller().scrollTo(0,0);
	    }

	    this.removeEvents();
        
        this.getViewModeProcessor().generateEventBars(); // in turn calls this.renderEventBars(this.eventBarStore);
        
        this.createEventWrapper();
        
        
        if (this.getAllowEventDragAndDrop()) {
            this.createDroppableRegion();
        }
    },
  
  /**
   * Creates a Ext.util.Droppable region for the Calendar's body element
   * @method
   * @private
   */
  createDroppableRegion: function(){
    var me = this;
    var onDragCount = 0;
    /**
     * @property {Ext.util.Droppable} droppable Contains the Ext.util.Droppable instance on the Calendar's body element
     */
    //TODO: Re-implement when droppable is supported in ST2 again
//    this.droppable = new Ext.util.Droppable(this.calendar.getEl(), {
//      /**
//       * Override for Droppable's onDrag function to add hover class to active date cell
//       * @method       
//       * @private
//       * @param {Object} draggable
//       * @param {Object} e
//       */
//            onDrag: function(draggable, e){
//        if (draggable.el.hasCls(me.eventBarCls)) {
//          this.setCanDrop(this.isDragOver(draggable), draggable, e);
//          onDragCount++;
//
//          if (onDragCount % 15 === 0) {
//            var currentDateCell, currentDate, eventRecord = me.getEventRecord(draggable.el.getAttribute('eventID'));
//            
//            me.calendar.all.removeCls(me.cellHoverCls);
//            
//            me.calendar.all.each(function(cell, index){
//              var cellRegion = cell.getPageBox(true);
//              var eventBarRegion = draggable.el.getPageBox(true);
//              
//              if (cellRegion.partial(eventBarRegion)) {
//                currentDateCell = cell;
//                currentDate = this.calendar.getCellDate(cell);
//                
//                cell.addCls(me.cellHoverCls);
//                return;
//              }
//            }, me);
//            
//            me.calendar.fireEvent('eventdrag', draggable, eventRecord, currentDate, currentDateCell, e);
//            onDragCount = 0;
//          }
//        }
//      }
//        });
//    
//    this.droppable.on({
//      drop: this.onEventDrop,
//            dropdeactivate: this.onEventDropDeactivate,
//            scope: this
//    });
  },
  
  /**
   * Handler for when an Event's drag is invalid and must be reset
   * @method
   * @private
   * @param {Ext.util.Droppable} droppable
   * @param {Ext.util.Draggable} draggable
   * @param {Event} e
   * @param {Object} opts
   */
  onEventDropDeactivate: function(droppable, draggable, e, opts){
    if (draggable.el.hasCls(this.eventBarCls)) {
      var eventRecord = this.getEventRecord(draggable.el.getAttribute('eventID'));
      
      // reshow all the hidden linked Event Bars
      this.calendar.element.select('div.' + eventRecord.internalId, this.calendar.element.dom).each(function(eventBar){
        eventBar.show();
      }, this);
    }
    },
  
  /**
   * Function to handle the dropping of an event onto the calendar.
   * Figures out what date is was dropped on and updates its store with the new details.
   * @method
   * @private
   * @param {Ext.util.Droppable} droppable
   * @param {Ext.util.Draggable} draggable
   * @param {Event} e
   * @param {Object} opts
   */
  onEventDrop: function(droppable, draggable, e, opts){
        var validDrop = false;

        if(draggable.el.hasCls(this.eventBarCls)){
        
            this.calendar.all.each(function(cell){
                var cellRegion = cell.getPageBox(true);
                var eventBarRegion = draggable.el.getPageBox(true);

                if (cellRegion.partial(eventBarRegion) && this.calendar.fireEvent('beforeeventdrop', draggable, droppable, eventRecord, e)) {
                    validDrop = true;
                    var eventRecord = this.getEventRecord(draggable.el.getAttribute('eventID')),
                        droppedDate = this.calendar.getCellDate(cell),
                        daysDifference = this.getDaysDifference(eventRecord.get(this.getStartEventField()), droppedDate);

                    if (this.getAutoUpdateEvent()) {
                        eventRecord.set(this.getStartEventField(), droppedDate);
                        eventRecord.set(this.getEndEventField(), eventRecord.get(this.getEndEventField()).add(Date.DAY, daysDifference));
                    }

                    this.refreshEvents();

                    this.calendar.fireEvent('eventdrop', draggable, droppable, eventRecord, e)

                    return;
                }
            }, this);

            this.calendar.all.removeCls(this.getCellHoverCls());

            if (!validDrop) { // if it wasn't a valid drop then move the Event Bar back to its original location
                draggable.setOffset(draggable.startOffset, true);
            }
        }
    },


  /**
   * Handler function for the Event Bars' 'dragstart' event
   * @method
   * @private
   * @param {Ext.util.Draggable} draggable
   * @param {Event} e
   */
  onEventDragStart: function(draggable, e){
        var eventID = draggable.el.getAttribute('eventID'),
      eventRecord = this.getEventRecord(eventID),
      eventBarRecord = this.getEventBarRecord(eventID);
        
    //TODO Reposition dragged Event Bar so it is in the middle of the User's finger.
    
    // Resize dragged Event Bar so it is 1 cell wide
        draggable.el.setWidth(draggable.el.getWidth() / eventBarRecord.get('BarLength'));
    
    // Update the draggables boundary so the resized bar can be dragged right to the edge.
    draggable.updateBoundary(true);

        // hide all linked Event Bars
        this.calendar.element.select('div.' + eventRecord.internalId, this.calendar.element.dom).each(function(eventBar){
            if (eventBar.dom !== draggable.el.dom) {
                eventBar.hide();
            }
        }, this);
    
        this.calendar.fireEvent('eventdragstart', draggable, eventRecord, e);
    },
    
    /**
     * Creates the Event Bars' wrapper element and attaches a handler to it's click event
     * to handle taps on the Event Bars
     * @method
     * @private
     */
    createEventWrapper: function(){
        if (this.calendar.rendered && !this.getEventWrapperEl()) {
            this.setEventWrapperEl(Ext.DomHelper.append(this.getEventsWrapperContainer(), {
                tag: 'div',
                cls: this.getEventWrapperCls()
            }, true));

            this.getEventWrapperEl().on('tap', this.onEventWrapperTap, this, {
                delegate: 'div.' + this.getEventBarCls()
            });

	        if(this.getViewModeProcessor().eventBarStore){
				if (this.calendar.getViewMode() === "YEAR") {
					this.calendar.fireEvent('renderYearEvents', this.getViewModeProcessor().eventBarStore, this.getEventWrapperCls(), this.getEventsWrapperContainer(), this, this.calendar, this.getViewModeProcessor());
				} else {
					this.getViewModeProcessor().renderEventBars(this.getViewModeProcessor().eventBarStore);
				}
	        }
        } else {
          this.calendar.on('painted', this.createEventWrapper, this);
        }
    },
    
    /**
     * Handler function for the tap event on the eventWrapperEl
     * @method
     * @private
     * @param {Event} e
     * @param {Object} node
     */
    onEventWrapperTap: function(e, node){
        e.stopPropagation(); // stop event bubbling up

	    var eventBarDom = e.getTarget('div.' + this.getEventBarCls());

	    if(eventBarDom){
		    var eventID = eventBarDom.getAttribute('eventID'),
			    eventBarEl  = Ext.fly(eventBarDom);

		    if (eventID) {
			    var eventRecord = this.getEventRecord(eventID);

			    this.deselectEvents();

			    eventBarEl.addCls(this.getEventBarSelectedCls());

			    this.calendar.fireEvent('eventtap', eventRecord, e);
		    }
	    }
    },
  
	getEventsWrapperContainer: function(){
		return this.calendar.element.select('thead th', this.calendar.element.dom).first() || this.calendar.element.select('tr td', this.calendar.element.dom).first();
	},

	/**
	 * Get the Event record with the specified eventID (eventID equates to a record's internalId)
	 * @method
	 * @private
	 * @param {Object} eventID
	 */
	getEventRecord: function(eventID){
		var eventRecordIndex = this.calendar.eventStore.findBy(function(rec){
			return rec.internalId === eventID;
		}, this);
		return this.calendar.eventStore.getAt(eventRecordIndex);
	},

	/**
	 * Get the EventBar record with the specified eventID
	 * @method
	 * @private
	 * @param {String} eventID InternalID of a Model instance
	 */
	getEventBarRecord: function(eventID){
		var eventRecordIndex = this.eventBarStore.findBy(function(rec){
			return rec.get('EventID') === eventID;
		}, this);
		return this.eventBarStore.getAt(eventRecordIndex);
	},
    

    /**
     * Remove the selected CSS class from all selected Event Bars
     * @method
     * @return {void}
     */
    deselectEvents: function(){
        this.calendar.element.select('.' + this.getEventBarSelectedCls(), this.calendar.element.dom).removeCls(this.getEventBarSelectedCls());
    },
    
    /**
     * Returns the number of days between the two dates passed in (ignoring time)
     * @method
     * @private
     * @param {Date} date1
     * @param {Date} date2
     */
    getDaysDifference: function(date1, date2){
        date1 = date1.clearTime(true).getTime();
        date2 = date2.clearTime(true).getTime();
        
        return (date2 - date1) / 1000 / 60 / 60 / 24;
    },
    
    /**
     * Removes all the event markers and their markup
     * @method
     * @private
     */
    removeEvents: function(){
        if (this.getEventWrapperEl()) {
            this.getEventWrapperEl().dom.innerHTML = '';
            this.getEventWrapperEl().destroy();
            this.setEventWrapperEl(null);
        }
        
        if (this.eventBarStore) {
            this.eventBarStore.remove(this.eventBarStore.getRange());
            this.eventBarStore = null;
        }
    
		if(this.droppable){
		  this.droppable = null;
		}
    },

	applyEventBarTpl: function(tpl){
		if(Ext.isString(tpl) || Ext.isArray(tpl)){
			tpl = Ext.create('Ext.XTemplate', tpl);
		}

		return tpl;
	}
});


/**
 * Ext.data.Model to store information about the EventBars to be generated from the 
 * bound data store
 * @private
 */
Ext.define("Ext.ux.CalendarEventBarModel", {
  extend: "Ext.data.Model",
	config: {
	  fields: [{
	    name: 'EventID',
	    type: 'string'
	  }, {
	    name: 'Date',
	    type: 'date'
	  }, {
	    name: 'BarLength',
	    type: 'int'
	  }, {
	    name: 'BarPosition',
	    type: 'int'
	  }, {
	    name: 'Colour',
	    type: 'string'
	  }, 'Record'],
	  hasMany: [{
	      model: 'Ext.ux.CalendarEventBarModel',
	      name: 'linked'
	  }]
	}
});

/**
 * @copyright     (c) 2012, by SwarmOnline.com
 * @date          29th May 2012
 * @version       0.1
 * @documentation
 * @website        http://www.swarmonline.com
 */
/**
 * @class Ext.ux.TouchCalendarSimpleEvents
 * @author Stuart Ashworth
 *
 * For use with Sencha Touch 2
 *
 * This plugin can be added to an Ext.ux.TouchCalendarView instance to allow a store to be bound to the calendar so events can be shown in a similar style to the iPhone
 * does with a dot added to each day to represent the presence of an event.
 * 
 * ![Ext.ux.TouchCalendarSimpleEvents Screenshot](http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendarSimpleEvents-month-ss.png)
 * 
 * # Sample Usage
 * 
 *     Ext.regModel('Event', {
           fields: [{
               name: 'event',
               type: 'string'
           }, {
               name: 'location',
               type: 'string'
           }, {
               name: 'start',
               type: 'date',
               dateFormat: 'c'
           }, {
               name: 'end',
               type: 'date',
               dateFormat: 'c'
           }]
       });
       
       var calendar = new Ext.ux.Calendar({
           fullscreen: true,
           mode: 'month',
           weekStart: 1,
           value: new Date(),
           
           store: new Ext.data.Store({
		        model: 'Event',
		        data: [{
		            event: 'Sencha Con',
		            location: 'Austin, Texas',
		            start: new Date(2011, 9, 23),
		            end: new Date(2011, 9, 26)
		        }]
		    },
                        
           plugins: [new Ext.ux.CalendarSimpleEvents()]
       });
 *    
 * # Demo
 * [Ext.ux.CalendarSimpleEvents Demo](http://www.swarmonline.com/Ext.ux.TouchCalendar/examples/Ext.ux.CalendarSimpleEvents.html)
 */
Ext.define('Ext.ux.TouchCalendarSimpleEvents', {
  extend: 'Ext.mixin.Observable',
	
    /**
     * @cfg {String} startEventField Name of the Model field which contains the Event's Start date
     */
    startEventField: 'start',
    
    /**
     * @cfg {Stirng} endEventField Name of the Model field which contains the Event's End date
     */
    endEventField: 'end',
	
	/**
	 * @cfg {Boolean} multiEventDots True to display a dot for each event on a day. False to only show one dot regardless
	 * of how many events there are
	 */
	multiEventDots: true,
	
	/**
	 * @cfg {String} wrapperCls CSS class that is added to the event dots' wrapper element
	 */
	wrapperCls: 'simple-event-wrapper',
	
	/**
	 * @cfg {String} eventDotCls CSS class that is added to the event dot element itself. Used to provide
	 * the dots' styling
	 */
	eventDotCls: 'simple-event',
	
	/**
	 * @cfg {Number} dotWidth Width in pixels of the dots as defined by CSS. This is used for calculating the positions and
	 * number of dots able to be shown.
	 */
	dotWidth: 6,
	
	/**
	 * @cfg {String} eventTpl Template used to create the Event markup. Template is merged with the records left
	 * following the filter
	 * 
	 */
	eventTpl:	['<span class="{wrapperCls}">',
		'<tpl for="events">',
			'<span class="{[parent.eventDotCls]}"></span>',
		'</tpl>',
	'</span>'].join(''),
	
	/**
	 * Function used to filter the store for each of the displayed dates
	 * @method
	 * @private
	 * @param {Object} record - current record
	 * @param {Object} id - ID of passed in record
	 * @param {Object} currentDate - date we are currently dealing while looping Calendar's dateCollection property
	 */
	filterFn: function(record, id, currentDate){
	  if (arguments.length===2){
	    currentDate = id;
	  }
		var startDate = Ext.Date.clearTime(record.get(this.startEventField), true).getTime(),
			endDate = Ext.Date.clearTime(record.get(this.endEventField), true).getTime(),
			currentDate = Ext.Date.clearTime(currentDate, true).getTime();
	                            
	    return (startDate <= currentDate) && (endDate >= currentDate);
	},
	
	init: function(calendar){
		
		this.calendar = calendar; // cache the parent calendar
		this.calendar.simpleEventsPlugin = this; // cache the plugin instance on the calendar itself
		
		this.wrapperCls = this.wrapperCls + (this.multiEventDots ? '-multi' : '');
		this.eventDotCls = this.eventDotCls + (this.multiEventDots ? '-multi' : '');
		
		this.calendar.showEvents = this.showEvents;
		this.calendar.hideEvents = this.hideEvents;
		this.calendar.removeEvents = this.removeEvents;
		
		// After the calendar's refreshed we must refresh the events
		this.calendar.refresh = Ext.Function.createSequence(this.calendar.refresh, this.refreshEvents, this);
		this.calendar.syncHeight = Ext.Function.createSequence(this.calendar.syncHeight, this.refreshEvents, this);
	},

	
	/**
	 * Function to execute when the Calendar is refreshed.
	 * It loops through the Calendar's current dateCollection and gets all Events
	 * for the current date and inserts the appropriate markup
	 * @method
	 * @private
	 * @return {void}
	 */
	refreshEvents: function(){
		if (!this.disabled && this.calendar.getViewMode() !== 'DAY') {
			var datesStore = this.calendar.getStore();

			if (datesStore) {
				
				this.removeEvents(); // remove the event dots already existing
				
				// loop through Calendar's current dateCollection
				datesStore.each(function(dateObj){
					var date = dateObj.get('date');
					
					var cell = this.calendar.getDateCell(date); // get the table cell for the current date
					var store = this.calendar.eventStore;
					
					if (cell) {
						store.clearFilter();
						
						// if we only want to show a single dot per day then use findBy for better performance
						var matchIndex = store[this.multiEventDots ? 'filterBy' : 'findBy'](Ext.bind(this.filterFn, this, [date], true));
						var eventCount = store.getRange().length;
						
						if ((!this.multiEventDots && matchIndex > -1) || (this.multiEventDots && eventCount > 0)) {
							// get maximum number of dots that can fitted in the cell
							var maxDots = Math.min((cell.getWidth()/this.dotWidth), eventCount);
							
							// append the event markup
							var t =  new Ext.XTemplate(this.eventTpl).append(cell, {
								events: (this.multiEventDots ? store.getRange().slice(0, maxDots) : ['event']),
								wrapperCls: this.wrapperCls,
								eventDotCls: this.eventDotCls
							}, true);
							
							// position the dot wrapper based on the cell dimensions and dot count
							t.setWidth(Math.min((this.multiEventDots ? store.getRange().length : 1) * this.dotWidth, cell.getWidth()));
							t.setY((cell.getY() + cell.getHeight()) - (t.getHeight() + (cell.getHeight()*0.1)) );
							t.setX((cell.getX() + (cell.getWidth()/2)) - (t.getWidth()/2) + 2 ); // add 2 for margin value
						}
					}
				}, this);
			}
		}
	},
	
	/**
	 * Hides all the event markers
	 * This is added to the parent Calendar's class so must be executed via the parent
	 * @method
	 * @return {void}
	 */
	hideEvents: function(){
		this.simpleEventsPlugin.disabled = true;
		
		this.calendar.element.select('span.' + this.wrapperCls, this.calendar.element.dom).hide();
	},
	
	/**
	 * Shows all the event markers
	 * This is added to the parent Calendar's class so must be executed via the parent
	 * @method
	 * @return {void}
	 */
	showEvents: function(){
		this.simpleEventsPlugin.disabled = false;
		
		this.calendar.element.select('span.' + this.wrapperCls, this.calendar.element.dom).show();
	},
	
	/**
	 * Removes all the event markers and their markup
	 * This is added to the parent Calendar's class so must be executed via the parent
	 * @method
	 * @return {void}
	 */
	removeEvents: function(){
		if(this.calendar.element){
			this.calendar.element.select('span.' + this.wrapperCls, this.calendar.element.dom).each(function(el){
				Ext.destroy(el);
			});
		}
	}	
});
