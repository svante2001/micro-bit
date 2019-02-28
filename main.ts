import kitronik = kitronik_motor_driver

//test
let Right_Detector = 0
let Left_Detector = 0
let black = 0
let white = 1


pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)

// 0 is the black line
// 1 is the white background
// motor1 is the left 3V DC motor
// motor2 is he right 3V DC motor

basic.forever(function () {
    Right_Detector = pins.digitalReadPin(DigitalPin.P2)
    Left_Detector = pins.digitalReadPin(DigitalPin.P1)
    if (Right_Detector == white && Left_Detector == black) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 30)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 30)
    } else if (Right_Detector == black && Left_Detector == black) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 30)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 15)
    } else if (Right_Detector == black && Left_Detector == white) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 30)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 15)
    } else if (Right_Detector == white && Left_Detector == white) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 15)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 30)
    }
}) 