// tests go here; this will not be compiled when this package is used as a library
basic.forever(() => {
    lv8548dc.init(SerialPin.P0, SerialPin.P1)
    lv8548dc.setRotation(Motor.CH0, DriveMode.FORWARD_OPEN)
    lv8548dc.setCtlVoltage(Motor.CH0, 200)
    lv8548dc.setPWMFrequency(PWMFreq.F_7P813K)
    lv8548dc.setStartFlag(State.RUN, Motor.CH0)
})