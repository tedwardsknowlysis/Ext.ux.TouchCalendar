Ext.define("Event", {
	extend: "Ext.data.Model",
	config: {
		fields: [{
			name: 'event',
			type: 'string'
		}, {
			name: 'title',
			type: 'string'
		}, {
			name: 'start',
			type: 'date',
			dateFormat: 'c'
		}, {
			name: 'end',
			type: 'date',
			dateFormat: 'c'
		}, {
			name: 'css',
			type: 'string'
		}]
	}
});

// always base events from today
var day = (new Date()).getDate(),
	month = (new Date()).getMonth(),
	year = (new Date()).getFullYear();

var eventStore = Ext.create('Ext.data.Store', {
    model: 'Event',
	data: [
		{
			event: '1:05am - 3:05am',
			title: 'Event 1-2',
			start: new Date(year, 0, 1, 1, 5),
			end: new Date(year, 0, 1, 3, 5),
			css: 'red'
		}, {
			event: '4:00 - 4:10',
			title: 'Event Name 3',
			start: new Date(year, month-1, day, 4, 0),
			end: new Date(year, month-1, day, 4, 10),
			css: 'green'
		}, {
			event: '7:06 - 7:15',
			title: 'Event Name 4-1',
			start: new Date(year, month-1, day, 7, 6),
			end: new Date(year, month-1, day, 7, 15),
			css: 'blue'
		}, {
			event: '7:06 - 7:15',
			title: 'Event Name 4-2',
			start: new Date(year, month-1, day, 7, 6),
			end: new Date(year, month-1, day, 7, 15),
			css: 'blue'
		},{
			event: '7:06 - 7:15',
			title: 'Event Name 4-3',
			start: new Date(year, month-1, day, 7, 6),
			end: new Date(year, month-1, day, 7, 15),
			css: 'blue'
		},
		{
			event: '7:06 - 7:15',
			title: 'Event Name 4-4',
			start: new Date(year, month-1, day, 7, 6),
			end: new Date(year, month-1, day, 7, 15),
			css: 'blue'
		},
		{
			event: '7:06 - 7:15',
			title: 'Event Name 4-5',
			start: new Date(year, month-1, day, 7, 6),
			end: new Date(year, month-1, day, 7, 15),
			css: 'blue'
		},
		{
			event: 'Jan - Nov',
			title: 'Event Name 7',
			start: new Date(year, month-1, day+2, 15, 0),
			end: new Date(year, month+10, day+2, 16, 10),
			css: 'green'
		}, {
			event: 'Jun - Sept',
			title: 'Event Name 8',
			start: new Date(year, month+5, day+6, 0, 0),
			end: new Date(year, month+8, day+9, 0, 0),
			css: 'red'
		}]
});
