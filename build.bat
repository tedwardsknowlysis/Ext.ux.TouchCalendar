cd builder

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendar.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarView.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarSimpleEvents.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarEvents.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarYear.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

cd..

cp Ext.ux.TouchCalendar.js build\TouchCalendar.js
cp Ext.ux.TouchCalendarView.js build\TouchCalendarView.js
cp Ext.ux.TouchCalendarEvents\Ext.ux.TouchCalendarEventsBase.js build\TouchCalendarEventsBase.js
cp Ext.ux.TouchCalendarEvents\Ext.ux.TouchCalendarEvents.js build\TouchCalendarEvents.js
cp Ext.ux.TouchCalendarEvents\Ext.ux.TouchCalendarYearEvents.js build\TouchCalendarYearEvents.js

REM jsduck-3.3.0.exe . --output docs --ignore-global --title "Ext.ux.TouchCalendar Documentation" --footer "Generated with JSDuck"

REM PAUSE