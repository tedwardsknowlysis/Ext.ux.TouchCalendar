///**
// * @class Ext.util.Region
// */
//Ext.override(Ext.util.Region, {
//
//});

Ext.define('Ext.ux.CalendarRegion', {
    override: 'Ext.util.Region',
    /**
     * Figures out if the Event Bar passed in is within the boundaries of the current Date Cell (this)
     * @method
     * @param {Object} region
     */
    partial: function(region){
        var me = this, // cell
            dragWidth = region.right - region.left,
            dragHeight = region.bottom - region.top,
            dropWidth = me.right - me.left,
            dropHeight = me.bottom - me.top,

            verticalValid = region.top > me.top && region.top < me.bottom;

        horizontalValid = region.left > me.left && region.left < me.right;

        return horizontalValid && verticalValid;
    }
});