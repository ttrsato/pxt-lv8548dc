enum Motor {
    CH0 = 0,
    CH1 = 1
}

enum DriveMode {
    //% block="Forward-Open"
    FORWARD_OPEN = 0,
    //% block="Forward-Brake"
    FORWARD_BRAKE = 1,
    //% block="Reverse-Open"
    REVERSE_OPEN = 2,
    //% block="Reverse-Brake"
    REVERSE_BRAKE = 3,
    //% block="Open"
    OPEN = 4,
    //% block="Brake"
    BRAKE = 5
}

enum PWMFreq {
    //% block="7.813kHz"
    F_7P813K = 0,
    //% block="0.977kHz"
    F_0P977K = 1,
    //% block="0.244kHz"
    F_0P244K = 2,
    //% block="0.061kHz"
    F_0P061K = 3
}

enum State {
    //% block="Open"
    OPEN = 0,
    //% block="Run"
    RUN = 1,
    //% block="Brake"
    BRAKE = 0
}

//% weight=70 icon="\uf2db" color=#555555 block="LV8548DC"
namespace lv8548dc {
    //% blockId=show_strings block="Init LV8548DC tx:%tx|rx:%rx"
    //% tx.defl=SerialPin.P2
    //% rx.defl=SerialPin.P1
    export function init(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate19200
        )
        basic.showIcon(IconNames.Sad)
        let init_done = 0
        while (!(init_done)) {
            basic.pause(200)
            let str = serial.readString()
            if (str[0] == "R") {
                serial.writeString("A")
                init_done = 1
                basic.showIcon(IconNames.Happy)
                basic.pause(200)
            }
        }
        let bufrini = pins.createBuffer(3)
        bufrini.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufrini.setNumber(NumberFormat.UInt8LE, 1, 0xFE)
        // DC
        bufrini.setNumber(NumberFormat.UInt8LE, 2, 0x00)
        serial.writeBuffer(bufrini)
    }

    //% blockId=lv8548dc_setrotation block="Set %ch DC motor to %sel"
    export function setRotation(ch: Motor, sel: DriveMode): void {
        let bufr = pins.createBuffer(6);
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x44)
        bufr.setNumber(NumberFormat.UInt8LE, 4, ch)
        bufr.setNumber(NumberFormat.UInt8LE, 5, sel)
        serial.writeBuffer(bufr)
    }

    //% blockId=lv8548dc_setctlvoltage block="Set %ch DC motor voltage percent to %duty"
    //% duty.min=0 duty.max=100
    export function setCtlVoltage(ch: Motor, duty: number): void {
        let bufr = pins.createBuffer(6);
        // setRotation
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x41)
        bufr.setNumber(NumberFormat.UInt8LE, 4, ch)
        bufr.setNumber(NumberFormat.UInt8LE, 5, duty)
        serial.writeBuffer(bufr)
    }

    //% blockId=lv8548dc_setpwmfrequency block="Set PWM frequency to %freq"
    export function setPWMFrequency(freq: PWMFreq): void {
        let bufr = pins.createBuffer(5);
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x02)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x67)
        bufr.setNumber(NumberFormat.UInt8LE, 4, freq)
        serial.writeBuffer(bufr)
    }

    //% blockId=lv8548dc_setstartflag block="%en|%ch|motor"
    export function setStartFlag(en: State, ch: Motor): void {
        let bufr = pins.createBuffer(6);
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x68)
        bufr.setNumber(NumberFormat.UInt8LE, 4, ch)
        bufr.setNumber(NumberFormat.UInt8LE, 5, en)
        serial.writeBuffer(bufr)
    }
}