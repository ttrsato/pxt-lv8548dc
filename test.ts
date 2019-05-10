// tests go here; this will not be compiled when this package is used as a library
basic.forever(() => {
    lv8548dc.init(SerialPin.P0, SerialPin.P1)
    lv8548dc.setRotation(Motor.CH0, Rotor_Direction.Forward_Open)
    lv8548dc.setCtlVoltage(Motor.CH0, 200)
    lv8548dc.setPWMFreqency(PWM_Freq.DIV1_8)
    lv8548dc.setStartFlag(ON_OFF_Flag.OFF, Motor.CH0)
})