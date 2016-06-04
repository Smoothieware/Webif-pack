# smoothie-cnc-ui
CNC control UI for Smoothieboard web interface.  Put into /sd/cnc/

There is a JS event picking the position information once a second.

The javascript assumes .gcode files for upload - you may want to change that if your toolchain outputs something else

I have set the main home button to home X&Y only.  

I have home switches on X&Y and use a Z height conductive plate with an offset in the smoothie config file to set the Z axis to
the top of stock.  I do this by earthing the spindle and letting the tool touching the plate earth it, which is connected to Z-min
on the smoothieboard.

