//This is a robot linefollowing code with one sensor

import kitronik = kitronik_motor_driver

let Left_Detector = 0

pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)

//0 is black line
//1 is white line

basic.forever(function () {
    Left_Detector = pins.digitalReadPin(DigitalPin.P1) 
     if (Left_Detector == 1) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 40)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 10)
    } else if (Left_Detector = 0) {
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 40)
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 10)
    }
})