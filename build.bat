cd builder

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendar.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarView.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarSimpleEvents.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

java -jar JSBuilder2.jar -v -p D:\repositories\Ext.ux.TouchCalendar\builder\Ext.ux.TouchCalendarEvents.jsb2 -d D:\repositories\Ext.ux.TouchCalendar

cd..

REM jsduck-3.3.0.exe . --output docs --ignore-global --title "Ext.ux.TouchCalendar Documentation" --footer "Generated with JSDuck"

REM PAUSE